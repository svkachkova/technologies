# Flux concepts

Flux is a pattern for managing data flow in your application. The most important concept is that data flows in one direction.

## Flux Parts:

- Dispatcher
- Store
- Action
- View

### Dispatcher

The dispatcher is the central hub that manages all data flow in a Flux application. It receives (получать) actions and dispatches them to stores. There should be only one dispatcher in each application.

### Store

A store holds the data of an application. It contains the application state and logic. Every time a store's data changes it must emit a "change" event. There should be many stores in each application.

### Actions

Actions define the internal (внутренний) API of your application. They are simple objects that have a "type" field and some data. They are  dispatched from views or server.

### Views

Data from stores is displayed in views. Views can use whatever framework you want. It must subscribe to change events from store. When the store emits a change the view can get the new data and re-render.

## Flow of data

1. Views send actions to the dispatcher.
2. The dispatcher sends actions to every store.
3. Stores send data to the views.


```
Action ---> Dispatcher ---> Store ---> View
                ^                       |
                |                       |
                --------- Action --------
```
