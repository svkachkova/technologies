import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { autorun, observable } from 'mobx';
import Store from './Store';
import Counter from './Counter';
import Temperature from './Temperature';

const store = new Store();
store.increment();

const temperatures = observable([]);

export const TemperatureContext = React.createContext(temperatures);

autorun(() => {
  const t = temperatures.find(t => t.temperatureCelsius > 25);
  if (t) {
    console.log(`Book now! ${t.location}`);
  }
});

ReactDOM.render(
  <TemperatureContext.Provider value={temperatures}>
    <Counter store={ store } />
    <Temperature />
  </TemperatureContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
