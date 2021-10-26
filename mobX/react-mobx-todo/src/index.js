import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { observable, action } from 'mobx';

import TodoList from './Todo';
import TodoStore from './TodoStore';

const todoStore = new TodoStore();

todoStore.addTodo('reed MobX tutorial');
todoStore.addTodo('try MobX');
todoStore.todos[0].completed = true;
todoStore.todos[1].task = 'try MobX in own project';
todoStore.todos[0].task = 'grok MobX tutorial';

const peopleStore = observable([
  { name: 'Michel' },
  { name: 'Me' },
]);

todoStore.todos[0].assignee = peopleStore[0];
todoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = "Michel Weststrate";

console.log('todoList', TodoList)

ReactDOM.render(
  <div>
    <TodoList store={ todoStore } />
    Your name: <input onkeyup="peopleStore[1].name = event.target.value" />
  </div>,
  document.getElementById('root')
);

todoStore.pendingRequests++;

setTimeout(action(() => {
  todoStore.addTodo('Random Todo ' + Math.random());
  todoStore.pendingRequests--;
}), 2000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
