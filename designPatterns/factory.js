/*
    Factories are a common design pattern in OOP. It is an object that creates 
    objects. In classical OOP this is used to create objects from the same 
    parent class. However, JavaScript does not have typical inheritance so 
    the implementation is simplified.

    Advantages:
        - Provides an interface to handle object creation
        - Great for generating different objects depending on the environment
        - Practical for components with similar methods.
*/

function Knight (options) {
    this.health = options.health || 100;
    this.level = options.level || 10;
    this.name = options.name || 'level '+ this.level + ' knight';
    this.armorType = options.armorType || 'heavy';
    this.weapon = options.weapon || 'sword';
}

function Mage (options) {
    this.health = options.health || 100;
    this.level = options.level || 10;
    this.name = options.name || 'level '+ this.level + ' mage';
    this.spells = options.spells || ['magic missle', 'fireball'];
}

function NpcFactory(){
    this.npcClass = Knight;
}

NpcFactory.prototype.create = function(options) {
    switch(options.npcType) {
        case 'knight':
        this.npcClass = Knight;
        break;
        case 'mage':
        this.npcClass = Mage;
        break
    }
    return new this.npcClass(options);
}


var npcFactory = new NpcFactory();

var mage = npcFactory.create({
    npcType: 'mage',
    health: 400,
    spells: ['frost nova', 'firestorm', 'chain lighting'],
    level: 32
});

console.log(mage);

var knight = npcFactory.create({
    npcType: 'knight',
    health: 800,
    weapon: 'battle axe',
    level: 41,
})

console.log(knight);
