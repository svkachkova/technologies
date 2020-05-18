// ---------------------
// -----типы данных-----
// ---------------------

let isBollean: boolean = true;
let hex: number = 0xf00d;
let numberUndefined: number = undefined;
let string: string = 'Tom';

let varNull: null = null;
let varUndefined: undefined = undefined;

let arrayOfNumber: number[] = [10, 20, 30];
let tupleStrNum: [string, number] = ['Tom', 28]; // кортеж

enum Color { //перечисления
    Red = 1,
    Green,
    Blue,
}
let colorEnum: Color = Color.Green;
let colorNameEnum: string = Color[2];

let varAny: any = 4;
varAny = 'maybe a string instead';

// --------------------------------
// -----работа с типами данных-----
// --------------------------------

// объединение
let idNumOrStr: number | string = 234;
idNumOrStr = '154gfg8';

// проверка типа - typeof

// псевдонимы типов
type stringOrNumberType = string | number;
let varStrOrNum: stringOrNumberType = 'hi';

// Type assertions - приведение типов
let someValue1: any = 'this is a string';
let strLength1: number = (<string>someValue1).length;

let someValue2: any = 'this is a string';
let strLength2: number = (someValue2 as string).length;

// -----------------
// -----функции-----
// -----------------

function funcAdd1(x: number, y: number): number {
    return x + y;
}

let funcAdd2 = (x: number, y: number): number => x + y;

// void - отсутствие типа
function funcVoid(): void {
    console.log('void');
}

// never - для ошибок
function error(message: string): never {
    throw new Error(message);
}

// необязательные параметры
function funcOptionalParametr(a: string, b?: string): void {
    console.log(a + b);
}
funcOptionalParametr('hi');

// неопределенный набор аргументов
function funcSpread(...numberArray: number[]): number {
    return numberArray.reduce((curr, prev) => curr + prev);
}
funcSpread(1, 2, 3);

// "перегрузка" функции
function funcOverload(x: string, y: string): string;
function funcOverload(x: number, y: number): number;
function funcOverload(x: any, y: any): any {
    return x + y;
}

// тип функции
let typeFunc: (x: number, y: number) => number;

// функции обратного вызова
function funcCallback(a: number, callback: (b: number) => void): void {
    callback(a);
}
