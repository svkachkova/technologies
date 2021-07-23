# Effect Hook

Хук `useEffect` даёт возможность выполнять побочные эффекты в функциональном компоненте (запрашивать данные, делать подписки или изменять DOM вручную). Он выполняет ту же роль, что и `componentDidMount`, `componentDidUpdate` и `componentWillUnmount` в React-классах, объединив их в единый API.

Используя `useEffect`, вы говорите React сделать что-то после рендера. React запомнит функцию (т.е. «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM. 

Хуки используют JavaScript-замыкания, чтобы получать доступ к переменным состояния и пропсам. Эффекты выполняются после каждого рендера, при этом React гарантирует, что он запустит эффект только после того, как DOM уже обновился.

В отличие от `componentDidMount` или `componentDidUpdate`, эффекты, запланированные с помощью `useEffect`, не блокируют браузер при попытке обновить экран. Ваше приложение будет быстрее реагировать на действия пользователя, даже когда эффект ещё не закончился. Большинству эффектов не нужно работать в синхронном режиме. 

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    // Аналогично componentDidMount и componentDidUpdate:  
    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        document.title = `Вы нажали ${count} раз`;  
    });
    return (
        <div>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => setCount(count + 1)}>
                Нажми на меня
            </button>
        </div>
    );
}
```

Существует два распространённых вида побочных эффектов в компонентах React: компоненты, которые требуют и не требуют сброса.

## Эффекты без сброса

Иногда мы хотим выполнить дополнительный код после того, как React обновил DOM. Сетевые запросы, изменения DOM вручную, логирование — всё это примеры эффектов, которые не требуют сброса. После того, как мы запустили их, можно сразу забыть о них, ведь больше никаких дополнительных действий не требуется.

### Пример с использованием классов

```jsx
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        document.title = `Вы нажали ${this.state.count} раз`;  
    }

    componentDidUpdate() {
        document.title = `Вы нажали ${this.state.count} раз`;
    }

    render() {
        return (
            <div>
                <p>Вы нажали {this.state.count} раз</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Нажми на меня
                </button>
            </div>
        );
    }
}
```

## Эффекты со сбросом  

### Пример с использованием классов 

```jsx
class FriendStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {    
        ChatAPI.subscribeToFriendStatus(      
            this.props.friend.id,      
            this.handleStatusChange    
        );  
    } 

    componentWillUnmount() {    
        ChatAPI.unsubscribeFromFriendStatus(      
            this.props.friend.id,      
            this.handleStatusChange    
        );  
    }  

    handleStatusChange(status) {    
        this.setState({      
            isOnline: status.isOnline    
        });  
    }

    render() {
        if (this.state.isOnline === null) {
            return 'Загрузка...';
        }
        return this.state.isOnline ? 'В сети' : 'Не в сети';
    }
}
```

### Пример с использованием хуков 

Если ваш эффект возвращает функцию, React выполнит её только тогда, когда наступит время сбросить эффект.  React будет сбрасывать эффект перед тем, как компонент размонтируется.

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {   
        function handleStatusChange(status) {      
            setIsOnline(status.isOnline);    
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // Указываем, как сбросить этот эффект:    
        return () => {      
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);    
        };  
    });

    if (isOnline === null) {
        return 'Загрузка...';
    }

    return isOnline ? 'В сети' : 'Не в сети';
}
```

## Совет: используйте разные хуки для разных задач

```js
function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    useEffect(() => { document.title = `Вы нажали ${count} раз`; });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => { 
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
  // ...
```

## Совет: оптимизация производительности за счёт пропуска эффектов 

Можно сделать так, чтобы React пропускал вызов эффекта, если определённые значения остались без изменений между последующими рендерами. Нужно передать массив в `useEffect` вторым необязательным аргументом.

```js
useEffect(() => {
  document.title = `Вы нажали ${count} раз`;
}, [count]); // Перезапускать эффект только если count поменялся
```
Это также работает для эффектов с этапом сброса:

```js
useEffect(() => {
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
}, [props.friend.id]); // Повторно подписаться, только если props.friend.id изменился
```

Если надо запустить эффект и сбросить его только один раз (при монтировании и размонтировании), можно передать пустой массив ([]) вторым аргументом. React посчитает, что эффект не зависит от каких-либо значений из пропсов или состояния и поэтому не будет выполнять повторных запусков эффекта.
