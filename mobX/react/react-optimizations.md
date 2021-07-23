# Optimizing React component rendering

## Use many small components

`observer` components will track all values they use and re-render if any of them changes. So the smaller your components are, the smaller the change they have to re-render. It means that more parts of your user interface have the possibility to render independently of each other.

## Render lists in dedicated components

Recommended to have components that just map over a collection and render it, and render nothing else.

Good:
```jsx
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <TodosView todos={todos} />
    </div>
))

const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
        ))}
    </ul>
))
```

Bad:
```jsx
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <ul>
            {todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
    </div>
))
```

## Don't use array indexes as keys

Don't use array indexes or any value that might change in the future as key. Generate ids for your objects if needed.

## Dereference (разыменовывать) values late

When using `mobx-react` it is recommended to dereference values as late as possible. If this happens deeper in your component tree, less components have to re-render.

```jsx
// Slower:
<DisplayName name={person.name} />

// Faster:
<DisplayName person={person} />
```

In the faster example, a change in the name property triggers only DisplayName to re-render, while in the slower one the owner of the component has to re-render as well.

### Function props

Before:
```jsx
const PersonNameDisplayer = observer(({ person }) => <DisplayName name={person.name} />)
const CarNameDisplayer = observer(({ car }) => <DisplayName name={car.model} />)
const ManufacturerNameDisplayer = observer(({ car }) => <DisplayName name={car.manufacturer.name} />)
```

After:
```jsx
const GenericNameDisplayer = observer(({ getName }) => <DisplayName name={getName()} />)

const MyComponent = ({ person, car }) => (
    <>
        <GenericNameDisplayer getName={() => person.name} />
        <GenericNameDisplayer getName={() => car.model} />
        <GenericNameDisplayer getName={() => car.manufacturer.name} />
    </>
)
```

This approach will allow GenericNameDisplayer to be reused throughout your application to render any name, and you still keep component re-rendering to a minimum.
