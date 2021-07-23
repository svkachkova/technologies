# Computeds

Computed values can be used to derive information from other observables. They evaluate lazily, caching their output and only recomputing if one of the underlying observables has changed.

Computed values can be created by annotating JS getters with `computed`. Use `makeObservable` to declare a getter as `computed`. If you want all getters to be automatically declared as `computed`, use `makeAutoObservable`, `observable`.

```js
import { makeObservable, observable, computed, autorun } from "mobx"

class OrderLine {
    price = 0
    amount = 1

    constructor(price) {
        makeObservable(this, {
            price: observable,
            amount: observable,
            total: computed
        })
        this.price = price
    }

    get total() {
        console.log("Computing...")
        return this.price * this.amount
    }
}

const order = new OrderLine(0)

const stop = autorun(() => {
    console.log("Total: " + order.total)
})
// Computing...
// Total: 0

console.log(order.total)
// (No recomputing!)
// 0

order.amount = 5
// Computing...
// (No autorun)

order.price = 2
// Computing...
// Total: 10

stop()

order.price = 3
// Neither the computation nor autorun will be recomputed.
```

This is the dependency graph that would be created for the above example.

![computed-example](./computed-example.png)

## Rules

When using computed values there are a couple of best practices to follow:

- They should not have side effects or update other observables
- Avoid creating and returning new observables

## Tips

1. If a computed property is not in use by some reaction, then computed expressions are evaluated each time their value is requested, so they behave just like a normal property.

```js
const line = new OrderLine(2.0)

// If you access `line.total` outside of a reaction, it is recomputed every time.
setInterval(() => {
    console.log(line.total)
}, 60)
```
