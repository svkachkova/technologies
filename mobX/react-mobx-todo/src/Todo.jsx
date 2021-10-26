import { observer } from 'mobx-react-lite';

const TodoList = observer(({store}) => {
    const onNewTodo = () => {
        store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    };

    return (
        <div>
            { store.report }
            <ul>
                { store.todos
                    .map((todo, index) => <TodoView todo={ todo } key={ index } />)
                }
            </ul>
            { store.pendingRequests > 0 ? <div>Loading...</div> : null }
            <button onClick={ onNewTodo }>New Todo</button>
            <small> (double-click a todo to edit)</small>
        </div>
    );
});

const TodoView = observer(({todo}) => {
    const onToggleCompleted = () => {
        todo.completed = !todo.completed;
    };

    const onRename = () => {
        todo.task = prompt('Task name', todo.task) || todo.task;
    };

    return (
        <li onDoubleClick={ onRename }>
            <input 
                type='checkbox'
                checked={ todo.completed }
                onChange={ onToggleCompleted }
            />
            { todo.task }
            { todo.assignee ? 
                <small>{ todo.assignee.name }</small> : 
                null
            }
        </li>
    );
});

export default TodoList;
