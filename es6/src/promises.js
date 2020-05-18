function applyForVisa(document) {

    console.log('обработка документов...');

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > .5 ? resolve({}) : reject('в визе отказано: нехватило документов');
        }, 2000);
    });
    return promise;
}

function getVisa(visa) {
    console.info('виза получена');
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(visa), 2000);
    });
}

function bookHotel(visa) {
    console.log('виза', visa);
    console.log('бронируем отель');
    return Promise.reject('нет мест');
}

function buyTickets(booking) {
    console.log('бронь', booking);
    console.log('покупаем билеты');
}

applyForVisa({})
    .then(getVisa)
    .then(bookHotel)
    .then(buyTickets)
    .catch(error => console.error(error));
