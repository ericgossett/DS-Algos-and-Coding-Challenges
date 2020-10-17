/*
    The pub/sub is similar to the Observer however it uses an topic/event channel 
    which sits between the objects (subs) and the object firing events (pub). 
    In the observer pattern it is required that the observer subscribes to the 
    object firing the event. 

    The pub/sub allows any object (sub) with the appropriate event handler to 
    register to a specific topic of the publisher. 

    - works best when objects are totally unrelated or theirs a large number 
      of them
    - The publisher doesn't know of the methods subscribers have, the subscribers 
      send the callback to the publisher
*/
var PubSub = (function() {
    function obj() {
        var _topics = {};
        return {
            subscribe: function(topic, callback) {
                if (!_topics[topic]) {
                    _topics[topic] = [];
                }
                _topics[topic].push(callback);
                return true;
            },
            unsubscribe: function(topic, callback) {
                if (!_topics[topic]) {
                    return false;
                }
                for (i = 0; i < _topics[topic].length; i++) {
                    if(_topics[topic][i] === callback) {
                        _topics[topic].splice(i, 1);
                        return true;
                    }
                }
                return false;
            },
            publish: function() {
                // change arguments from obj to array
                var args = Array.prototype.slice.call(arguments);
                // get first arg (the topic subscribed to)
                var topic = args.shift();
                if (!_topics[topic]) {
                    return false;
                }
                for (i = 0; i < _topics[topic].length; i++) {
                    _topics[topic][i].apply(undefined, args);
                }
            }
        }
    }
    return obj;
})();

// example subscriber function
Subscriber1 = function (arg) {
    console.log('subscriber1 = ', arg);
}
Subscriber2 = function (arg) {
    console.log('subscriber2 = ', arg);
}

var pubsub = new PubSub();
pubsub.subscribe('topic', Subscriber1);
pubsub.publish('topic', '1 subscriber');  
pubsub.subscribe('topic', Subscriber2);
pubsub.publish('topic', '2 subscribers'); 
pubsub.unsubscribe('topic', Subscriber1);
pubsub.publish('topic', '1 subscriber'); 
