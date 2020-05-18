// подключение модуля fs
const fs = require('fs');
 
// получение информации о файле
fs.stat('/Users/flavio/test.txt', (err, stats) => {
	if (err) {
		console.error(err);
		return;
	}
	stats.isFile();           //true
	stats.isDirectory();      //false
	stats.isSymbolicLink();   //false
	stats.size;               //1024000 // = 1MB
});
 
// чтение файла
fs.readFile('/Users/flavio/test.txt', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(data);
});
 
// запись в файл
const content = 'Some content!';
fs.writeFile('/Users/flavio/test.txt', content, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	// запись произведена успешно
});

// следить за изменениями в файле
fs.watchFile('/Users/flavio/test.txt', (file) => {
	// что-то чделать
});

// модуль path для оперирования путями к файлам и папкам
const path = require('path');
 
require('path').basename('/test/something.txt');        // something.txt
require('path').dirname('/test/something/file.txt');    // /test/something
require('path').extname('/test/something/file.txt');    // '.txt'
