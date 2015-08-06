/**
   I/O pipeline between browser and app.js.
*/


//Inititialize canvas

var canvas = $("#canvas")[0];
var ctxt = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();
var clock_cycle;

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
function setup(bgFile, keyFunction){
    bg.src = bgFile;
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
 *  Start listening for events.
 * */
function start() {
    paint();
    if (typeof clock_cycle != "undefined") clearInterval(clock_cycle);
    clock_cycle = setInterval(paint, 60);
}

/**
*  Paints images and resets key values.
*/
function paint () {
    ctxt.drawImage(bg, 0, 0);
    images.forEach(function (gObj) {
        ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);  
    });
     keymap.forEach(function (kObj){
        if (kObj.pressed) {
            kObj.pressed = false;
        }
    });    
}


/**
*  Map keys. Default key is unpressed.
*/
function mapKey (keyCode, keyName, isPressed) {
    keyName = keyName.toLowerCase();
    if (typeof isPressed == "undefined") {
        isPressed = false;
    }
    if (typeof keymap[keyName] != "undefined") {
        keymap[keyName].code = keyCode;
    } else {
        keymap[keyName] = new KeyObject(keyCode, isPressed);
        keymap.push(keymap[keyName]);
    }    
}

/**
 *   Key presses will switch key maps from false to true
 *   and notify the application by using their mapped callback.
 */
function keyHandler (e) {
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
    mappedKeyFunction();
}

/**
 * Tells keyHandler which key was pressed.
 * */
window.addEventListener("keydown", function (e){
    keyHandler(e)
});









