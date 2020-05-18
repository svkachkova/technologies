let db = require('db');
let log = require('logger')(module);

class User {
    constructor(name) {
        this.name = name;
    }
    hello(who) {
        log(`${ db.getPhrases("Hello") }, ${who.name}`);    
    }
}

module.exports = User;
