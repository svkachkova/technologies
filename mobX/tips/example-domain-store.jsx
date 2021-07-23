import { makeAutoObservable, runInAction } from "mobx"
import uuid from "node-uuid"

export class TodoStore {
    authorStore
    transportLayer
    todos = []
    isLoading = true

    constructor(transportLayer, authorStore) {
        makeAutoObservable(this)
        this.authorStore = authorStore // Store that can resolve authors.
        this.transportLayer = transportLayer // Thing that can make server requests.
        this.transportLayer.onReceiveTodoUpdate(updatedTodo =>
            this.updateTodoFromServer(updatedTodo)
        )
        this.loadTodos()
    }

    // Fetches all Todos from the server.
    loadTodos() {
        this.isLoading = true
        this.transportLayer.fetchTodos().then(fetchedTodos => {
            runInAction(() => {
                fetchedTodos.forEach(json => this.updateTodoFromServer(json))
                this.isLoading = false
            })
        })
    }

    // Update a Todo with information from the server. Guarantees a Todo only
    // exists once. Might either construct a new Todo, update an existing one,
    // or remove a Todo if it has been deleted on the server.
    updateTodoFromServer(json) {
        let todo = this.todos.find(todo => todo.id === json.id)
        if (!todo) {
            todo = new Todo(this, json.id)
            this.todos.push(todo)
        }
        if (json.isDeleted) {
            this.removeTodo(todo)
        } else {
            todo.updateFromJson(json)
        }
    }

    // Creates a fresh Todo on the client and the server.
    createTodo() {
        const todo = new Todo(this)
        this.todos.push(todo)
        return todo
    }

    // A Todo was somehow deleted, clean it from the client memory.
    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
        todo.dispose()
    }
}

// Domain object Todo.
export class Todo {
    id = null // Unique id of this Todo, immutable.
    completed = false
    task = ""
    author = null // Reference to an Author object (from the authorStore).
    store = null
    autoSave = true // Indicator for submitting changes in this Todo to the server.
    saveHandler = null // Disposer of the side effect auto-saving this Todo (dispose).

    constructor(store, id = uuid.v4()) {
        makeAutoObservable(this, {
            id: false,
            store: false,
            autoSave: false,
            saveHandler: false,
            dispose: false
        })
        this.store = store
        this.id = id

        this.saveHandler = reaction(
            () => this.asJson, // Observe everything that is used in the JSON.
            json => {
                // If autoSave is true, send JSON to the server.
                if (this.autoSave) {
                    this.store.transportLayer.saveTodo(json)
                }
            }
        )
    }

    // Remove this Todo from the client and the server.
    delete() {
        this.store.transportLayer.deleteTodo(this.id)
        this.store.removeTodo(this)
    }

    get asJson() {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task,
            authorId: this.author ? this.author.id : null
        }
    }

    // Update this Todo with information from the server.
    updateFromJson(json) {
        this.autoSave = false // Prevent sending of our changes back to the server.
        this.completed = json.completed
        this.task = json.task
        this.author = this.store.authorStore.resolveAuthor(json.authorId)
        this.autoSave = true
    }

    // Clean up the observer.
    dispose() {
        this.saveHandler()
    }
}