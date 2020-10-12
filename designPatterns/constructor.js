/*
  In OOP a constructor is a method that is used to initialize an object from a
  class. However, because JavaScript is class-less we must declare a special 
  type of constructor. In JavaScript almost everything is an object so we want
  to create object constructors.   

  NOTE:
    In es6 syntax sugar for classes exist, which includes a constructor method
*/

// Basic constructor

function Dog (name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;

    this.bark = function () {
        return this.name + ' says, "Woof Woof!"';
    }
}

/*
    Shortcommings:
        - The function bark will be redefined for each new object created
          which makes inheritance diffcult.
    
    Solution:
        - Use the objects prototype object. This will allow all child 
          objects to have access to the same function.
*/

// Constructor with Prototypes

function Dog (name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
}

Dog.prototype.bark = function () {
    return this.name + ' says, "Woof Woof!"';
}


// Useage
var ollie = new Dog('Ollie', 'pitbull', 4);

console.log(ollie.bark());