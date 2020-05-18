function* range(start, end) {
    let current = start;
    while (current <= end) {
        yield current++;
    }
}

for (let num of range(1, 5)) {
    console.log(num);
}

// можно делать методом объекта
let numbers = {
    *range(start, end) {
        while (start <= end) yield start++
    }
};

console.log('*******');

for (let num of numbers.range(6, 10)) {
    console.log(num);
}
