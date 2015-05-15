/**
 *  mockemulator.js
 *
 *  Tests emulator.js with QUnit.
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
* testResults object that tracks total number of tests and total number of test failures.
* */
var testResults = {
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

/**
 * Test cases for file selection
 * */

selectionTest("mazegame.js", "appDir/mazegame/mazegame.js");
selectionTest("mazegameprototype.js", "appDir/mazegameprototype/mazegameprototype.js");
selectionTest("placeholder.js", "appDir/placeholder/placeholder.js");
selectionTest("testgameprototype.js", "appDir/testgameprototype/testgameprototype.js");
selectionTest("snakelogic.js", "appDir/snakelogic/snakelogic.js");
selectionTest("snakeprototype.js", "appDir/snakeprototype/snakeprototype.js");

console.log("Of " + testResults.total + " tests, " + testResults.bad + " failed, " + 
(testResults.total - testResults.bad) + " passed.");
