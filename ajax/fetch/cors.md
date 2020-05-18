# CORS

## Простые

1. Метод: GET, POST или HEAD.
2. Заголовки:
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

Для простых запросов:

- → Браузер отправляет Origin заголовок
- ← Для запросов без учетных данных сервер должен установить: `Access-Control-Allow-Origin` * или Origin
- ← Для запросов с учетными данными сервер должен установить: 
    - `Access-Control-Allow-Origin` в то же значение, что и Origin
    - `Access-Control-Allow-Credentials` true

Чтобы получить доступ к непростым заголовкам ответа сервер должен перечислить разрешенные в `Access-Control-Expose-Headers`:

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma
