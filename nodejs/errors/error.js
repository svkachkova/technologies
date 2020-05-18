// Наследование от Error

var util = require('util');

var phrases = {
	"Hello": "Привет",
	"world": "мир"
};

// message name stack
// класс ошибки "неверная фраза"
function PhraseError(message) {
	this.message = message;
	Error.captureStackTrace(this, PhraseError);   // наследуем стек
}

util.inherits(PhraseError, Error);  // наследуем PhraseError от Error
PhraseError.prototype.name = 'PhraseError';

// класс ошибки "неверный url"
function HttpError(status, message) {
	this.status = status;
	this.message = message;
	Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
  
// получить фразу
function getPhrase(name) {
	if (!phrases[name]) {
		throw new PhraseError("Нет такой фразы: " + name);  // HTTP 500, уведомление!
	}
	return phrases[name];
}

// создать страницу
function makePage(url) {

	if (url != 'index.html') {
		throw new HttpError(404, "Нет такой страницы");  // HTTP 404
	}

	return util.format("%s, %s!", getPhrase("Hello"), getPhrase("world"));
}

try {
	var page = makePage('index.html');
	console.log(page);
} catch (e) {
	if (e instanceof HttpError) {
	  	console.log(e.status, e.message);
	} else {
	  	console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack);
	}
}
