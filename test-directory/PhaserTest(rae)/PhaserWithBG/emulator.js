/**
   emulator.js defines an IO pipeline between the browser and app.js.
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
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = spriteFile;
        this.spriteFile = spriteFile;
    }
    GameObject.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ") " + this.spriteFile + "!";
    };
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
        this.code = code,
            this.pressed = pressed;
    }
    return KeyObject;
})();

// image resources
var bg = new Image();
var images = []; // GameObject array

// key maps
var keymap = [];
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
function setup(keyFunction){
    // map directional keys
    keymap["left"] = new KeyObject(37, false);
    keymap["down"] = new KeyObject(38, false);
    keymap["right"] = new KeyObject(39, false);
    keymap["up"] = new KeyObject(40, false)
    keymap.push(keymap["left"]);
    keymap.push(keymap["right"]);
    keymap.push(keymap["down"]);
    keymap.push(keymap["up"]);
    LEFT_KEY = keymap["left"].pressed;
    RIGHT_KEY = keymap["right"].pressed;
    UP_KEY = keymap["up"].pressed;
    DOWN_KEY = keymap["down"].pressed;
    // map callbacks to listeners
    mappedKeyFunction = keyFunction;
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
}


/**
 *  Allows the application to map directional buttons to other keys.
 *  Default key is unpressed.
*/
function mapKey (keyCode, keyName) {
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
});









