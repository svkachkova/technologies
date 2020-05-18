// функциональный компонент 
function Welcome(props) {
    return <h1>Welcome, {props.name}</h1>
}

// классовый компонент
class Welcome extends React.Component {
    render() {
        return <h1>Welcome {props.name}</h1>;
    }
}

// рендеринг компонента
const element = <Welcome name="Ann" />;
ReactDOM.render(element, document.getElementById('root'));

// композиция компонентов
function App() {
    return (
        <div>
            <Welcome name="Ann" />
            <Welcome name="Mike" />
            <Welcome name="Tom" />
        </div>
    );
}

// пропсы по умолчанию
class Greeting extends React.Component {
    // ...
}
  
Greeting.defaultProps = {
    name: 'Лиза'
};
