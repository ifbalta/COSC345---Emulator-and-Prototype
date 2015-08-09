/**
   emulator.js is an IO pipeline between the browser and game.js.
   emulator.js defines functions and objects that can be used by applications
   to access a browser's canvas element.

   emulator.js is the transpiled version of Emulator.ts.
   emulator.js requires a server to run.

   Version : 2.0.0

   Dependencies:
    jQuery 1.18.0
*/

/**
 GameObject
    Defines an object that can be painted onto the canvas.
    No longer needed because phaser.io has its own game loop.
     - Image
     - Coordinates
 */
var GameObject = (function () {
    function GameObject(x, y, spriteFile) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = spriteFile;
        this.spriteFile = spriteFile;
    }
    GameObject.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ") " + this.spriteFile + "!";
    };
    GameObject.prototype.resetPos = function () {
        this.x = this.initialX;
        this.y = this.initialY;
    }
    return GameObject;
})();

/**
 KeyObject
    Defines an object that represents a key.
     - KeyCode
     - KeyPressed
 */
var KeyObject = (function (){
    function KeyObject(code, pressed) {
        this.code = code;
        this.pressed = pressed;
    }
    return KeyObject;
})();


var clock_cycle; // how often the emulator listens for events

// image resources
var bg = new Image();
var images = []; // GameObject array

// key maps
var keymap = []; // KeyObject array
var SPACEBAR;
var LEFT_KEY;
var RIGHT_KEY;
var UP_KEY;
var DOWN_KEY;

// passed functions
var mappedKeyFunction;

/**
   Allows applications to provide images
   so that the emulator can paint them.
*/
function addResource (name, x, y, imgFile) {
    images[name] = new GameObject(x, y, imgFile); // to allow access by name
    images.push(images[name]); // to allow access through forEach
    return images[name];   
}

/**
   Initializes emulator.
   Must take a background image.
*/
function initialize(keyFunction){
    // map directional keys
    keymap["spacebar"] = new KeyObject(32, false);
    keymap["left"] = new KeyObject(37, false);
    keymap["up"] = new KeyObject(38, false);
    keymap["right"] = new KeyObject(39, false);
    keymap["down"] = new KeyObject(40, false)
    keymap.push(keymap["spacebar"]);
    keymap.push(keymap["left"]);
    keymap.push(keymap["right"]);
    keymap.push(keymap["down"]);
    keymap.push(keymap["up"]);
    LEFT_KEY = keymap["left"].pressed;
    RIGHT_KEY = keymap["right"].pressed;
    UP_KEY = keymap["up"].pressed;
    DOWN_KEY = keymap["down"].pressed;
    SPACEBAR = keymap["spacebar"].pressed;
    // map callbacks to listeners
    mappedKeyFunction = keyFunction;
}

/**
 *  Start listening for events.
 * */
function start() {
    if (typeof ctxt != "undefined") {
        paint();
        if (typeof clock_cycle != "undefined") clearInterval(clock_cycle);
        clock_cycle = setInterval(paint, 60);
    }
}

/**
 *  Paints images and resets key values.
 */
function paint () {
    ctxt.drawImage(bg, 0, 0);
    images.forEach(function (gObj) {
        ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);
    });
    resetKeys();
}

/**
 * Sets the application's background image.
 * */
function setBG (bgFile) {
    bg.src = bgFile;
    bg.height = h;
    bg.width = w;
}

/**
 * Reset emulator to default state.
 * */
function resetEmulator () {
    keymap = []; // reset keymap
    keymap["left"] = new KeyObject(37, false);
    keymap["up"] = new KeyObject(38, false);
    keymap["right"] = new KeyObject(39, false);
    keymap["down"] = new KeyObject(40, false)
    keymap.push(keymap["left"]);
    keymap.push(keymap["right"]);
    keymap.push(keymap["down"]);
    keymap.push(keymap["up"]);
    LEFT_KEY = keymap["left"].pressed;
    RIGHT_KEY = keymap["right"].pressed;
    UP_KEY = keymap["up"].pressed;
    DOWN_KEY = keymap["down"].pressed;
}


/**
 * Reset key states
 * */
function resetKeys(){
    keymap.forEach(function (kObj){
        if (kObj.pressed) {
            kObj.pressed = false;
        }
    });
    LEFT_KEY = keymap["left"].pressed;
    RIGHT_KEY = keymap["right"].pressed;
    UP_KEY = keymap["up"].pressed;
    DOWN_KEY = keymap["down"].pressed;
    SPACEBAR = keymap["spacebar"].pressed;
}

/**
 * Reset image coordinates
 * */
function resetImages() {
    images.forEach ( function (gObj){
        gObj.resetPos();
    });
}


/**
 *  Allows the application to map directional buttons to other keys.
 *  Default key is unpressed.
*/
function mapKey (keyName, keyCode) {
    keyName = keyName.toLowerCase();
    if (typeof keymap[keyName] != "undefined") {
        keymap[keyName].code = keyCode;
    } else {
        keymap[keyName] = new KeyObject(keyCode, false);
        keymap.push(keymap[keyName]);
    }    
}

/**
 * Updates key objcts.
 * */
window.addEventListener("keydown", function (e){
    var e = e.which;
    keymap.forEach(function (kObj){
        if (kObj.code == e) {
            kObj.pressed = true;
        }
    });
    LEFT_KEY = keymap["left"].pressed;
    RIGHT_KEY = keymap["right"].pressed;
    UP_KEY = keymap["up"].pressed;
    DOWN_KEY = keymap["down"].pressed;
    if (typeof mappedKeyFunction != "undefined")mappedKeyFunction;
});









