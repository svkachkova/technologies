# State

The basics of making objects observable is specifying an annotation per property using `makeObservable`. The most important annotations are:

- `observable` defines a trackable field that stores the state
- `action` marks a method as action that will modify the state
- `computed` marks a getter that will derive new facts from the state and cache its output

Collections such as arrays, Maps and Sets are made observable automatically.

## makeObservable

`makeObservable(target, annotations?, options?)`

- `target` - any JS object (including class instances)
- `annotations` - maps annotations to each member of object

```js
import { makeObservable, observable, computed, action, flow } from "mobx"

class Doubler {
    value

    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
            fetch: flow
        })
        this.value = value
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }

    *fetch() {
        const response = yield fetch("/api/value")
        this.value = response.json()
    }
}
```

## makeAutoObservable

`makeAutoObservable(target, overrides?, options?)`

- `overrides` - use it to override the default behavior (`false` exclude a property or method from being processed entirely)

It defines all properties by default, using next rules:

- All own properties become `observable`
- All getters become `computed`
- All setters become `action`
- All functions on prototype become `autoAction`
- All generator functions on prototype become `flow`
- Members marked with `false` in the `overrides` argument will not be annotated (read only fields such as identifiers)

`makeAutoObservable` cannot be used on classes that have `super` or are subclassed.

```js
import { makeAutoObservable } from "mobx"

function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
```

## observable

`observable(source, overrides?, options?)`

It makes an entire object observable at once. The `source` object will be cloned and all members will be made observable, similar to how it would be done by `makeAutoObservable`.

`observable` great for collections like dynamically keyed objects, arrays, Maps and Sets.

```js
import { observable } from "mobx"

const todosById = observable({
    "TODO-123": {
        title: "find a decent task management system",
        done: false
    }
})

todosById["TODO-456"] = {
    title: "close all tickets older than two weeks",
    done: true
}

const tags = observable(["high prio", "medium prio", "low prio"])
tags.push("prio: for fun")
```

## Available annotations

- `observable` - defines a trackable field that stores state
- `observable.ref` - use it to store immutable data in an observable field
- `observable.shallow` - collection assigned will be made observable, but not the contents of the collection
- `observable.struct` - like `observable`, except that any assigned value that is structurally equal to the current value will be ignored
- `action` - mark a method as an action that will modify the state
- `computed` - can be used on a getter to declare it as a derived value that can be cached
- `computed.struct` - like `computed`, except that if after recomputing the result is structurally equal to the previous result, no observers will be notified
- `flow` - creates a `flow` to manage asynchronous processes

## Converting observables back to vanilla JavaScript collections

To convert a collection shallowly (неглубоко), the usual JavaScript mechanisms work:

```js
const plainObject = { ...observableObject }
const plainArray = observableArray.slice()
const plainMap = new Map(observableMap)
```

To convert a data tree recursively to plain objects, the `toJS` utility can be used. For classes, it is recommend to implement a `toJSON()` method, as it will be picked up by `JSON.stringify`.
