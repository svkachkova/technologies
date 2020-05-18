// управляемые компоненты 
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // каждое нажатие клавиши вызывает handleChange, который обновляет состояние компонента, 
    // значение в поле будет обновляться по мере того, как пользователь печатает

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(`A name was submitted: ${this.state.value}`);
        event.preventDefault;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={this.state.value} 
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// аналогично можно написать форму с <textarea>
// <textarea value={this.state.value} onChange={this.handleChange} />

// <select>
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // вместо selected в <option>
            value: 'mango' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(`Your favorite flavor is: ${this.state.value}`);
        event.preventDefault;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="lime">Lime</option>
                        <option value="mango">Mango</option>
                        <option value="coconut">Coconut</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// <input type="file"> позволяет пользователю выбрать один или несколько файлов 
// для загрузки с устройства на сервер или управлять им через JS с помощью File API

// нескольких <input>
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuests" 
                        type="number" 
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}
