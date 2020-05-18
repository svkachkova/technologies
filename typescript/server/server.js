const http = require("http");
const fs = require("fs");
  
http.createServer((request, response) => {
     
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    // установка пути по умолчанию
    if (filePath == '') filePath ='index.html';
    fs.readFile(filePath, (error, data) => {
                  
        if (error) {  // если файл не найден
            response.statusCode = 404;
            response.end('Not Found');
        } else {
            response.end(data);
        }
        return;
    })
}).listen(3000, () => {
    console.log('Сервер запущен по адресу http://localhost:3000/');
});