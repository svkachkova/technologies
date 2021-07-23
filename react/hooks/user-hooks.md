# Building Your Own Hooks

Создание пользовательских хуков позволяет вам перенести логику компонентов в функции, которые можно повторно использовать.

## Извлечение логики в пользовательский хук 

Когда мы хотим, чтобы две JavaScript-функции разделяли какую-то логику, мы извлекаем её в третью функцию. И компоненты и хуки являются функциями, поэтому с ними это тоже работает!

Пользовательский хук — это JavaScript-функция, имя которой начинается с «use» (useFriendStatus), и которая может вызывать другие хуки.

```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {  
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });

    return isOnline;
}
```

Цель нашего хука `useFriendStatus` — подписать нас на статус друга. Поэтому он принимает в качестве аргумента `friendID` и возвращает статус друга в сети.

## Использование пользовательского хука 

Нашей целью было удалить дублированную логику из компонентов `FriendStatus` и `FriendListItem`. Они оба хотят знать, есть ли друг в сети.

```jsx
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);

    if (isOnline === null) {
        return 'Загрузка...';
    }
    return isOnline ? 'В сети' : 'Не в сети';
}

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}
```

## Совет: Передача информации между хуками 

Поскольку вызов хука `useState` даёт нам последнее значение переменной состояния `recipientID`, мы можем передать его в наш пользовательский хук `useFriendStatus` в качестве аргумента.

Это позволяет нам узнать, находится ли выбранный друг в сети. Если мы выберем другого друга и обновим переменную состояния `recipientID`, наш хук `useFriendStatus` отменит подписку на ранее выбранного друга и подпишется на статус вновь выбранного.

```jsx
const friendList = [
    { id: 1, name: 'Татьяна' },
    { id: 2, name: 'Алла' },
    { id: 3, name: 'Лиля' },
];

function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);  
    const isRecipientOnline = useFriendStatus(recipientID);

    return (
        <>
            <Circle color={isRecipientOnline ? 'green' : 'red'} />
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}
            >
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    );
}
```
