// module.exports = exports = this;

// Чтобы использовать require('db') вместо require('./db')
// нужно в консоли вызвать команду "set NODE_PATH=." 

let log = require('logger')(module);
let db = require('db');
db.connect();

let User = require('./user');

function run() {
    let vasya = new User('Вася');
    let petya = new User('Петя');

    vasya.hello(petya);

    log( db.getPhrases("Run successful") );
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}
