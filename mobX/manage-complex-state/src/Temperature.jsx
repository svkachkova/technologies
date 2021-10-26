import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { TemperatureContext } from './index';
import TemperatureStore from './TemperatureStore';

const Temperature = observer(() => {

    const temperatures = useContext(TemperatureContext);

    return (
        <div>
            <TemperatureInput />
            <ul>
                { temperatures.map(t => <TView key={t.id} store={t} />) }
            </ul>
        </div>
    );
});

const TView = observer(({store}) => {

    return (
        <li onClick={ () => { store.increment() }}>
            {store.location}:
            {store.loading ? ' loading..' : ` ${store.temperature}`}
        </li>
    );
});

const TemperatureInput = observer(() => {

    const [input, setInput] = useState('');
    const temperatures = useContext(TemperatureContext);

    return (
        <form>
            Destination
            <input onChange={ (e) => { setInput(e.target.value) }} value={input} />
            <button onClick={ (e) => {
                e.preventDefault();
                temperatures.push(new TemperatureStore(input));
                setInput('');
            } }>Add</button>
        </form>
    );
});

export default Temperature;
