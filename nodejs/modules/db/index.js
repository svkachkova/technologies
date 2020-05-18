let phrases;

exports.connect = function() {
    phrases = require('./ru')
};

exports.getPhrases = function(name) {
    if (!phrases[name]) {
        throw new Error(`Нет такой фразы: ${name}`);
    }
    return phrases[name];
};
