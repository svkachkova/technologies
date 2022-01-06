import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { createStore } from './createStore';
import { rootReducer } from './redux/rootReducer';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions';
import './styles.css';

const counter = document.getElementById('counter');
const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const asyncButton = document.getElementById('async');
const themeButton = document.getElementById('theme');

const store = createStore(
    rootReducer, 
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);

addButton.addEventListener('click', () => { 
    store.dispatch(increment());
});

subButton.addEventListener('click', () => { 
    store.dispatch(decrement());
});

asyncButton.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
});

themeButton.addEventListener('click', () => { 
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state.counter;
    document.body.className = state.theme.value;

    [addButton, subButton, asyncButton, themeButton].forEach(button => 
        button.disabled = state.theme.isDisabled
    );
})

store.dispatch({ type: 'INIT_APP' });

// function logger(state) {
//     return function(next) {
//         return function(action) {
//             console.log('State: ', state.getState());
//             console.log('Action: ', action);
//             return next(action);
//         };
//     };
// }
