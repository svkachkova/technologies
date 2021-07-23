# Subclassing

You can only override `actions`/`flows`/`computeds` on prototype - you cannot override field declarations. Use `override` annotation for methods/getters overriden in subclass.

```js
import { makeObservable, observable, computed, action, override } from "mobx"

class Parent {
    // Annotated instance fields are NOT overridable
    observable = 0
    arrowAction = () => {}

    // Non-annotated instance fields are overridable
    overridableArrowAction = action(() => {})

    // Annotated prototype methods/getters are overridable
    action() {}
    actionBound() {}
    get computed() {}

    constructor() {
        makeObservable(this, {
            observable: observable,
            arrowAction: action
            action: action,
            actionBound: action.bound,
            computed: computed,
        })
    }
}

class Child extends Parent {
    /* --- INHERITED --- */
    // THROWS - TypeError: Cannot redefine property
    // observable = 5
    // arrowAction = () => {}

    // OK - not annotated
    overridableArrowAction = action(() => {})

    // OK - prototype
    action() {}
    actionBound() {}
    get computed() {}

    /* --- NEW --- */
    childObservable = 0;
    childArrowAction = () => {}
    childAction() {}
    childActionBound() {}
    get childComputed() {}

    constructor() {
        super()
        makeObservable(this, {
            // inherited
            action: override,
            actionBound: override,
            computed: override,
            // new
            childObservable: observable,
            childArrowAction: action
            childAction: action,
            childActionBound: action.bound,
            childComputed: computed,
        })
    }
}
```

## Limitations

1. Only `action`, `computed`, `flow`, `action.bound` defined on prototype can be overriden by subclass.
2. Field can't be re-annotated in subclass, except with `override`.
3. `makeAutoObservable` does not support subclassing.
4. Extending builtins (`ObservableMap`, `ObservableArray`, etc) is not supported.
5. You can't provide different options to `makeObservable` in subclass.
6. You can't mix annotations/decorators in single inheritance chain.

### TypeError: Cannot redefine property

If you see this, you're probably trying to override arrow function in subclass `x = () => {}`. That's not possible because all annotated fields of classes are non-configurable. You have two options:

1. Move function to prototype and use `action.bound` annotation instead

```js
class Parent {
    // action = () => {};
    // =>
    action() {}

    constructor() {
        makeObservable(this, {
            action: action.bound
        })
    }
}

class Child {
    action() {}

    constructor() {
        super()
        makeObservable(this, {
            action: override
        })
    }
}
```

2. Remove action annotation and wrap the function in action manually: `x = action(() => {})`

```js
class Parent {
    // action = () => {};
    // =>
    action = action(() => {})

    constructor() {
        makeObservable(this, {}) // <-- annotation removed
    }
}

class Child {
    action = action(() => {})

    constructor() {
        super()
        makeObservable(this, {}) // <-- annotation removed
    }
}
```
