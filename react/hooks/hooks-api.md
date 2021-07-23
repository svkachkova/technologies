# Справочник API хуков

## useState 

`const [state, setState] = useState(initialState);`

### Функциональные обновления 

Если новое состояние вычисляется с использованием предыдущего состояния, в `setState` можено передать функцию. Она получит предыдущее значение и вернёт обновлённое значение.

```jsx
function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
        <>
            Счёт: {count}
            <button onClick={() => setCount(initialCount)}>Сбросить</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        </>
    );
}
```

### Ленивая инициализация состояния

Если начальное состояние является результатом дорогостоящих вычислений, можно предоставить функцию, которая будет выполняться только при начальном рендеринге:

```js
const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
});
```

## useEffect 

`useEffect(didUpdate);`

### Очистка эффекта 

```js
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        // Очистить подписку
        subscription.unsubscribe();
    };
});
```

### Условное срабатывание эффекта  

```js
useEffect(
    () => {
        const subscription = props.source.subscribe();
        return () => {
            subscription.unsubscribe();
        };
    },
    [props.source],
);
```

## useContext

`const value = useContext(MyContext);`

Принимает объект контекста (значение, возвращённое из `React.createContext`) и возвращает текущее значение контекста для этого контекста. Текущее значение контекста определяется пропом `value` ближайшего `<MyContext.Provider>` над вызывающим компонентом в дереве.

Когда ближайший `<MyContext.Provider>` над компонентом обновляется, этот хук вызовет повторный рендер с последним значением контекста, переданным этому провайдеру MyContext

```jsx
const themes = {
    light: { foreground: "#000000", background: "#eeeeee" },
    dark: { foreground: "#ffffff", background: "#222222" }
};

const ThemeContext = React.createContext(themes.light);

function App() {
    return (
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar(props) {
    return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (    
      <button style={{ background: theme.background, color: theme.foreground }}>     
        Я стилизован темой из контекста!   
      </button>  );
}
```

## useReducer

`const [state, dispatch] = useReducer(reducer, initialArg, init);`

Альтернатива для `useState`. Принимает редюсер типа `(state, action) => newState` и возвращает текущее состояние в паре с методом `dispatch`.

Хук `useReducer` обычно предпочтительнее `useState`, когда у вас сложная логика состояния, которая включает в себя несколько значений, или когда следующее состояние зависит от предыдущего.

Вот пример счётчика из раздела useState, переписанный для использования редюсера:

```jsx
const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
        }
    }

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}
```

## useCallback

Хук `useCallback` вернёт мемоизированную версию колбэка, который изменяется только, если изменяются значения одной из зависимостей. Он принимает встроенный колбэк и массив зависимостей.

`useCallback(fn, deps)` — это эквивалент `useMemo(() => fn, deps)`.

```js
const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [a, b],
);
```

## useMemo

`useMemo` будет повторно вычислять мемоизированное значение только тогда, когда значение какой-либо из зависимостей изменилось. Хук принимает «создающую» функцию и массив зависимостей, и возвращает мемоизированное значение.

Если массив не был передан, новое значение будет вычисляться при каждом рендере.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## useRef

`const refContainer = useRef(initialValue);`

`useRef` возвращает изменяемый ref-объект, свойство `.current` которого инициализируется переданным аргументом (`initialValue`). Возвращённый объект будет сохраняться в течение всего времени жизни компонента.

```jsx
function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();    // `current` указывает на смонтированный элемент `input`
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Установить фокус на поле ввода</button>
        </>
    );
}s
```

## useLayoutEffect

Сигнатура идентична `useEffect`, но этот хук запускается синхронно после всех изменений DOM. Используйте его для чтения макета из DOM и синхронного повторного рендеринга. Обновления, запланированные внутри `useLayoutEffect`, будут полностью применены синхронно перед тем, как браузер получит шанс осуществить отрисовку.

## useDebugValue

`useDebugValue(value)`

`useDebugValue` может использоваться для отображения метки для пользовательских хуков в React DevTools.

Например, рассмотрим пользовательский хук `useFriendStatus`:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...

  // Показывать ярлык в DevTools рядом с этим хуком  
  // например, «Статус друга: В сети»  
  
  useDebugValue(isOnline ? 'В сети' : 'Не в сети');
  return isOnline;
}
```
