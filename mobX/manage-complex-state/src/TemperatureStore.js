import { makeAutoObservable } from 'mobx';

const APPID = '6c9bb64443d124019b41ea00de26732e';

class TemperatureStore {
    id = Math.random();
    unit = 'C';
    temperatureCelsius = 25;
    location = 'Amsterdam';
    loading = true;

    constructor(location) {
        makeAutoObservable(this, { id: false });
        this.location = location;
        this.fetch();
    }

    get temperatureKelvin() {
        return this.temperatureCelsius + 273.15;
    }

    get temperatureFahrenheit() {
        return this.temperatureCelsius * (9 / 5) + 32;
    }

    get temperature() {
        switch (this.unit) {
            case 'C': return this.temperatureCelsius + '°C';
            case 'K': return this.temperatureKelvin + '°K';
            case 'F': return this.temperatureFahrenheit + '°F';
            default: return 'Use Celsium, Kelvin or Fahrenheit.'
        }
    }

    setUnit(unit) {
        this.unit = unit;
    }

    setCelcius(degree) {
        this.temperatureCelsius = degree;
    }

    setTemperatureAndUnit(degree, unit) {
        this.setCelcius(degree);
        this.setUnit(unit);
    }

    increment() {
        this.setCelcius(this.temperatureCelsius + 1);
    }

    *fetch() {
        yield fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${APPID}&q=${this.location}`)
            .then(response => response.json())
            .then(json => {
                this.temperatureCelsius = Number((json.main.temp - 273.15).toFixed(1));
                this.loading = false;
            })
            .catch(error => {
                console.log('This city is not in this api, try again.');
            });
    }
}

export default TemperatureStore;
