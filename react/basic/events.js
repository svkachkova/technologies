class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle = true
        }

        // привязка для работы `this` в колбэке
        this.handkeClick = this.handkeClick.bind(this);
    }

    // привязка для работы `this` в колбэке (синтаксис общедоступных полей)
    // handkeClick = () => { ... }
    
    handkeClick() {
        this.setState(state => ({
            isToggle: !state.isToggle
        }));
    }

    render() {
        return (
            <button onClick={this.handkeClick}>
                {this.state.isToggle ? 'On' : 'Off'}
            </button>
        );
    }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
