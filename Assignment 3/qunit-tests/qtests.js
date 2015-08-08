/**
 *  unittests.js
 *
 *  Tests js with QUnit.
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

// set up emulator and test objects
// create a key event
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

var KEY_FLAG = false; // indicates a key press
// make a mock key handling function
// updates mock game object's position
// sets KEY_FLAG to true if successful
function keyLogic() {
    KEY_FLAG = true;
    if (RIGHT_KEY) {
        mock.x++;

    }
    if (LEFT_KEY) {
        mock.x--;
    }
    if (UP_KEY) {
        mock.y++;
    }
    if (DOWN_KEY) {
        mock.y--;
    }
    resetKeys();
}
// setup emulator
initialize(keyLogic);
// make a mock gameObject to test keyLogic()
var mock = addResource("mock", 0, 0, "mock.png");


/**
 * Testing key maps that aren't directional buttons or the spacebar.
 * Checks if custom key has been added to the keymap.
 * */
function customKeyMappingTest (keyName, keyCode) {
    var mappedKey = mapKey(keyName, keyCode);
    return (keymap[keyName] == mappedKey);
}

/**
 * Testing custom directional buttons, and spacebar.
 * Checks if the keymap reflects new keycode.
 * */
function defaultKeyRemapTest (keyName, keyCode, expectedCode) {
    mapKey(keyName, keyCode);
    return (keymap[keyName].code == expectedCode);
}

/**
 * Checks the key presses are using user mapped key logic.
 * */
function keyPressedTest (keyName) {
    var result;
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
        keymap[keyName].code, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    // event listener should switch on one of the keys so check them all
    keymap.forEach(function (kObj) {
        if (kObj.pressed) {
            KEY_FLAG = true;
        }
    });
    if (!KEY_FLAG) {
        result = false;
    } else {
        result = true;
        KEY_FLAG = false; // reset the flag
    }
    resetKeys();
    return result;

}

/**
 * Checks that the application and emulator hold references to the same game object.
 * */
function gameObjectInitializationTest (objName, objX, objY, objFile) {
    var testObj = addResource(objName, objX, objY, objFile);
    return testObj == images[objName];
}

/**
 * Check that game objects respond to user-mapped key handling logic
 * */
function gameObjectMovementTest(dir, expectedX, expectedY) {
    var result;
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
        keymap[dir].code, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    result = mock.x == expectedX && mock.y == expectedY;
    // reset the mock object
    mock.x = 0;
    mock.y = 0;
    resetImages();
    return result;
}


/**
 *
 * UNIT TESTS
 *
 * */

// test keymaps upon emulator construction
test('defaultKeyRemapTest', function () {
    ok(defaultKeyRemapTest("left", 1, 1), "remapped to LEFT_KEY to key code 1");
    ok(defaultKeyRemapTest("right", 1, 1), "remapped to RIGHT_KEY to key code 1");
    ok(defaultKeyRemapTest("down", 1, 1), "remapped to UP_KEY to key code 1");
    ok(defaultKeyRemapTest("up", 1, 1), "remapped to DOWN_KEY to key code 1");
    ok(defaultKeyRemapTest("spacebar", 1, 1), "remapped to SPACEBAR key code 1");
});
resetEmulator();



test('customKeyMappingTest', function () {
    ok(customKeyMappingTest("shoot", 65), "mapped SHOOT key to 65 key code");
    ok(customKeyMappingTest("specialMove", 67), "mapped SPECIALMOVE key to 66 key code");
    ok(customKeyMappingTest("hide", 68), "mapped  key to HIDE key 67 code");
    ok(customKeyMappingTest("crouch", 69), "mapped  key to CROUCH key 68 code");
});
resetEmulator();
resetKeys();
// test key presses
test('keyPressedTest', function(){
    ok(keyPressedTest("left"), "pressed the left key");
    ok(keyPressedTest("right"), "pressed the right key");
    ok(keyPressedTest("down"), "pressed the down key");
    ok(keyPressedTest("up"), "pressed the up key");
    ok(keyPressedTest("spacebar"), "pressed the  spacebar");
});

// test game object movement

// make a mock gameObject to test key handling
var mock = addResource("mock", 0, 0, "mock.png");
test('gameObjectMovementTest', function(){
    ok(gameObjectMovementTest("left", -1, 0), "mock object moved to the left");
    ok(gameObjectMovementTest("right", 1, 0), "mock object moved to the right");
    ok(gameObjectMovementTest("up", 0, 1), "mock object moved up");
    ok(gameObjectMovementTest("down", 0, -1), "mock object moved down");
});




// test game object initialization
test('gameObjectInitializationTest', function(){
    ok(gameObjectInitializationTest("sora", 0, 0, "mock.png"),"initialized sora");
    ok(gameObjectInitializationTest("riku", 10, 10, "mock.png"),"initialized riku");
    ok(gameObjectInitializationTest("kairi", 300, 300, "mock.png"),"initialized kairi");

});

