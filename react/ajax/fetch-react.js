// Оправляю запрос на сервер, для получения массива:

const peoples = 'https://randomuser.me/api/?results=50';

function componentDidMount() {
    fetch(peoples)
    .then(res => {
        if(res.status !== 200) {
            console.log(res.status);
            return;
        }
        res.json().then(function(res) {
            this.setState({data: res});
        });
    })
}

// И соответственно результат запихиваю в компонент:
<Header items={data} />

// Запрос не успевает приняться перед render'ом компонента
// ответ: проверяйте перед рендером данные или задайте начальное значение для data

// --------------------------

// компонента, который извлекает посты из reddit.com

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        .then(res => {
            const posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts });
        });
    }

    render() {
        return (
            <div>
                <h1>{`/r/${this.props.subreddit}`}</h1>
                <ul>
                    {this.state.posts.map(post =>
                        <li key={post.id}>{post.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <FetchDemo subreddit="reactjs"/>,
    document.getElementById('root')
);


// --------------------------------

// таблицу со списком пользователей 

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.props = {
            requestAddress: '',
        };
    }

    // бизнес-логика приложения может предусматривать частые запросы к серверу
    // и обработка полученных данных может содержать сложные операции
    // => лучше избегать отправки AJAX запроса в методах жизненного цикла компонента.
    // лучше выносить её в отдельные методы

    loadData() {
        fetch(this.props.requestAddress)
            .then(results => { return results.json() })
            .then(data => {
            this.setState({users: data });
            })
            .catch(() => {
                alert('Ошибка!');
            });
    }

    componentWillMount() {
        this.loadData();
    }

    render() {}
}

// --------------------------------

// Fetch и авторизация

// Чтобы fetch мог передавать данные для авторизации нужно явно «сказать» ему, 
// что в нём передаются данные для авторизации с помощью credentials.

class Credentials extends React.Component {
    componentDidMount() {
        const url = 'https://172.168.0.1/api/v1/methdeName?id="123213"';
        const headers = new Headers({
            'Authorization': '0ZHJadMU0KI6' 
        });
        const options = {
            headers,
            credentials:"include" // Вот, что нужно задать
        };
    
        fetch(url, options).then((response)=>{
            console.log(response.json());
        })
    }
}

// Fetch в React.js

class Succes extends Component {
    constructor(props){
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            items: Array
        };
    }

    componentDidMount() {

        fetch("http://example.url/page.php")
            .then(response => response.json())
            .then((response) => {
                this.setState({items: response});
                this.setState({isLoaded: true});
            })
            .then((error) => {
                this.setState({false: true});
                this.setState({error});
            });
    }

    render () {
        const data = Array.from(this.state.data.headers);

        if (isLoaded) {
            items.map((element, index) => {
                return <TableRow key={index} value={element} />
            });
        } else {
            return <tr><td>Не загружено</td></tr>
        }
        // error ? (<tr><td>{error}</td></tr>) : (false)
    }
}

// пример react.org

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {

        fetch("https://api.example.com/items")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}
