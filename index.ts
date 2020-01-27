const name = "Sherlock Holmes"
, age = 29
, job = "private detective";

const sayHi = (name :string, age :number, job? :string) :void => {
    /* 
    job? --> job은 optional args
    sayHi(name, age) is OK
    sayHi(name, age, job) is OK
    
    if it's not optional
    sayHi(name, age) --> ERROR
    sayHi(name, age, job) is OK
    
    args :type
    */
   console.log(`hello ${name}, ${job}. you are ${age} years old.`)
}

sayHi(name, age);
sayHi(name, age, job);

// object를 typescript의 args로 주고 싶을때 (only works in TS not JS)
// similar to CLASS
interface Person {
    name :string
    , age :number
    , job :string
}

const person = {
    name: "John Watson"
    , age: 34
    , job: "doctor"
}

const sayHello = (person :Person) :string => {
    return `Hello ${person.job}, ${person.name}. you are ${person.age} years old.`
}

console.log(sayHello(person));

class Human {
    public name :string;
    public age :number;
    public job :string;

    // constructor : class가 호출될 때마다 실행되는 method
    constructor(name :string, age: number, job :string){
        this.name = name;
        this.age = age;
        this.job = job;
    }
}

const human = new Human("Benedict", 40, "actor");

console.log(sayHello(human));

export {}; // error? don't know why have to declare this