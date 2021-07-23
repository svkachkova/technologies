# Аctions

Action is any piece of code that modifies the state. Аctions always happen in response to an event (button was clicked, some input changed, a websocket message arrived).

The `action` annotation should only be used on functions that intend to modify the state. Functions that derive information (performing lookups or filtering data) should not be marked as actions.

```js
import { makeObservable, observable, action } from "mobx"

class Doubler {
    value = 0

    constructor(value) {
        makeObservable(this, {
            value: observable,
            increment: action
        })
    }

    increment() {
        // Intermediate states will not become visible to observers.
        this.value++
        this.value++
    }
}
```

## Wrapping functions using `action`

It is good to mark a class method as an action if it modifies the state. It is even better to mark event handlers as actions.

To create action based event handlers use function `action(name, fn)`.

```jsx
const ResetButton = ({ formState }) => (
    <button
        onClick={action('handleReset', e => {
            formState.resetPendingUploads()
            formState.resetValues()
            e.stopPropagation()
        })}
    >
        Reset form
    </button>
)
```

```js
import { observable, action } from "mobx"

const state = observable({ value: 0 })

const increment = action(state => {
    state.value++
    state.value++
})

increment(state)
```

## Actions and inheritance

Only actions defined on prototype can be overriden by subclass.

```js
class Parent {
    // on instance
    arrowAction = () => {}

    // on prototype
    action() {}

    constructor() {
        makeObservable(this, {
            arrowAction: action
            action: action,
        })
    }
}
class Child extends Parent {
    // THROWS: TypeError: Cannot redefine property: arrowAction
    arrowAction = () => {}

    // OK
    action() {}

    constructor() {
        super()
        makeObservable(this, {
            arrowAction: override,
            action: override,
        })
    }
}
```

## Asynchronous actions

Asynchronous processes don't need any special handling in MobX, as all reactions will update automatically regardless of the moment in time they are called. However, every step (tick) that updates observables in an asynchronous process should be marked as action. This can be achieved in multiple ways shown below.

Promise resolution handlers are handled in-line, but run after the original action finished, so they need to be wrapped by `action`:

```js
import { action, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        fetchGithubProjectsSomehow().then(
            action("fetchSuccess", projects => {
                this.githubProjects = projects
                this.state = "done"
            }),
            action("fetchError", error => {
                this.state = "error"
            })
        )
    }
}
```

If the promise handlers are class fields, they will automatically be wrapped in action by `makeAutoObservable`:

```js
import { makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        fetchGithubProjectsSomehow().then(this.projectsFetchSuccess, this.projectsFetchFailure)
    }

    projectsFetchSuccess = projects => {
        this.githubProjects = projects
        this.state = "done"
    }

    projectsFetchFailure = error => {
        this.state = "error"
    }
}
```

Any steps after `await` aren't in the same tick, so they require `action` wrapping. Here, we can leverage `runInAction`:

```js
import { runInAction, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            runInAction(() => {
                this.githubProjects = projects
                this.state = "done"
            })
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```
