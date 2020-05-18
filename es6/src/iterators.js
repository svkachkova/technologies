let xmen = ['Cylops', 'Wolverine', 'Rogue'];

for (let xman of xmen) {
    console.log(xman);
}

console.log('***********');

// то же самое через итератор
let iterator = xmen[Symbol.iterator]();

let next = iterator.next();

while (!next.done) {
    console.log(next.value);
    next = iterator.next();
}

// ------------------------------------
let randomGenerator = {
    generate() {
        return this[Symbol.iterator]();
    },

    [Symbol.iterator]() {
        let count = 0;

        return {
            next() {
                let value = Math.ceil(Math.random() * 100);
                let done = count >= 10;
                count++;
                return {value, done};
            }
        };
    }
};

let random = randomGenerator.generate();
console.log(random.next().value);

// ---------------------------------
class ArrayIterator {
    constructor(array) {
        this.array = array;
        this.index = 0;
    }

    next() {
        let result = { value: undefined, done: true };

        if (this.index < this.array.length) {
            result.value = this.array[this.index];
            result.done = false;
            this.index++;
        }

        return result;
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTasks(...tasks) {
        this.tasks = [...this.tasks, ...tasks];
    }

    [Symbol.iterator]() {
        return new ArrayIterator(this.tasks);
    }
}

let taskList = new TaskList();
taskList.addTasks('изучить JS', 'изучить ES6');

for (let task of taskList) {
    console.log(task);
}
