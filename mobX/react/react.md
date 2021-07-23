# React integration

The `observer(fn)` is Higher-Order Component that you can wrap around a React componen.

```jsx
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)
```

The `observer` HoC automatically subscribes React components to any observables that are used during rendering. As a result, components will automatically re-render when relevant observables change.

## Local and external state

There is great flexibility in how state is organized, since it doesn't matter (technically that is) which observables we read or where observables originated from.

### Using external (внешнего) state in observer components

#### Using props

Observables can be passed into components as props:

```jsx
import { observer } from "mobx-react-lite"

const myTimer = new Timer() // See the Timer definition above.

const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

// Pass myTimer as a prop.
ReactDOM.render(<TimerView timer={myTimer} />, document.body)
```

#### Using global variables

Since it doesn't matter how we got the reference to an observable, we can directly use observables from outer scopes directly (including from imports, etc.):

```jsx
const myTimer = new Timer() // See the Timer definition above.

// No props, `myTimer` is directly consumed from the closure.
const TimerView = observer(() => <span>Seconds passed: {myTimer.secondsPassed}</span>)

ReactDOM.render(<TimerView />, document.body)
```

Using observables directly works very well, but since this typically introduces module state, this pattern might complicate unit testing. Instead, we recommend using React Context instead.

#### Using React context

React Context is a great mechanism to share observables with an entire subtree:

```jsx
import {observer} from 'mobx-react-lite'
import {createContext, useContext} from "react"

const TimerContext = createContext<Timer>()

const TimerView = observer(() => {
    // Grab the timer from the context.
    const timer = useContext(TimerContext) // See the Timer definition above.
    return (
        <span>Seconds passed: {timer.secondsPassed}</span>
    )
})

ReactDOM.render(
    <TimerContext.Provider value={new Timer()}>
        <TimerView />
    </TimerContext.Provider>,
    document.body
)
```

Note that we don't recommend ever replacing the value of a Provider with a different one. Using MobX, there should be no need for that, since the observable that is shared can be updated itself.

### Using local observable state in `observer` components

#### `useState` with observable class

The simplest way to use local observable state is to store a reference to an observable class with `useState`:

```jsx
import { observer } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() => new Timer()) // See the Timer definition above.
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

If you want to automatically update the timer like we did in the original example, `useEffect` could be used in typical React fashion:

```jsx
useEffect(() => {
    const handle = setInterval(() => {
        timer.increaseTimer()
    }, 1000)
    return () => {
        clearInterval(handle)
    }
}, [timer])
```

#### `useState` with local observable object

Instead of using classes, it is possible to directly create observable objects:

```jsx
import { observer } from "mobx-react-lite"
import { observable } from "mobx"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() =>
        observable({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        })
    )
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

#### `useLocalObservable` hook

The combination `const [store] = useState(() => observable({ /* something */}))` is quite common. To make this pattern simpler the `useLocalObservable` hook is exposed from `mobx-react-lite` package, making it possible to simplify the earlier example to:

```jsx
import { observer, useLocalObservable } from "mobx-react-lite"

const TimerView = observer(() => {
    const timer = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        }
    }))
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

### You might not need locally observable state

Ничего не поняла. [Ресурс](https://mobx.js.org/react-integration.html#you-might-not-need-locally-observable-state).

## Always read observables inside observer components

Use `observer` to all components that read observable data. `observer` only improve the component you decorate, not the components it calls. So usually all of your components should be wrapped by the observer.

### Tip: Grab values from objects as late as possible

`observer` works best if you pass object references around as long as possible, and only read their properties inside the observer based components that are going to render them into the DOM / low-level components.

In the above example, the `TimerView` component would not react to future changes if it was defined as follows, because the `.secondsPassed` is read outside the `observer` component, but not inside, and is hence not tracked:

```jsx
const TimerView = observer(({ secondsPassed }) => <span>Seconds passed: {secondsPassed}</span>)

React.render(<TimerViewer secondsPassed={myTimer.secondsPassed} />, document.body)
```

## Tips

### Note: `mobx-react` vs. `mobx-react-lite`

`mobx-react` is it's big brother, which uses `mobx-react-lite` under the hood. It offers a few more features:

- Support for React class components.
- Provider and inject. MobX's own React.createContext predecessor which is not needed anymore.
- Observable specific propTypes.

### `observer` for class based React components

```jsx
import React from "React"
import { observer } from "mobx-react"

const TimerView = observer(
    class TimerView extends React.Component {
        render() {
            const { timer } = this.props
            return <span>Seconds passed: {timer.secondsPassed} </span>
        }
    }
)
```

### Tip: deriving computeds from props

In some cases the computed values of your local observables might depend on some of the props your component receives. However, the set of props that a React component receives is in itself not observable, so changes to the props won't be reflected in any computed values. You have to manually update local observable state in order to properly derive computed values from latest data.

```jsx
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"

const TimerView = observer(({ offset }) => {
    const timer = useLocalObservable(() => ({
        offset, // The initial offset value
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        },
        get offsetTime() {
            return this.secondsPassed - this.offset // Not 'offset' from 'props'!
        }
    }))

    useEffect(() => {
        // Sync the offset from 'props' into the observable 'timer'
        timer.offset = offset
    }, [offset])

    // Effect to set up a timer, only for demo purposes.
    useEffect(() => {
        const handle = setInterval(timer.increaseTimer, 1000)
        return () => {
            clearInterval(handle)
        }
    }, [])

    return <span>Seconds passed: {timer.offsetTime}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

In practice you will rarely need this pattern, since `return <span>Seconds passed: {timer.secondsPassed - offset}</span>` is a much simpler, albeit slightly less efficient solution.

## Troubleshooting

Help! My component isn't re-rendering...

1. Make sure you didn't forget `observer` (yes, this is the most common mistake).
2. Verify that the thing you intend to react to is indeed observable. Use utilities like `isObservable`, `isObservableProp` if needed to verify this at runtime.
3. Check the console logs in the browsers for any warnings or errors.
4. Make sure you grok how tracking works in general. Check out the 'Understanding reactivity' section.
5. Read the common pitfalls as described above.
6. Configure MobX to warn you of unsound usage of mechanisms and check the console logs.
7. Use trace to verify that you are subscribing to the right things or check what MobX is doing in general using `spy` / the `mobx-logger` package.
