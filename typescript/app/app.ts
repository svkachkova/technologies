var el = this.document.querySelector("#content");
 
class User{
    name : string;
    age : number;
    constructor(_name:string, _age: number){

        this.name = _name;
        this.age = _age;
    }
}

var sarah : User = new User("Sarah", 20);
el.innerHTML="Имя: " + sarah.name + " возраст: " + sarah.age;