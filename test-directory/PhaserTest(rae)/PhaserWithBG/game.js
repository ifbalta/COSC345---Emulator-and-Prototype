
/*Creates the game*/
var game = new Phaser.Game(320, 320, Phaser.AUTO, '', 
    { preload: preload, create: create, update: update});


/*Loads maps, tiles, hole, ball images*/
function preload() {

    game.load.tilemap('map', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map2', 'map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map3', 'map3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map4', 'map4.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map5', 'map5.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('blackTile', 'blackTile.png');
    game.load.image('bg', 'bg.jpg');
    game.load.image('hole2', 'hole2.png');
    game.load.image('ball', 'ball2.png');

}


/*Gloabal variables*/
var ball;
var map;
var layer;
var cursors;
var hole;
var i = 1; //Level counter


/**
 **Starts and creates the game and identifies if it's going to the next level.
 **Destroys the game, map and tile layer after the level goes to the next one.
 **/
function create() {
    game.background = game.add.tileSprite(0,0,320,320,'bg');
    initialize(); // initialize emulator


    if(i === 1){    
        map = game.add.tilemap('map');
        setup();

    }else if(i < 6){       
        destroyEverything(game,map,layer); 
        map.destroy();
        map = game.add.tilemap('map'+i);
        setup();
    }else{
        destroyEverything(game,map,layer);
        setup(); 

    }  
    i += 1;
    
}


/**
 ** A function that initialises the map, tile layers, sprites, 
 ** physics p2 game engine and collisions.
 **
 **/
function setup(){

    map.addTilesetImage('blackTile');    
    layer = map.createLayer('blackTile');
    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 32,true,layer);
   

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);
  

    hole = game.add.sprite(160,160,'hole2');
    ball = game.add.sprite(32, 32, 'ball');
    if(i > 5){
        winLabel(); //calls this function when the player wins the game.
    }
    game.physics.p2.enable(ball, false);
    ball.body.setCircle(9);
    game.camera.follow(ball);

    //  By default the ball will collide with the World bounds,
    //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
    //  you need to rebuild the physics world boundary as well. The following
    //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
    //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
    //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);
    cursors = game.input.keyboard.createCursorKeys();

}


/**
 ** The purpose of this function is for updating the ball's movement
 ** and checks if the ball is overlapping the hole
 **/
function update() {
    ball.body.setZeroVelocity();
    
    if (LEFT_KEY){
        ball.body.velocity.x = -150;
        ball.scale.x = 1;
    } else if (RIGHT_KEY) {
        ball.body.velocity.x = 150;
        ball.scale.x = -1;
    }

    if (DOWN_KEY) {
        ball.body.velocity.y = -150;
    }

    if (UP_KEY) {
        ball.body.velocity.y = 150;
    }

    if (checkOverlap(ball,hole)){
        //curr += 1;
        create();
    
    }
    resetKeys();
}



/**
 ** This function is called whenever the game has to reset the map
 ** and tile layer.
 **/
function destroyEverything(game,map, layer){
    game.physics.p2.clearTilemapLayerBodies(map, layer);
    layer.destroy();
}


/**
 ** This function is called when the player wins the game.
 ** This shows a text which says 'Congratulations!'.
 **/
function winLabel(){
    var winText;
    var win;
    
    win = game.add.sprite(0,0,'bg');
    win.inputEnabled = true;

    game.winText = game.add.text(
        game.world.centerX,
        game.world.height/5,
        "",
        {
            size: "32px",
            fill: "#ffffff",  
            stroke: "#000000", 
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: win.width 
        }
    );
    game.winText.setText("Congratulations!");
    game.winText.anchor.setTo(0.5, 0.5);
  
}


/**
 ** This function is called when the ball is overlapping the hole.
 **/
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
