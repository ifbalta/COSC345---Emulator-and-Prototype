/**
 *  unittests.js
 *
 *  Tests emulator.js with QUnit.
 *
 *  We will test that the emulator is initialized with the correct values
 *  and that applications are able to map their own keys and add
 *  game objects correctly.
 *
 *  Authors: Isabel Baltazar
 *
 *
 *  Version: 1.0.0
 *  Language: JavaScript
 *  Dependencies: jQuery version 1.11.1
 *                QUnit version 1.18.0
 *
 * */

/**
 * testResults records the total number of tests
 * and total number of test failures.
 * */
var testResults = {
    total : 0,
    bad : 0
}

/**
 * Records the number of correct key presses
 * */
var keyPressedResults = {
    total: 0,
    bad : 0
}

/**
 * Records the number of successfully initialized GameObjects
 * */
var gameObjectResults = {
    total : 0,
    bad : 0
}

/**
 * Tests selectFile() formatting.
 * */
function selectionTest(filename, expected){
    testResults.total++;
    var result = selectFile(filename);
    if (result != expected) {
        testResults.bad++;
        console.log("Expected " + expected + " but received " + result);
    }
}

// the emulator needs a canvas
var canvas = document.createElement('canvas');
canvas.id     = "testcanvas";
canvas.width  = 320;
canvas.height = 320;
document.body.appendChild(canvas);

// make a mock key handling function
// updates mock game object's position
// returns true if successful
function keyLogic() {
    if (emulator.RIGHT_KEY) {
        mock.x++;
        return true;
    }
    if (emulator.LEFT_KEY) {
        mock.x--;
        return true;
    }
    if (emulator.UP_KEY) {
        mock.y++;
        return true;
    }
    if (emulator.DOWN_KEY) {
        mock.y--;
        return true;
    }
}

// construct emulator
emulator.setup("mockbg.png", keyLogic);

// make a mock gameObject to test keyLogic()
var mock = emulator.addResource("mock", 0, 0, "mock.png");




function keyMappingTest (keyName, keyCode, expected) {}

function keyPressedTest (keyName, expected) {}

function gameObjectInitialization (objName, objX, objY, objFile, expected) {}

function gameObjectMovement (dir, expected) {}

// test file selection

selectionTest("mazegame.js", "appDir/mazegame/mazegame.js");
selectionTest("mazegameprototype.js", "appDir/mazegameprototype/mazegameprototype.js");
selectionTest("placeholder.js", "appDir/placeholder/placeholder.js");
selectionTest("testgameprototype.js", "appDir/testgameprototype/testgameprototype.js");
selectionTest("snakelogic.js", "appDir/snakelogic/snakelogic.js");
selectionTest("snakeprototype.js", "appDir/snakeprototype/snakeprototype.js");

// test keymaps upon emulator construction

// test game object initialization

// test key presses

// test game object movement


// Display results
console.log("Of " + keyPressedResults.total + " tests, " + keyPressedResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
console.log("Of " + gameObjectResults.total + " tests, " + gameObjectResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
console.log("Of " + testResults.total + " tests, " + testResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
