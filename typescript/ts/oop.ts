// ---------------------
// -------классы--------
// ---------------------

// нельзя создать объект класса
abstract class Person {
    // при наследовании производные классы обязаны реализовать абстрактные методы
    abstract getInfo(): string;
}

class User extends Person {
    static PI: number = 3.14; // используется без создания экзэмпляра класса

    private readonly _id: number; // только для чтения
    protected _name: string;
    private _age: number;

    constructor(userId: number, userName: string) {
        super(); // конструктор родительского класса
        this._id = userId;
        this._name = userName;
    }

    // аналогично предыдущему конструктору и объявлению свойств
    // constructor(private _id : number, private _name : string) {}

    // возвращает значение
    public get age(): number {
        return this._age;
    }

    // устанавливает значение
    public set age(userAge: number) {
        this._age = userAge;
    }

    getInfo(): string {
        return `id: ${this._id} name: ${this._name}`;
    }
}

class Employee extends User {
    private _company: string;
    public isEmployee: boolean = true;

    constructor(userId: number, userName: string, employeeCompany: string) {
        super(userId, userName);
        this._company = employeeCompany;
    }

    getInfo(): string {
        return `${super.getInfo()} company: ${this._company}`;
    }
}

console.log(User.PI); // статические свойства

let tom: User = new User(1, 'Tom');

tom.age = 24; // работа геттера и сеттера
console.log(tom.age);

console.log(tom.getInfo());

let alice: User = new Employee(2, 'Alice', 'Misrosoft');
console.log(alice.getInfo());

alice = new User(3, 'Alice');
console.log(alice.getInfo());

// ------------------------
// -------интерфейс--------
// ------------------------
interface IUser {
    readonly id: number;
    readonly name: string;

    age?: number; // необязательное свойство

    geeting?(): void;
}

function buildUser(userId: number, userName: string): IUser {
    return { id: userId, name: userName };
}

let employee: IUser = {
    id: 1,
    name: 'Bob',
    age: 22,

    geeting: (): void => console.log(`Hi ${this.name}`),
};

let newUser: IUser = buildUser(2, 'Mike');

// интерфейсы функций
interface FullNameBuilder {
    (objName: string, objSurname: string): string;
}

let builder: FullNameBuilder = (name: string, surname: string): string => {
    return `${name} ${surname}`;
};

let fullName: string = builder('Bob', 'Simpson');

// интерфейсы массивов
interface StringArray {
    [index: number]: string;
}

let list: StringArray = ['a', 'b', 'c'];

interface Dictionary {
    [index: string]: string;
}

let colors: Dictionary = {};
colors['red'] = '#ff0000';
colors['green'] = '#00ff00';
colors['blue'] = '#0000ff';

// гибридные интерфейсы
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function(start: number) {};
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// ----------------------------
// -----интерфейсы классов-----
// ----------------------------
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {}

    setTime(d: Date) {
        this.currentTime = d;
    }
}

let date1: ClockInterface = new Clock(13, 28);
let data2: Clock = new Clock(13, 29);

// наследование интерфейсов
interface Shape {
    color: string;
}

interface Pen {
    penWidth: number;
}

interface Square extends Shape, Pen {
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;

// --------------------------
// ---преобразование типов---
// --------------------------
let ann: User = new Employee(6, 'Ann', 'Microsoft');

let annEmployee: Employee = <Employee>ann; // преобразование к типу Employee
// let annEmployee: Employee = ann as Employee;

console.log(annEmployee.isEmployee);

// оператор instanceOf
// проверяет принадлежит ли объект определенному классу

// выражения типа <T>
// переменная/... типизирована определенным типом T
function identity<T>(arg: T): T {
    return arg;
}

let numberId: number = identity<number>(123);
let stringId: string = identity<string>('hello');

// для массивов
function getString<T>(arg: Array<T>): string {
    let result: string = '';
    arg.forEach(item => (result += item.toString()));
    return result;
}
let arrayToString: string = getString<number>([1, 2, 3]);

// oбобщенные классы и интерфейсы
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

interface IGeneticNumber<T> {
    add(): T;
}

// ограничения обобщений
class UserInfo<T extends Person> {
    getUserInfo(user: T): string {
        return user.getInfo();
    }
}
// T - только User и Employee
let userStore = new UserInfo();

userStore.getUserInfo(tom);
userStore.getUserInfo(alice);

// другой пример
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, 'a');
// getProperty(x, 'n'); // error

// ----------------------
// -------миксины--------
// ----------------------
class Animal {
    feed(): void {
        console.log(`кормим животное`);
    }
}
class MyTransport {
    speed: number = 0;
    move(): void {
        if (this.speed) {
            console.log(`перемещаемся со скоростью ${this.speed}`);
        }
    }
}
// множественное наследование
class Horse implements Animal, MyTransport {
    speed: number = 0;
    feed: () => void;
    move: () => void;
}
// функция для реализации множественного наследования
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(Horse, [Animal, MyTransport]);

let pony: Horse = new Horse();
pony.feed();
pony.speed = 10;
pony.move();
