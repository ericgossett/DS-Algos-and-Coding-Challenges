/*
    The Singleton pattern is used to restrict instantiation of a class 
    to a single object throughout the entire codebase. 

    Idea: create a class with a method that creates a new instance of the 
    class if one doesn't exist. If the instance exist, it will return a 
    reference to that object. 

    Advantages:
        - Allows us to have a single instance of a resource which we can 
          manage throughout the codebase.
    
    Disadvantages:
        - Are a global instance, so they hide dependencies of your application 
          instead of exposing them though interfaces.
        - Violate single responsibility principle, because they control their 
          own life cycle.
        - Cause code to be tightly coupled (hard to mock in a test)
        - Carry state around for the entire lifetime of the application. (
          also an issue when testing because test would need to be ordered, 
          which is a big no-no because unit test should be independent 
          of each other)

*/
var Singleton = (function(){
    var instance;
    function init() {
        /*
         Here is where all the var/func of the singleton go. It is very similar 
         to a module in its structure.
        */
        var privateVariable = 'private';
        function privateFunc(message) {
            console.log(message);
        }

        return {
            publicVariable: 'public',
            publicFunc: function(message) {
                privateFunc(message);
            }
        };
    }

    // Main part of singleton. Test if instance exist if not create one else 
    // return reference to the instance.
    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

var singleton = Singleton.getInstance();
singleton.publicFunc('this is a singleton');