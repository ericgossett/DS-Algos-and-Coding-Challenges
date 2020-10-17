/*
    The mediator pattern is best thought of as air traffic control. Rather 
    than have planes communicate with each other, they respond to the 
    tower and the tower handles where to direct the message.

    The mediator pattern is very similar to the pub/sub. So similar in fact, 
    that the internet can't seem to define the differences well. From what 
    I found the key differences are as follows:

    - The mediator knows all the components and methods. This differs from a 
      pub sub where the subscribers are responsible for sending the callback.
    - The mediator decides what to do
    - Subscribers contain a reference to the mediator.
    - Subscribers can send messages between other subscribers, from -> to. 
      The mediator acts as the middleman in the exchange. This is different 
      from a pub/sub where the publisher emits an event and the subscribers 
      listen for the event and act.

    The mediator pattern works best for objects with indirect relationships. 
    So if you have some dialog window or a component of objects waiting on 
    certain events. 
*/
var Subscriber = (function(){
    function subscriber(name) {
        this.name = name;
        this.mediator = null;
    }

    subscriber.prototype = {
        send: function(message, to) {
            this.mediator.broadcast(message, to, this);
        },
        recieve: function(message, from) {
            console.log(
                this.name, ' recieved message "', message, '" from ', from.name
            );
        },
        unsubscribe: function() {
            if (this.mediator) {
                this.mediator.unsubscribe(this);
            }
        }
    }

    return subscriber;
})();

var Mediator = (function(){
    function mediator() {
        var _subscribers = {};
        return {
            subscribe: function(sub) {
                if (_subscribers[sub.name]) {
                    console.log('subscriber exists with same name');
                    return false;
                }
                _subscribers[sub.name] = sub;
                sub.mediator = this;
                return true;
            },
            unsubscribe: function(sub) {
                delete _subscribers[sub.name];
            },
            broadcast: function(message, to, from) {
                if (!to) {
                    for (var key in _subscribers) {
                        if(_subscribers[key].name !== from.name) {
                            _subscribers[key].recieve(message, from);
                        }
                    }
                } else {
                    if (!_subscribers[to.name]) {
                        console.log(
                            'ERROR: Unable to send message from',
                            from.name,
                            ' to ',
                            to.name
                        )
                    }
                    to.recieve(message, from);
                }
            }
        };
    }
    return mediator;
})();

var mediator = new Mediator();
var sub1 = new Subscriber('sub1');
var sub2 = new Subscriber('sub2');
var sub3 = new Subscriber('sub3');

mediator.subscribe(sub1);
mediator.subscribe(sub2);
mediator.subscribe(sub3);

sub1.send('message from sub1 to all');
sub3.send('message from sub3 to sub1', sub1);