import './styles.css';

const counter = document.getElementById('counter');
const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const asyncButton = document.getElementById('async');
const themeButton = document.getElementById('theme');

let state = 0;
render();

addButton.addEventListener('click', () => { 
    state++;
    render();
});

subButton.addEventListener('click', () => { 
    state--; 
    render();
});

asyncButton.addEventListener('click', () => {
    setTimeout(() => {
        state++;
        render();
    }, 2000);
});

themeButton.addEventListener('click', () => { 
    document.body.classList.toggle('dark');
});

function render() {
    counter.textContent = state.toString();
}