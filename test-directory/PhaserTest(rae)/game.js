var ballSprite;


var game = new Phaser.Game(
	320,320, Phaser.AUTO, '',
	{ preload: preload, create: create, update: update }
);

function preload(){
	game.load.image('ball', 'ball.png');

}

function create(){

	 //  Enable P2
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0.8;

    //  Create our collision groups. One for the player, one for the pandas


	ballSprite = game.add.sprite(game.world.centerX, 0, 'ball');
	game.physics.p2.enable(ballSprite, false);
	//game.physics.enable(ballSprite, Phaser.Physics.ARCADE);
	//ballSprite.body.acceleration.y = 20; //"gravity"
	ballSprite.body.collideWorldBounds = true;
	//ballSprite.body.drag.x = 100;
	ballSprite.anchor.setTo(.5,.5);
	cursors = game.input.keyboard.createCursorKeys();


}

function update(){
	/*
	ballSprite.body.setZeroVelocity();
	if (cursors.left.isDown) {
        ballSprite.body.moveLeft(200);
    } else if (cursors.right.isDown) {
        ballSprite.body.moveRight(200);
    }

    if (cursors.up.isDown) {
        ballSprite.body.moveUp(200);        
    } else if (cursors.down.isDown) {
        ballSprite.body.moveDown(200);
    }*/

	
	ballSprite.body.setZeroVelocity();
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		ballSprite.body.velocity.x = -150;
		ballSprite.scale.x = 1;
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		ballSprite.body.velocity.x = 150;
		ballSprite.scale.x = -1;
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		ballSprite.body.velocity.y = -150;
	}

	 if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		ballSprite.body.velocity.y = 150;
	}

}