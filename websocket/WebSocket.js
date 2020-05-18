const socket = new WebSocket('wss://javascript.info');

// События

// соединение установлено
socket.addEventListener('open', () => {
    socket.send();  // отправить данные на сервер
});

// получены данные
socket.addEventListener('message', event => {
    console.log(event.message); // данные получены с сервера
});

// ошибка
socket.addEventListener('error', error => {
    console.error(error.message)
});

// соединение закрыто
socket.addEventListener('close', event => {
    // event.code
    // event.reason
    // event.wasClean
});

// Пример

const webSocket = new WebSocket('wss://example.com/server');

const form = document.querySelector('.form');

form.addEventListener('submit', () => {
    webSocket.send(this.message.value);
    return false;
});

webSocket.addEventListener('message', event => {
    const messageElem = document.createElement('div');
    messageElem.innerHTML = event.data;
    document.body.appendChild(messageElem);
});
