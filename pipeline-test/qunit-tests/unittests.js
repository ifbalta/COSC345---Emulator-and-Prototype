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



// the emulator needs a canvas
var canvas = document.createElement('canvas');
canvas.id     = "testcanvas";
canvas.width  = 320;
canvas.height = 320;
document.body.appendChild(canvas);

// create a key event
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

//keyboardEvent[initMethod](
//    "keydown", // event type : keydown, keyup, keypress
//    true, // bubbles
//    true, // cancelable
//    window, // viewArg: should be window
//    false, // ctrlKeyArg
//    false, // altKeyArg
//    false, // shiftKeyArg
//    false, // metaKeyArg
//    40, // keyCodeArg : unsigned long the virtual key code, else 0
//    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
//);
//document.dispatchEvent(keyboardEvent);

var KEY_FLAG = false; // indicates a key press
// make a mock key handling function
// updates mock game object's position
// sets KEY_FLAG to true if successful
function keyLogic() {
    if (emulator.RIGHT_KEY) {
        mock.x++;
        KEY_FLAG = true;
    }
    if (emulator.LEFT_KEY) {
        mock.x--;
        KEY_FLAG = true;
    }
    if (emulator.UP_KEY) {
        mock.y++;
        KEY_FLAG = true;
    }
    if (emulator.DOWN_KEY) {
        mock.y--;
        KEY_FLAG = true;
    }
}
// construct emulator
emulator.setup("mockbg.png", keyLogic);
// make a mock gameObject to test keyLogic()
var mock = emulator.addResource("mock", 0, 0, "mock.png");

/**
 * Testing key maps that aren't directional buttons or the spacebar.
 * Checks if custom key has been added to the keymap.
 * */
function customKeyMappingTest (keyName, keyCode) {
    keyPressedResults.total++;
    var mappedKey = emulator.mapKey(keyName, keyLogic, keyCode);
    if (emulator.keymap[keyName] != mappedKey) {
        keyPressedResults.bad++;
    }

}

/**
 * Testing custom directional buttons, and spacebar.
 * Checks if the keymap reflects new keycode.
 * */
function defaultKeyRemapTest (keyName, keyCode, expectedCode) {
    keyPressedResults.total++;
    emulator.mapKey(keyName, keyLogic, keyCode);
    if (emulator.keyMap[keyName].code == expectedCode){
        keyPressedResults.bad++;
    }
}

/**
 * Checks the key presses are using user mapped key logic.
 * */
function keyPressedTest (keyName, expected) {
    keyPressedResults.total++;
    // simulate a key press
    keyboardEvent[initMethod](
        "keydown", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        emulator.keymap[keyName].code, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    if (!KEY_FLAG) {
        keyPressedResults.bad++;
    }
    KEY_FLAG = false; // turn off the flag

}

/**
 * Checks that the application and emulator hold references to the same game object.
 * */
function gameObjectInitialization (objName, objX, objY, objFile) {
    gameObjectResults.total++;
    var testObj = emulator.addResource(objName, objX, objFile);
    if (testObj!= emulator[objName]) {
        gameObjectResults.bad++;
    }
}

/**
 * Check that game objects respond to user-mapped key handling logic
 * */
function gameObjectMovement (dir, expectedX, expectedY) {
    // simulate a keyPress
    keyPressedResults.total++;
    // simulate a key press
    keyboardEvent[initMethod](
        "keydown", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        emulator.keymap[dir].code, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    gameObjectResults.total++;
    if (mock.x != expectedX){
        gameObjectResults.bad++;
    }
    gameObjectResults.total++;
    if (mock.y != expectedY) {
        gameObjectResults.bad++;
    }
    // reset the mock object
    mock.x = 0;
    mock.y = 0;
}

// test keymaps upon emulator construction
defaultKeyRemapTest("left", 1, 1);
defaultKeyRemapTest("right", 1, 1);
defaultKeyRemapTest("down", 1, 1);
defaultKeyRemapTest("up", 1, 1);


// test game object initialization

// test key presses

// test game object movement

// total results
totalResults.total = keyPressedResults.total + gameObjectResults.total;
totalResults.bad = keyPressedResults.bad + gameObjectResults.bad;

// Display all results
console.log("Of " + keyPressedResults.total + " tests, " + keyPressedResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
console.log("Of " + gameObjectResults.total + " tests, " + gameObjectResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
console.log("Of " + testResults.total + " tests, " + testResults.bad + " failed, " +
(testResults.total - testResults.bad) + " passed.");
