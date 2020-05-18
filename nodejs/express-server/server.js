const express = require('express');
const path = require('path');

const app = express();

let counter = 0;

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

// Функция промежуточной обработки (middlware)

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });

app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/hello', (req, res) => res.json({ message: 'hello' }));
app.get('/bye', (req, res) => res.json({ message: 'bye' }));

app.get('/counter', (req, res) => {
    counter += 1;
    res.render('counter', { counter });
});

app.post('/counter', (req, res) => {
    counter = req.body.value;
    res.render('counter', { counter });
});

app.get('/time', (req, res) => 
    res.render('time', {
        time: new Date().toLocaleTimeString()
    })
);

app.get('/time-json', (req, res) => {
    res.json({ time: new Date().toLocaleTimeString() });
})

app.listen(3000);
