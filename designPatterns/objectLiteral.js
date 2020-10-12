/*
    Modules help keep units of code separated and organized.

    One way to accomplish this is known as an object literal. The 
    idea is that we declare our module as an object bound to some
    variable.

    It provides some encapsulation, however it does not provide 
    private encapsulation.

    Use cases:
        - to prevent polluting the global namespace
        - When you have a set of methods you would like to 
          reuse
        - When you do not require private methods
*/

var objectLiteral= {
    prop: "example-property",
    getter: function() {
        return this.prop;
    },
    setter: function(prop) {
        this.prop = prop;
    },
    foo: function(){
        console.log('some other function');
    }
};

objectLiteral.setter('new-prop');
console.log(objectLiteral.getter());