# React hooks with TypeScript

## useState

```tsx
// import useState next to FunctionComponent
import React, { FunctionComponent, useState } from 'react';

// our components props accept a number for the initial value
const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
    // since we pass a number here, clicks is going to be a number.
    // setClicks is a function that accepts either a number or a function returning
    // a number
    const [clicks, setClicks] = useState(initial);
    return <>
        <p>Clicks: {clicks}</p>
        <button onClick={() => setClicks(clicks+1)}>+</button>
        <button onClick={() => setClicks(clicks-1)}>-</button>
    </>
}
```

## useEffect

```ts
useEffect(() => {
    const handler = () => {
        document.title = window.width;
    }
    window.addEventListener('resize', handler);

    return () => {
        window.removeEventListener('resize', handler);
    }
})
```

This also goes for `useLayoutEffect` and `useMutationEffect`.

## useContext

Type inference works brilliantly here, you don’t need to use any TypeScript specific language features to get everything done:

```tsx
import React, { useContext } from 'react';

// our context sets a property of type string
export const LanguageContext = React.createContext({ lang: 'en' });

const Display = () => {
    // lang will be of type string
    const { lang } = useContext(LanguageContext);
    return <>
        <p>Your selected language: {lang}</p>
    </>
}
```

## useRef

```tsx
function TextInputWithFocusButton() {
    // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
    const inputEl = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        // strict null checks need us to check if inputEl and current exist.
        // but once current exists, it is of type HTMLInputElement, thus it
        // has the method focus!
        if(inputEl && inputEl.current) {
            inputEl.current.focus();
        } 
    };
    return (
    <>
        { /* in addition, inputEl only can be used with input elements. Yay! */ }
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
    </>
    );
}
```

## useMemo

```ts
function getHistogram(image: ImageData): number[] {
    // details not really necessary for us right now
    return histogram;
}

function Histogram() {
  /*
   * We don't want to run this method all the time, that's why we save
   * the histogram and only update it if imageData (from a state or somewhere)
   * changes.
   *
   * If you provide correct return types for your function or type inference is
   * strong enough, your memoized value has the same type.
   * In that case, our histogram is an array of numbers
   */
  const histogram = useMemo(() => getHistogram(imageData), [imageData]);
}
```

## useCallback

```ts
const memoCallback = useCallback((a: number) => {
    // doSomething
}, [a])

// ⚡️ Won't compile, as the callback needs a number
memoCallback();

// ✅ compiles
memoCallback(3);
```

## useReducer

```tsx
type ActionType = {
    type: 'reset' | 'decrement' | 'increment'
}

const initialState = { count: 0 };

// We only need to set the type here ...
function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
    // ... to make sure that we don't have any other strings here ...
    case 'reset':
        return initialState;
    case 'increment':
        return { count: state.count + 1 };
    case 'decrement':
        return { count: state.count - 1 };
    default:
        return state;
    }
}

function Counter({ initialCount = 0 }) {
    // ⚡️ Compile error! Strings are not compatible with numbers
    const [state, dispatch] = useReducer(reducer, { count: 'whoops, a string' });
    // ✅ All good
    const [state, dispatch] = useReducer(reducer, { count: initialCount });

    return (
        <>
            Count: {state.count}
            { /* and can dispatch certain events here */ }
            <button onClick={() => dispatch({ type: 'reset' })}>
                Reset
            </button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    );
}
```
