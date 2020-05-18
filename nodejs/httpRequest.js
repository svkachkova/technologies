// GET-запрос
const https = require('https');

const options = {
	hostname: 'flaviocopes.com',
	port: 443,
	path: '/todos',
	method: 'GET',
};

const req = https.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`);
	res.on('data', d => process.stdout.write(d));
})

req.on('error', error => console.error(error));
req.end();

// POST-запрос
const data = JSON.stringify({
	todo: 'Buy the milk',
});

const options = {
	hostname: 'flaviocopes.com',
	port: 443,
	path: '/todos',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length,
	},
};

const req = https.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`);
	res.on('data', d => process.stdout.write(d));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();

// веб-сокеты - альтернатива http
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
	ws.on('message', message => {
		console.log(`Received message => ${message}`);
	});
	ws.send('ho!');
});
