# State hook

`useState` — это хук. Он вызываеется, чтобы наделить функциональный компонент внутренним состоянием. React будет хранить это состояние между рендерами.Вызов `useState` возвращает массив с двумя элементами, который содержит: текущее значение состояния и функцию для его обновления.

Единственный аргумент `useState` — это начальное состояние. Оно используется только при первом рендере.

Состояние создаётся только в момент, когда компонент рендерится впервые. В последующие рендеринги `useState` возвращает текущее состояние.

В отличие от `this.setState()` в классах, обновление переменной состояния всегда замещает её значение, а не осуществляет слияние.

## Пример

```jsx
import React, { useState } from 'react';

function Example() {
    // Объявляем новую переменную состояния "count"
    const [count, setCount] = useState(0);
    return (
    <div>
        <p>Вы нажали {count} раз</p>
        <button onClick={() => setCount(count + 1)}>
            Нажми на меня
        </button>
    </div>
    );
}
```

## Эквивалентный пример с классом

```jsx
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>Вы кликнули {this.state.count} раз</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Нажми на меня
                </button>
            </div>
        );
    }
}
```

## Использование нескольких переменных состояния

```jsx
function ExampleWithManyStates() {
    // Объявим несколько переменных состояния!
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('банан');
    const [todos, setTodos] = useState([{ text: 'Изучить хуки' }]);
}
```
