// простой веб-сервер в качестве традиционного helloworld-приложения

// подключение модуля http
const http = require('http');

// адрес хоста и порта для прослушивания
const hostname = '127.0.0.1';
const port = 3000;

// создание сервера
const server = http.createServer((req, res) => {
    res.statusCode = 200;                           // установка кода статуса
    res.setHeader('Content-Type', 'text/plain');    // установка заголовка
    res.end('Hello World\n');                       // отправка ответа
});

// настройка прослушивания порта
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// вызвать файл node helloWorld.js
// запустить в браузере http://127.0.0.1:3000