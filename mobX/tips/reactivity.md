# Understanding reactivity

MobX reacts to any existing observable property that is read during the execution of a tracked function.

- **reading** is dereferencing (разыменовывает) an object's property (`user.name`, `user['name']`, `todos[3]`).

- **tracked functions** are the expression of `computed`, the rendering of an `observer` React function component, the `render()` method of an `observer` based React class component, and the functions that are passed as the first param to `autorun`, `reaction` and `when`.

- **during** means that only those observables that are read while the function is executing are tracked.  But things that were created from the function will not be tracked (`setTimeout`, `promise.then`, `await`).

In other words, MobX will not react to:

- Values that are derived from observables, but outside a tracked function
- Observables that are read in an asynchronously invoked code block

## MobX tracks property access, not values

```js
class Message {
    title
    author
    likes
    constructor(title, author, likes) {
        makeAutoObservable(this)
        this.title = title
        this.author = author
        this.likes = likes
    }

    updateTitle(title) {
        this.title = title
    }
}

let message = new Message("Foo", { name: "Michel" }, ["Joe", "Sara"])
```

In memory this looks as follows. The green boxes indicate observable properties. Note that the values themselves are not observable!

![observed refs](./observed-refs.png)

## Examples

### Correct: dereference (разыменование) inside the tracked function

You can verify what MobX will track by calling `trace()` inside the tracked function.

```js
import { trace } from "mobx"

const disposer = autorun(() => {
    console.log(message.title)
    trace()
})
// Outputs:
// [mobx.trace] 'Autorun@2' tracing enabled

message.updateTitle("Hello")
// Outputs:
// [mobx.trace] 'Autorun@2' is invalidated due to a change in: 'Message@1.title'
// Hello
``` 

It is also possible to get the internal dependency (or observer) tree by using `getDependencyTree`:

```js
import { getDependencyTree } from "mobx"

// Prints the dependency tree of the reaction coupled to the disposer.
console.log(getDependencyTree(disposer))
// Outputs:
// { name: 'Autorun@2', dependencies: [ { name: 'Message@1.title' } ] }
```

### Incorrect: changing a non-observable reference

This will not react. `message` was changed, but `message` is not an observable, just a variable which refers to an observable, but the variable (reference) itself is not observable.

```js
autorun(() => {
    console.log(message.title)
})
message = new Message("Bar", { name: "Martijn" }, ["Felicia", "Marcus"])
```

### Incorrect: dereference outside of a tracked function

This will not react. `message.title` was dereferenced outside of `autorun`, and just contains the value of `message.title` at the moment of dereferencing (the string "Foo"). `title` is not an observable so `autorun` will never react.

```js
let title = message.title
autorun(() => {
    console.log(title)
})
message.updateMessage("Bar")
```

### Correct: dereference inside the tracked function

Note that we had to use `runInAction` here to be allowed to make changes outside of an `action`.

```js
autorun(() => {
    console.log(message.author.name)
})

runInAction(() => {
    message.author.name = "Sara"
})
runInAction(() => {
    message.author = { name: "Joe" }
})
```

### Incorrect: store a local reference to an observable object without tracking

```js
const author = message.author
autorun(() => {
    console.log(author.name)
})

runInAction(() => {
    message.author.name = "Sara"
})
runInAction(() => {
    message.author = { name: "Joe" }
})
```

### Common pitfall: `console.log`

```js
autorun(() => {
    console.log(message.title) // Clearly, the `.title` observable is used.
})

autorun(() => {
    console.log(mobx.toJS(message)) // toJS creates a deep clone, and thus will read the message.
})

autorun(() => {
    console.log({ ...message }) // Creates a shallow clone, also using `.title` in the process.
})

autorun(() => {
    console.log(JSON.stringify(message)) // Also reads the entire structure.
})
```

### Correct: access array properties in tracked function

```js
autorun(() => {
    console.log(message.likes.length)
})
message.likes.push("Jennifer")
```

### Correct: access array functions in tracked function

All array functions that do not mutate the array are tracked automatically.

```js
autorun(() => {
    console.log(message.likes.join(", "))
})
message.likes.push("Jennifer")
```


