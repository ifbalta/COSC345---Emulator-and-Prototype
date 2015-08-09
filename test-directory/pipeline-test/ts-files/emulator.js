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

/**
    Emulator
        Holds all resources required to paint objects
        and raise events.
        - Image resources
        - Key listeners
        - Click listeners
        - Event mapping
 */
var Emulator = (function () {
    function Emulator(canvas, ctxt) {
        this.keymap = { string: [KeyObject] };
        this.images = { string: [GameObject] };
        this.canvas = canvas;
        this.ctxt = ctxt;
    }
    /**
     Configures screen background and key handling events.
     */
    Emulator.prototype.setup = function (bgFile, keyFunction) {
        // setup background
        this.bg = new Image(bgFile);
        // initialize keys
        this.keymap["left"] = new KeyObject(37, false);
        this.keymap["down"] = new KeyObject(38, false);
        this.keymap["right"] = new KeyObject(39, false);
        this.keymap["up"] = new KeyObject(40, false);
        this.LEFT_KEY = this.keymap["left"].pressed;
        this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
        // map keyListener
        this.mappedKeyFunction = keyFunction;
    };
    /**
     Allows applications to provide images
     so that the emulator can paint them.
     */
    Emulator.prototype.addResource = function (name, x, y, imgFile) {
        this.images[name] = new GameObject(x, y, imgFile);
        return this.images[name];
    };
    /**
     *  Start listening for events.
     * */
    Emulator.prototype.start = function () {
        this.paint();
        if (typeof this.clock_cycle != "undefined") {
            clearInterval(this.clock_cycle);
        }
        this.clock_cycle = setInterval(this.paint, 60);
    };
    /**
     *  Paints images and resets key values.
     */
    Emulator.prototype.paint = function () {
        var gObj;
        this.ctxt.drawImage(this.bg, 0, 0);
        for (var gKey in this.images) {
            gObj = this.images[gKey];
            this.ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);
        }
        for (var kKey in this.keymap) {
            if (this.keymap[kKey].pressed) {
                this.keymap[kKey].pressed = false;
            }
        }
    };
    /**
     *  Map keys. Default key is unpressed.
     */
    Emulator.prototype.mapKey = function (keyCode, keyName, isPressed) {
        keyName = keyName.toLowerCase();
        if (typeof isPressed == "undefined") {
            isPressed = false;
        }
        if (typeof this.keymap[keyName] != "undefined") {
            this.keymap[keyName].code = keyCode;
        }
        else {
            this.keymap[keyName] = new KeyObject(keyCode, isPressed);
        }
    };
    /**
     *   Key presses will switch key maps from false to true
     *   and notify the application by using their mapped callback.
     */
    Emulator.prototype.keyHandler = function (e) {
        var e = e.which;
        for (var kObj in this.keymap) {
            if (kObj.code == e) {
                kObj.pressed = true;
            }
        }
        this.LEFT_KEY = this.keymap["left"].pressed;
        this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
        this.mappedKeyFunction();
    };
    return Emulator;
})();

/**
 * Tell the emulator about the canvas
 * and add keyEventListener.
 * */

var canvas = $("#canvas")[0];
var ctxt = canvas.getContext("2d");
var emulator = new Emulator(canvas, ctxt);
/**
 * Tells emulator which key was pressed.
 * */
window.addEventListener("keydown", function (e) {
    emulator.keyHandler(e);
});


