/**
   I/O pipeline between browser and app.js.
*/


//Inititialize canvas
var canvas = $("#canvas")[0];
var ctxt = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

// image resources
var bg = new Image();
var images = []; // GameObject array

// key maps
var keymap = {};
var LEFT_KEY = false;
var RIGHT_KEY = false;
var UP_KEY = false;
var DOWN_KEY = false;


/**
   Gives access to images[]
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
function setup(bgFile){
    bg.src = bgFile;
    bg.height=h;
    bg.width=w;
    // initialize keymap
    keymap["left"] = 37;
    keymap["down"] = 38;
    keymap["right"] = 39;
    keymap["up"] = 40
    keymap.push(keymap["left"]);
    keymap.push(keymap["right"]);
    keymap.push(keymap["down"]);
    keymap.push(keymap["up"]);
    
}

// start clock
function init () {
    paint();
    if (typeof clock_cycle != "undefined") clearInterval(clock_cycle);
    clock_cycle = setInterval(paint, 60);
}

/**
   Paints images and resets key values.
*/
function paint () {
    ctxt.drawImage(bg, 0, 0);
    images.forEach(function (gObj) {
        ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);  
    });
     keymap.forEach(function (kObj){
        if (kObj.code == e) {
            kObj.pressed = false;
        }
    });    
}


/**
   Map keys. Default key is unpressed.
*/
function mapKey (keyCode, keyName, isPressed = false) {
    keyName = keyName.toLowerCase();
    if (typeof keymap[keyName] != "undefined") {
        keymap[keyName].code = keyCode;
    } else {
        keymap[keyName] = new KeyObject(keyCode, isPressed);
        keymap.push(keymap[keyName]);
    }    
}

window.addEventListener("keydown", function (evt) {
    var e = e.which;
    keymap.forEach(function (kObj){
        if (kObj.code == e) {
            kObj.pressed = true;
        }
    });
});









