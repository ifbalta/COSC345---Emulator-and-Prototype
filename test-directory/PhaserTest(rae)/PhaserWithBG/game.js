var game = new Phaser.Game(320, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var mapArray = [];
function preload() {

    game.load.tilemap('map', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map2', 'map2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map3', 'map3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map4', 'map4.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('map5', 'map5.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('blackTile', 'blackTile.png');
    game.load.image('bg', 'bg.jpg');
    game.load.image('hole2', 'hole2.png');
    // game.load.image('tiles2', 'ball.png');
    game.load.image('ball', 'ball2.png');

}

var ball;
var map;
var layer;
var layer2;
var cursors;
var hole;
var curr = 0;
var i = 1;


function create() {  
    //game.stage.backgroundColor = '#2d2d2d';
    game.background = game.add.tileSprite(0,0,320,320,'bg');


    if(i === 1){    
        map = game.add.tilemap('map');

        //game.physics.p2.clearTilemapLayerBodies(map, layer);
        //layer.destroy();
        //map.destroy();

    }else if(i < 6){
         
        destroyEverything(game,map,layer); 
        map = game.add.tilemap('map'+i);
    }else{
        destroyEverything(game,map,layer); 
        alert("just testing for when the game finishes");
        i = 1;
    }  
    i += 1;
    map.addTilesetImage('blackTile');
    //map.addTilesetImage('hole2');
    // map.addTilesetImage('tiles2');
    
    layer = map.createLayer('blackTile');
    //layer2 = map.createLayer('hole2');

    //layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.P2JS);
    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 32,true,layer);
    //map.setCollisionBetween(1, 32,true,layer2);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);
    //game.physics.p2.convertTilemap(map, layer2);

    hole = game.add.sprite(160,160,'hole2');
    ball = game.add.sprite(32, 32, 'ball');
    game.physics.p2.enable(ball, false);
    ball.body.setCircle(9);
    //game.physics.p2.enable(hole, true);

    game.camera.follow(ball);

    //  By default the ball will collide with the World bounds,
    //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
    //  you need to rebuild the physics world boundary as well. The following
    //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
    //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
    //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);


    //  Even after the world boundary is set-up you can still toggle if the ball collides or not with this:
    // ball.body.collideWorldBounds = false;

    cursors = game.input.keyboard.createCursorKeys();



}

function destroyEverything(game,map, layer){
     game.physics.p2.clearTilemapLayerBodies(map, layer);
     layer.destroy();
}


function update() {
    ball.body.setZeroVelocity();
    ball.body.setZeroRotation(); 
  
    
    if (cursors.left.isDown){ 
        ball.body.velocity.x = -150;
        ball.scale.x = 1;
    } else if (cursors.right.isDown) {
        ball.body.velocity.x = 150;
        ball.scale.x = -1;
    }

    if (cursors.up.isDown) {
        ball.body.velocity.y = -150;
    }

     if (cursors.down.isDown) {
        ball.body.velocity.y = 150;
    }

    if (checkOverlap(ball,hole)){
        //curr += 1;

        create();
    
    }

/*
   var bodyA=game.physics.p2.getBody(ball)
   var bodyB=game.physics.p2.getBody(hole); 
    if(p2.Broadphase.aabbCheck(bodyA,bodyB)){ console.log("ok"); } */
    

}



function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function render() {

}
