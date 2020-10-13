/*
    Mixins are a way to allow objects to borrow functionality. They are objects 
    with method and attributes that may be shared elsewhere.  They are grouped 
    together by type (e.g. button, chart, npc etc) and then borrowed by 
    concert classes without the need to form a relationship.
*/

var Receiver = function(){
    this.prop1 = 'prop1';
    this.prop2 = 'prop2';
}

var Mixin = {
    mixinFunc1: function(){
        console.log('func1');
    },
    mixinFunc2: function(){
        console.log('func2');
    }
}

function extend(receiver, mixin) {
    for (var func in mixin) {
        if (!Object.hasOwnProperty.call(receiver, func)) {
            receiver.prototype[func] = mixin[func];
        }
    }
    return receiver;
}

var orig = new Receiver();
console.log('original prototype: ')
console.log(Object.getPrototypeOf(orig));

extend(Receiver, Mixin);
var receiver = new Receiver();
console.log('prototype after applying mixin:');
console.log(Object.getPrototypeOf(receiver));
