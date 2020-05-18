// встраивание любых корректных JS-выражений внутри фигурных скобок
const name = 'Sarah Halliwell';
const element = <h1>Hello {name}!</h1>;

// JSX можно использовать внутри выражений if и циклов for, присваивать переменным, 
// передавать функции в качестве аргумента и возвращать из функции.
function getGreeting(user) {
    if (user) {
        return <h1>Hello {user.name}</h1>;
    }
    return <h1>Hello user</h1>;
}

// "" для строкового литерала в качестве атрибута, {} для JS-выражений
const elementClassName = <div className="my-class"></div>;
const elementURL = <img src={user.src} />;

// дочерние элементы
const elementParent = (
    <div>
        <h1>Hello</h1>
        <img src="#" />
    </div>
);

// Babel компилирует JSX в вызовы React.createElement()
const elementObject = <h1 className="greeting">Hello!</h1>;
const elementBabelObject = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello!'
);
