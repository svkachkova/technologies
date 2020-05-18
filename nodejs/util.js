const util = require('util');
const fs = require('fs');

// проверка на равенство двух объектов
util.isDeepStrictEqual(
    { a: { b: 'c' } },
    { a: { b: 'c' } }
);

// превращаем коллбэк в Promise
const stat = util.promisify(fs.stat);

fs.stat('.', (err, stats) => {
    console.log('Stat with callback', stats);
});

stat('.')
    .then((stats) => console.log('Stat with promise', stats));
