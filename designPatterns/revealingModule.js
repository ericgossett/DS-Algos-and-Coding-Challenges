/*
    The revealing Module pattern is a slightly improved version of the 
    Module pattern. It is more of a shorthand that saves repeating 
    the name of the main object when calling public methods from another, 
    and prevents switching to object literal notation for things one would 
    make public

    The idea is to define all variables and methods (both private and 
    public) in the private scope and return an anonymous object with 
    pointers to what you wish to make public

    Advantages:
        - cleaner syntax
    
    Disadvantages:
        - If a private function refers to a public function, the public 
          function cannot be overridden at a later time.
        - Therefore, can be more fragile than the Module pattern.

*/
var revealingModule = (function(){
    // Private var/func
    var privateVariable = 'private';
    function privateFunc (message) {
        console.log(message);
    }

    // Public var/func
    var publicVariable = 'public';
    function publicFunction(message) {
        privateFunc(message);
    }

    return {
        var: publicVariable,
        setMessage: publicFunction
    };
})();