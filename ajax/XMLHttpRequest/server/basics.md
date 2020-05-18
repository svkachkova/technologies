```js
var http = require('http');
var url = require('url');
var querystring = require('querystring');

function accept(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache'
  });

  res.end("OK");
}

http.createServer(accept).listen(8080);
```

В функции `accept` используются два объекта:

  - `req` – объект запроса (request), то, что прислал клиент (браузер), из него читаем данные
  - `res` – объект ответа (response), в него пишем данные в ответ клиенту

  - вызов `res.writeHead(HTTP-код, [строка статуса], {заголовки})` - пишет заголовки
  - вызов `res.write(txt)` - пишет текст в ответ
  - вызов `res.end(txt)` – завершает запрос ответом
