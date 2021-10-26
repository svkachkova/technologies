import React from 'react';
import { observer } from 'mobx-react-lite';

const Counter = observer(({store}) => {
    
    return (
        <div>
            Counter { store.count } <br />
            <button onClick={ () => { store.decrement() } }>-</button>
            <button onClick={ () => { store.increment() } }>+</button> 
        </div>
    )
})

export default Counter;
