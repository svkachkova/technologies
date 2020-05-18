// --------------------------
// ----пространство имен-----
// --------------------------
namespace Personnel {
    export interface IUser {
        getInfo(): string;
    }

    export class Employee {
        constructor(public name: string) {}
    }

    export function work(emp: Employee): void {
        console.log(`${emp.name} is working`);
    }

    export let dafaultUser = { name: 'Alex' };
}

let mark = new Personnel.Employee('Mark');
Personnel.work(mark);

console.log(Personnel.dafaultUser.name);

// в отдельном файле
/// <reference path="Shapes.ts" />

// псевдонимы
import polygon = Shapes.Polygon;
import polyhedra = Shapes.Polyhedra;

let shape1 = new polygon.Triangle();
let shape2 = new polyhedra.Cones();

// ---------------------
// -------модули--------
// ---------------------
import {Phone, Call as makeCall} from './devices';

let phone: Phone = new Phone('iPhone X');
makeCall(phone);

// импортировать весь модуль
// import * as dev from './devices';

// let phone: dev.Phone = new dev.Phone('iPhone X');
// dev.Call(phone);

// экспорт по умолчанию
import SmartWatch from './smartWatch';

let smartWatch: SmartWatch = new SmartWatch();
