// -------- Habr -------------

// Функция getJSON, возвращает промис, при успхе которой возвращается JSON-объект.
// Мы хотим вызвать getJSON, вывести в лог JSON-объект и вернуть done.

const makeRequest = async () => {
	// Запись await getJSON() означает, 
	// что вызов console.log будет ожидать разрешения промиса getJSON(),
	// после чего выведет то, что возвратит функция.
	console.log(await getJSON());
	return 'done';
};
  
makeRequest();

// обработка ошибок
const makeRequest = async () => {
	try {
		// парсинг JSON может вызвать ошибку
		const data = JSON.parse(await getJSON());
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

// проверка условий и выполнение асинхронных действий
const makeRequest = async () => {
	const data = await getJSON();

	if (data.needsAnotherRequest) {
		const moreData = await makeAnotherRequest(data);
		console.log(moreData);
		return moreData;
	} else {
		console.log(data);
		return data;    
	}
};

// промежуточные значения
const makeRequest = async () => {
	const value1 = await promise1();
	const value2 = await promise2(value1);
	return promise3(value1, value2);
};

// -------- MDN -------------

function resolveAfter2Seconds(x) {
	return new Promise(resolve => {
		setTimeout(() => {
		resolve(x);
		}, 2000);
	});
}

async function add1(x) {
	const a = await resolveAfter2Seconds(20);
	const b = await resolveAfter2Seconds(30);
	return x + a + b;
}

add1(10).then(v => {
	// prints 60 after 4 seconds.
	console.log(v);  
});

async function add2(x) {
	const a = resolveAfter2Seconds(20);
	const b = resolveAfter2Seconds(30);
	return x + await a + await b;
}

add2(10).then(v => {
	// prints 60 after 2 seconds.
	console.log(v);  
});

// -------- Medium -------------

async function fn() {
  	return 'hello';
}

fn().then(console.log); // hello

// функция fetchPublicReposCount(username) 
// возвращает количество открытых репозиториев на GitHub

const url = 'https://api.github.com/users';

// Получает количество открытых репозиториев
const fetchPublicReposCount = async (username) => {
	const response = await fetch(`${url}/${username}`);
	const json = await response.json();
	return json['public_repos'];
};

const users = [
	'ArfatSalman',
	'octocat',
	'norvig'
];

// counts будет массивом промисов
const counts = users.map(async username => {
	const count = await fetchPublicReposCount(username);
	return count;
});
