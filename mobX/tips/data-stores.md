# Definding data stores

The main responsibility of stores is to move logic and state out of your components into a standalone testable unit that can be used in both frontend and backend JavaScript.

Most applications benefit from having at least two stores: one for the domain state and another one for the UI state. The advantage of separating those two is you can reuse and test domain state universally.

## Domain Stores

Your application will contain one or multiple domain stores. These stores store data about your application (Todo items, users, books, movies, orders).

A single domain store should be responsible for a single concept in your application. A single store is often organized as a tree structure with multiple domain objects inside (one domain store for your products, and one for your orders and orderlines).

These are the responsibilities of a store:

1. Create instances of domain objects. Make sure domain objects know the store they belong to.
2. Make sure there is only one instance of each of your domain objects. The same user, order or todo should not be stored twice in memory.
3. Provide backend integration. Store data when needed.
4. Update existing instances if updates are received from the backend.
5. There should be only one instance of a store.

### Domain objects

Each domain object should be expressed using its own class (or constructor function). Domain objects are allowed to refer directly to domain objects from other stores.

It is possible to express your domain objects as plain objects, but classes have some important advantages over plain objects:

1. They can have methods. You don't have to pass stores around, or have to figure out which actions can be applied to an object if they are just available as instance methods.
2. They offer fine detailed control over the visibility of attributes and methods.
3. Objects created using a constructor function are free to mix observable properties and methods, and non-observable properties and methods.
4. They are easily recognizable and can be strictly type-checked.

### Example domain store

[code](./example-domain-store.jsx)

## UI Stores

This store typically doesn't have much logic, but it will hold many loosely coupled pieces of information about the UI.

Things you will typically find in UI stores:

- Session information
- Information about how far your application has loaded
- Information that will not be stored in the backend
- Information that affects the UI globally
    - Window dimensions
    - Accessibility information
    - Current language
    - Currently active theme
- User interface state as soon as it affects multiple unrelated components:
    - Current selection
    - Visibility of toolbars
    - State of a wizard
    - State of a global overlay
```js
import { makeAutoObservable, observable } from "mobx"

export class UiState {
    language = "en_US"
    pendingRequestCount = 0

    // .struct makes sure observer won't be signaled unless the
    // dimensions object changed in a deepEqual manner.
    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    constructor() {
        makeAutoObservable(this, { windowDimensions: observable.struct })
        window.onresize = () => {
            this.windowDimensions = getWindowDimensions()
        }
    }

    get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}
```

## Combining multiple stores

An effective pattern is to create a `RootStore` that instantiates all stores, and share references. The advantage of this pattern is:

1. Simple to set up.
2. Supports strong typing well.
3. Makes complex unit tests easy as you just have to instantiate a root store.

```js
class RootStore {
    constructor() {
        this.userStore = new UserStore(this)
        this.todoStore = new TodoStore(this)
    }
}

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    getTodos(user) {
        // Access todoStore through the root store.
        return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
    }
}

class TodoStore {
    todos = []
    rootStore

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }
}
```
