// Class
// Constructor - function that returns object.

// whatever arg pass to mammal will be the value of the property.
class Mammal {
    constructor(hairType, eyeCount) {
        this.hair = hairType;
        this.eyes = eyeCount;
        this.feedsBabies = true;
        this.breathes = 'air';
    } //constructor ends

makeSound(sound) {
    // console.log('this', this);
    return sound;
    }

}//Mammal ends
//add methods(after constructor, before Mammal)

const myMammal = new Mammal('cool', 3);

console.log(myMammal.makeSound('yay'));
//invoke the function

//Dog is 'subclass' of mammal, mammal is 'superclass'
//'Dog' doesn't have 'this' so needs 'super'
//1.super - creates 'this'
//2.calls the constructor function of the superclass(mammal)
class Dog extends Mammal{
    constructor(hair,eyes,breedType) {
        super(hair, eyes);
        this.breed = breedType;
        this.fetches = true;
        this.puppyEyes = 'cute';
    }
    makeSound() {
        return 'bark bark bark bark';
    }

}

const myDog = new Dog('fluffy', 4, 'mutt');
console.log(myDog.makeSound('meow'));

// add arg to new Dog, add arg to constructor(Mammal)
// any arg pass to super() will pass to its parent.
// constructor will pass arg to DOG(sub-class)
// makeSound of Dog > makeSound of Mammal
//
// ------
// Transpiler
// babel
//
// ./ look in current directory
// everything (*)
// export let counter = 0;
// export {counter, increment};
