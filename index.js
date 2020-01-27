"use strict";
exports.__esModule = true;
var name = "Sherlock Holmes", age = 29, job = "private detective";
var sayHi = function (name, age, job) {
    /*
    job? --> job은 optional args
    sayHi(name, age) is OK
    sayHi(name, age, job) is OK
    
    if it's not optional
    sayHi(name, age) --> ERROR
    sayHi(name, age, job) is OK
    
    args :type
    */
    console.log("hello " + name + ", " + job + ". you are " + age + " years old.");
};
sayHi(name, age);
sayHi(name, age, job);
var person = {
    name: "John Watson",
    age: 34,
    job: "doctor"
};
var sayHello = function (person) {
    return "Hello " + person.job + ", " + person.name + ". you are " + person.age + " years old.";
};
console.log(sayHello(person));
var Human = /** @class */ (function () {
    // constructor : class가 호출될 때마다 실행되는 method
    function Human(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
    return Human;
}());
var human = new Human("Benedict", 40, "actor");
console.log(sayHello(human));
