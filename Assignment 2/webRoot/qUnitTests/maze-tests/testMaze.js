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
 * Tests level selection.
 * */
function levelTest(round, expected){
    testResults.total++;
    

    var result = levelSelect(round);
    if (result != expected) {
        testResults.bad++;
        console.log("Expected " + expected + " but received " + result);
    }
}

/**
 * Test cases for level selection
 * */
levelTest(0, "Level1.gif");
levelTest(1, "Level2.gif");
levelTest(2, "Level3.gif");



console.log("Of " + testResults.total + " tests, " + testResults.bad + " failed, " + 
(testResults.total - testResults.bad) + " passed.");
