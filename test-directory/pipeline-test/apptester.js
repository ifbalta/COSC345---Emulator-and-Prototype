/**
 * Created by ibaltazar on 8/6/15.
 *
 * Tests emulator, gameobject and keyobject functions with applications.
 */

// Initialize emulator with app environment.
var emulator = new Emulator("resources/islands-map.png", pressedKeys);

var sora = emulator.addResource("sora", 0,0,"resources/SoraKHCOM.png"); // setup resources
//var enemy = addResource("enemy", 16,16, "resources/spaceship.jpg");
emulator.start(); // start emulator


// game logic
function pressedKeys () {
    if (RIGHT_KEY) {
        sora.x += 3;
    }
    if (LEFT_KEY) {
        sora.x -= 3;
    }
    if (DOWN_KEY) {
        sora.y -= 4
    }
    if (UP_KEY) {
        sora.y += 4;
    }
}
