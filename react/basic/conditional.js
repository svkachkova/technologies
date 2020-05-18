function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let buttton;

        if (isLoggedIn) {
            buttton = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            buttton = <LoginButton onClick={this.handleLoginClick} />
        }

        return (
            <div>{buttton}</div>
        );
    }
}

ReactDOM.render(<LoginControl />, document.getElementById('root'));
