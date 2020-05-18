class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    // render() будет вызываться каждый раз, когда происходит обновление компонента
    render() {
        return (
            <div>
                <h1>Now, {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
