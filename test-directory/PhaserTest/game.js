var fishSprite;


var game = new Phaser.Game(
	800, 600, Phaser.AUTO, '',
	{ preload: preload, create: create, update: update }
);

function preload(){
	game.load.image('fish', 'fish.png');

}

function create(){
	fishSprite = game.add.sprite(game.world.centerX, 0, 'fish');
	game.physics.enable(fishSprite, Phaser.Physics.ARCADE);
	fishSprite.body.acceleration.y = 100; //"gravity"
	fishSprite.body.collideWorldBounds = true;
	fishSprite.body.drag.x = 100;
	fishSprite.anchor.setTo(.5,.5);

}

function update(){
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		fishSprite.body.velocity.x = -80;
		fishSprite.scale.x = 1;
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		fishSprite.body.velocity.x = 80;
		fishSprite.scale.x = -1;
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		fishSprite.body.velocity.y = -100;
	}

}