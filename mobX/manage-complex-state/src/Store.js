import { makeAutoObservable } from 'mobx';

class Store {
    count = 0;

    constructor() {
        makeAutoObservable(this);
        this.count = 0;
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

export default Store;