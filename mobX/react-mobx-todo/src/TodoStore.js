import { makeObservable, autorun, observable, computed, action } from 'mobx'

class TodoStore {
    todos = [];
    pendingRequests = 0;

    constructor() {
        makeObservable(this, {
            todos: observable,
            pendingRequests: observable,
            computedTodosCount: computed,
            report: computed,
            addTodo: action,
        });

        // reaction
        autorun(() => console.log(this.report));
    }

    // derivations - computed value
    get computedTodosCount() {
        return this.todos.filter(todo => todo.completed).length;
    }

    // derivations - computed value
    get report() {
        if (this.todos.length === 0) {
            return '<none>';
        }

        const nextTodo = this.todos.find(todo => todo.completed === false);
        return `Next todo: '${nextTodo ? nextTodo.task : '<none>'}'. ` +
            `Progress: ${this.computedTodosCount}/${this.todos.length}`;
    }

    // action
    addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null,
        });
    }
}

export default TodoStore;
