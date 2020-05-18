# Установка и обновление пакетов

- установка всех пакетов, перечисленных в файле package.json
`npm install`
- установка конкретного пакета
`npm install <package-name>@version`

## Опции:

-  `--save` – сохранение пакета в разделе dependencies в package.json пакет необходим для полноценной работы готового приложения
- `--save-dev` – сохранение в разделе devDependencies пакет необходим для зазработки
- `-g` – глобальная установка (`npm root -g` - куда)

# package.json

- `name` – название приложения/пакета и имя папки, в которой он хранится
- `license` – тип лицензии
- `author` – автор (name, email, url)
- `contributors` – другие участники разработки
- `version` – текущая версия
- `description` – краткое описание
- `keywords` – ключевые слова
- `homepage` – веб-страница проекта
- `repository` – репозиторий
- `main` – точка входа
- `private` – со значением true не позволяет случайную публикацию в npm
- `scripts` – набор команд с псевдонимами, которые можно запустить из терминала как npm run [taskName]
- `dependencies` – список зависимостей проекта
- `devDependencies` – список зависимостей для разработки
- `engines` – версия Node
- `browserlist` – поддерживаемые браузеры (или их версии)
- `bugs` – ссылка на баг-трекер специфические свойства, например, eslintConfig, babel и другие с настройками различных инструментов

# Импорт и экспорт

## Импорт

```js
const library = require('./library');
```

## Экспорт

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta',
};
module.exports = car;
```

# Ввод и вывод данных

## Вывод переменных

```js
console.log(x, y) 
```

### Методы `console`:

- `clear` – очищение
- `count` – подсчет элементов
- `trace` –  получение стека вызовов
- `time` и `timeEnd` – подсчет времени
- `error` – вывод в поток stderr

## Ввод

Подключение и настройка модуля

```js
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
```
 
Вывод вопроса и коллбэк

```js
readline.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`);
  readline.close();
});
```

# Потоки

```js
const http = require('http');
const fs = require('fs');
```

## Без потоков

```js
const server = http.createServer((req, res) => {
  fs.readFile(__dirname + '/data.txt', (err, data) => {
    res.end(data);
  });
});
```
 
## С потоками

```js
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt');
  stream.pipe(res);
});
 
server.listen(3000);
```