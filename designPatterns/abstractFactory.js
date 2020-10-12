/*
    Abstract factory is a factory pattern that aims to separate the details 
    of implementation of a set of objects.

    It should be used when the system is required to be independent from 
    the way objects are created or if it is creating different types of 
    objects.
 */

// Setting up some objects using prototype pattern

var Npc = function() {
    this.talk = function() {
        console.log('dialog');
    };
    this.attack = function() {
        console.log('combat');
    };
    this.move = function() {
        console.log('movement');
    };
}

function Knight (options) {
    this.health = options.health || 100;
    this.level = options.level || 10;
    this.name = options.name || 'level '+ this.level + ' knight';
    this.armorType = options.armorType || 'heavy';
    this.weapon = options.weapon || 'sword';
}

Knight.prototype = new Npc();

function Mage (options) {
    this.health = options.health || 100;
    this.level = options.level || 10;
    this.name = options.name || 'level '+ this.level + ' mage';
    this.spells = options.spells || ['magic missle', 'fireball'];
}

Mage.prototype = new Npc();

// The factory implementation

var AbstractNpcFactory = (function(){
    function factory() {
        var types = {};
        return {
            create: function(type, options) {
                var NpcClass = types[type];
                return (NpcClass ? new NpcClass(options) : null);
            },
            register: function(type, NpcClass) {
                // Criteria to allow registeration
                var proto = NpcClass.prototype;
                if(proto instanceof Npc) {
                    types[type] = NpcClass;
                }
                return this;
            }
        };
    }
    return factory;
})();

abstractNpcFactory = new AbstractNpcFactory();
abstractNpcFactory.register('knight', Knight);
abstractNpcFactory.register('mage', Mage);

var mage = abstractNpcFactory.create('mage', {
    npcType: 'mage',
    health: 400,
    spells: ['frost nova', 'firestorm', 'chain lighting'],
    level: 32
});

console.log(mage);

var knight = abstractNpcFactory.create('knight', {
    npcType: 'knight',
    health: 800,
    weapon: 'battle axe',
    level: 41,
})

console.log(knight);
