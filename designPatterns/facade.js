/*
    The Facade pattern aims to conceal complexity by adding a higher-level 
    public interface. It is good for when you have a lot of complex function 
    calls underneath and want to provide a simple function instead. Also 
    helpful when you would have a lot of boilerplate such as checking 
    for special cases. 

    Advantages:
        - Simplifies public interface.
        - Protects internals.
        - Very easy to implement.

    Disadvantages:
        - None, however one must decide in the extra abstraction is 
          really worth it.

*/

// Example: method that mask browser-specific methods
function addEvent(element, event, callback) {
    if (window.addEventListener) {
        element.addEventListener(event, callback, false);
    } else if (document.attachEvent) {
        element.attachEvent('on' + event, callback);
    } else {
        element['on' + event] = callback;
    }
}

// Module example
var Module = (function(){
    var _variable = 'test';
    var _setter = function(val) {
        _variable = val;
    }
    var _getter = function(){
        return _variable;
    }

    return {
        facade: function(setup) {
            _setter(setup.val);
            if(setup.verbose) {
                console.log('set value to :', _getter());
            }
        }
    }
})();

Module.facade({val: 10, verbose: true});