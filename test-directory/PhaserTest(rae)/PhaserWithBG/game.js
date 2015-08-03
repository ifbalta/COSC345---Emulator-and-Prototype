// var fishSprite;


// var game = new Phaser.Game(
// 	800, 600, Phaser.AUTO, '',
// 	{ preload: preload, create: create, update: update }
// );

// function preload(){
// 	game.load.image('fish', 'fish.png');

// }

// function create(){
// 	fishSprite = game.add.sprite(game.world.centerX, 0, 'fish');
// 	game.physics.enable(fishSprite, Phaser.Physics.ARCADE);
// 	fishSprite.body.acceleration.y = 100; //"gravity"
// 	fishSprite.body.collideWorldBounds = true;
// 	fishSprite.body.drag.x = 100;
// 	fishSprite.anchor.setTo(.5,.5);

// }

// function update(){
// 	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
// 		fishSprite.body.velocity.x = -80;
// 		fishSprite.scale.x = 1;
// 	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
// 		fishSprite.body.velocity.x = 80;
// 		fishSprite.scale.x = -1;
// 	}

// 	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
// 		fishSprite.body.velocity.y = -100;
// 	}

// }


var game = new Phaser.Game(320, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('blackTile', 'blackTile.png');
    game.load.image('bg', 'bg.jpg');
    game.load.image('hole2', 'hole2.png');
    // game.load.image('tiles2', 'ball.png');
   game.load.image('ball', 'ball2.png');



}

var ball;
var map;
var layer;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    //game.stage.backgroundColor = '#2d2d2d';
    game.background = game.add.tileSprite(0,0,320,320,'bg');

    map = game.add.tilemap('map');

    map.addTilesetImage('blackTile');
    map.addTilesetImage('hole2');
    // map.addTilesetImage('tiles2');
    
    layer = map.createLayer('blackTile');

    layer.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.
    map.setCollisionBetween(1, 32,true,layer);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer);

    ball = game.add.sprite(32, 32, 'ball');
    game.physics.p2.enable(ball, false);

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



    /*

    if (cursors.left.isDown)
    {
        ball.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ball.body.rotateRight(100);
    }
    else
    {
        ball.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ball.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        ball.body.reverse(400);
    }*/

}

function render() {

}
