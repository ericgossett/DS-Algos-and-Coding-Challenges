/*
    The Module pattern allows use to further emulate the concepts of 
    public/private methods and variables.

    It encapsulates privacy, state and organization through the use of 
    closures. 

    In JavaScript no true privacy exist, however Within the Module 
    pattern we are able to expose the methods we want. This is 
    because variables and methods declared in the module are only 
    accessible within the module, while the methods defined within 
    the returning object are available to everyone. 

    So the idea is that the returning object describes the public 
    interface.

    Advantages:
        - Brings classical OOP encapsulation to JavaScript.
        - We get private data!

    Disadvantages:
        - If we wish to later change visibility, we will have to 
          make changes were each member is used.
        - Cannot access private members in methods that are added 
          later (if extending module outside its definition).
        - Difficult to unit test private members. 
*/

var module = (function(){
    // Private var/func
    var privateVariable = 'private';
    var privateFunc = function(message) {
        console.log(message);
    }
    //public var/func
    return {
        publicVariable: 'public',
        // Public function accessing private function
        publicFunction: function(message) {
            privateFunc(message);
        }
    };

})();

/*
    It is also possible to import into to our modules. This is 
    good when you want your module to access something like JQuery
*/

var mixinModule = (function(External) {
    var privateFunc = function(innerHtml){
        External("#container").html(innerHtml);
    }
    return {
        publicFunc: function(innerHtml){
            privateFunc(innerHtml);
        }
    };
})(jQuery);