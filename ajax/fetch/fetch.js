let response = await fetch(url);

// if HTTP-status is 200-299
if (response.ok) { 
	// get the response body (see below)
	let json = await response.json();
} else {
	alert("HTTP-Error: " + response.status);
}

// --------------------------------
let response = await fetch('https://...');

// read response body and parse as JSON
let commits = await response.json(); 

alert(commits[0].author.login);

// --------------------------------
fetch('https://...')
	.then(response => response.json())
	.then(commits => alert(commits[0].author.login));

// --------------------------------
let user = {
	name: 'John',
	surname: 'Smith'
};
	
let response = await fetch('/article/fetch/post/user', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(user)
});
	
let result = await response.json();
alert(result.message);

// --------------------------------
// Создайте асинхронную функцию getUsers(names), которая получает массив логинов GitHub, 
// выбирает пользователей из GitHub и возвращает массив пользователей GitHub.

async function getUsers(names) {
	let jobs = [];

	for(let name of names) {
		let job = fetch(`https://api.github.com/users/${name}`).then(
			successResponse => {
				if (successResponse.status != 200) {
					return null;
				} else {
					return successResponse.json();
				}
			},
			failResponse => {
				return null;
			}
		);
		jobs.push(job);
	}

	let results = await Promise.all(jobs);
	return results;
}

// --------------------------------
fetch('products.json')
	.then(response => response.json())
	.then((json) => {
		products = json;
		initialize();
	})
	.catch((err) => {
		console.log('Fetch problem: ' + err.message);
	});

// --------------------------------
fetch('http://example.com/movies.json')
	.then(response => response.json())
	.then(myJson => console.log(JSON.stringify(myJson)));

// --------------------------------
// Установка параметров запроса
// Пример отправки POST запроса:

postData('http://example.com/answer', {answer: 42})
	.then(data => console.log(JSON.stringify(data))) // JSON-строка полученная после вызова `response.json()`
	.catch(error => console.error(error));

function postData(url = '', data = {}) {

	// Значения по умолчанию обозначены знаком *
	return fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
		signal: undefined, // AbortController прервать запрос
		body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
	})
	.then(response => response.json()); // парсит JSON ответ в Javascript объект
}

// --------------------------------
// Отправка данных в формате JSON

const url = 'https://example.com/profile';
const data = {username: 'example'};
const options = {
	method: 'POST', // или 'PUT'
	body: JSON.stringify(data), // data может быть типа `string` или {object}!
	headers:{
		'Content-Type': 'application/json'
	}
};

fetch(url, options)
	.then(res => res.json())
	.then(response => console.log('Успех:', JSON.stringify(response)))
	.catch(error => console.error('Ошибка:', error));

// --------------------------------
// Проверка успешности запроса

fetch('flowers.jpg')
	.then((response) => {
		if(response.ok) {
			return response.blob();
		}
		throw new Error('Network response was not ok.');
	})
	.then((myBlob) => { 
		const objectURL = URL.createObjectURL(myBlob); 
		myImage.src = objectURL; 
	})
	.catch((error) => {
		console.log('There has been a problem with your fetch operation: ' + error.message);
	});

// --------------------------------
// Составление своего объекта запроса

const myHeaders = new Headers();
const myInit = { 
	method: 'GET',
	headers: myHeaders,
	mode: 'cors',
	cache: 'default' 
};
const myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest)
	.then(response => response.blob())
	.then((myBlob) => {
		const objectURL = URL.createObjectURL(myBlob);
		myImage.src = objectURL;
	});
