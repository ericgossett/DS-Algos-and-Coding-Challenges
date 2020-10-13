/*
    A spin on the classic mixin. Rather than have to call an extend function 
    to apply a mixin why don't we make our mixin a function instead.
*/

var Receiver = function(){
    this.prop1 = 'prop1';
    this.prop2 = 'prop2';
}

var Mixin = function () {
    this.mixinFunc1 = function() {
        console.log('func1');
    },
    this.mixinFunc2 = function() {
        console.log('func2');
    }
    return this;
}

var orig = new Receiver();
console.log('original prototype: ')
console.log(Object.getPrototypeOf(orig));

// Normal way using call
// Mixin.call(Receiver.prototype);

/*
However it's somewhat nicer to not expose call and 
extend Object to have an addMixin function

Note: this block of code is bested placed on top
*/
if (typeof Object.prototype.addMixin !== 'function') {
    Object.prototype.addMixin = function(mixin) {
        mixin.call(this.prototype);
    }
}

Receiver.addMixin(Mixin);

var receiver = new Receiver();
console.log('prototype after applying mixin:');
console.log(Object.getPrototypeOf(receiver));