/**
 * Created by ibaltazar on 8/6/15.
 *
 * Tests emulator, gameobject and keyobject functions with applications.
 */

// Initialize emulator with app environment.
initialize(pressedKeys);
setBG("resources/islands-map.png");

var sora = addResource("sora", 0,0,"resources/SoraKHCOM.png"); // setup resources
//var enemy = addResource("enemy", 16,16, "resources/spaceship.jpg");
start(); // start emulator


// game logic
function pressedKeys () {
    if (RIGHT_KEY) {
        console.log("right");
        sora.x += 3;
    }
    if (LEFT_KEY) {
        console.log("left");
        sora.x -= 3;
    }
    if (DOWN_KEY) {
        console.log("down");
        sora.y += 4
    }
    if (UP_KEY) {
        console.log("up");
        sora.y -= 4;
    }
}
