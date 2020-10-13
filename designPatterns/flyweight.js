/*
    The flyweight pattern aims to optimize slow code that inefficiently shares
    data. It reduces the memory footprint of the code by sharing as much 
    data as possible with related objects.

    A example would be generating tiles of terrain in a game. The terrain would 
    consist of some N x M grid where each tile has a terrain type (grass, water,
    desert, lava etc). Each terrain type comes with its own properties (such as 
    movement penalties) and a texture. If we where to naively place an instance 
    of each object into our grid the terrain map becomes extremely heavy. So 
    the idea is that we create only one instance of each terrain type, and only
    store a reference to each type in the terrain grid.
 */

var GrassTerrain = function() {
    this.type = 'grass';
    this.movementCost = 0;
    this.texture = 'path_to_texture';
}

var DesertTerrain = function() {
    this.type = 'desert';
    this.movementCost = 5;
    this.texture = 'path_to_texture';
}

var WaterTerrain = function() {
    this.type = 'water';
    this.movementCost = 10;
    this.texture = 'path_to_texture';
}

terrainTypes = {
    grass: new GrassTerrain(),
    desert: new DesertTerrain(),
    water: new WaterTerrain()
};

var generateTerrain = function(x, y, terrainTypes) {
    var grid = [];
    for (var i = 0; i < x; i++) {
        var row = [];
        for (var j = 0; j < y; j++) {
            // pick random terrainType;
            var keys = Object.keys(terrainTypes);
            row.push(
                terrainTypes[keys[keys.length * Math.random() << 0]]
            );
        }
        grid.push(row);
    }
    return grid;
}

// Generate terrain 2x2 for demo purposes
var terrain = generateTerrain(2, 2, terrainTypes);

// create some other instances of terrain objects to double check
var otherGrass = new GrassTerrain();
var otherDesert = new DesertTerrain();
var otherWater = new WaterTerrain();

// Check if titles are references to same terrian instance
for (var i = 0; i < terrain.length; i++) {
    for (var j = 0; j < terrain[i].length; j++) {
       switch(terrain[i][j].type) {
           case 'grass':
                console.log('Is grass:', terrain[i][j] == terrainTypes.grass);
                console.log('Is other grass:', terrain[i][j] == otherGrass);                
                break;
           case 'desert':
                console.log('Is desert:', terrain[i][j] == terrainTypes.desert);
                console.log('Is other desert:', terrain[i][j] == otherDesert);                
                break;
           case 'water':
                console.log('Is water:', terrain[i][j] == terrainTypes.water);
                console.log('Is other water:', terrain[i][j] == otherWater);
                break;
       }
       console.log('');
    }
}