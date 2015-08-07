/**
 * Created by ibaltazar on 8/6/15.
 *
 * Tests emulator, gameobject and keyobject functions with applications.
 */

// Initialize emulator with app environment.
emulator.initialize("resources/islands-map.png", pressedKeys);

var sora = emulator.addResource("sora", 0,0,"resources/SoraKHCOM.png"); // setup resources
//var enemy = addResource("enemy", 16,16, "resources/spaceship.jpg");
emulator.start(); // start emulator


// game logic
function pressedKeys () {
    if (emulator.RIGHT_KEY) {
        sora.x += 3;
    }
    if (emulator.LEFT_KEY) {
        sora.x -= 3;
    }
    if (emulator.DOWN_KEY) {
        sora.y -= 4
    }
    if (emulator.UP_KEY) {
        sora.y += 4;
    }
}
