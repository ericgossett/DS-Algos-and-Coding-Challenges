/*
    The observer pattern works by having a single object (subject) that maintains 
    a list to a collection of objects (observers) that listen for notifications 
    to when a change of state occurred. The subject broadcast these notifications 
    while the observers listen.

    Advantages:
        - Requires deep-level things of relationships between components.
        - Helps pinpoint dependencies
        - Decouples objects, promoting smaller reusable components.

    Disadvantages:
        - Subject and observers are now coupled.
        - Emitted events are not separated into topics. All observers 
        responds when notified. Observers cannot pick what topics 
        to subscribe to.

*/

var Subject = (function() {
    function subject () {
        this.observers = [];
    }

    subject.prototype = {
        subscribeObserver: function(observer) {
            this.observers.push(observer);
        },
        unsubscribeObserver: function(observer) {
            var idx = this.observers.indexOf(observer);
            if (idx > -1) {
                this.observers.splice(idx, 1);
            }
        },
        notifyObserver: function(observer) {
            var idx = this.observers.indexOf(observer);
            if (idx > -1) {
                this.observers[idx].notify(idx);
            }
        },
        notifyAllObservers: function() {
            for (var i = 0; i < this.observers.length; i++) {
                this.observers[i].notify(i);
            }
        }
    }

    return subject;
})();


var Observer = function(){
    return {
        notify: function(idx){
            console.log('Observer ' + idx + ' was notifed')
        }
    };
};

var subject = new Subject();

var observer1 = new Observer();
var observer2 = new Observer();

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);

subject.notifyObserver(observer1);

console.log('notifying all ');
subject.notifyAllObservers();