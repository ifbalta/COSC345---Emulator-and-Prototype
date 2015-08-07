/**
  mockemulator.js is a copy of emulator.js
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
    GameObject.prototype.resetPos = function () {
        this.x = this.initialX;
        this.y = this.initialY;
    };
    return GameObject;
})();
var KeyObject = (function () {
    function KeyObject(code, pressed) {
        this.code = code;
        this.pressed = pressed;
    }
    return KeyObject;
})();
/**
    Holds all resources required to paint objects
    and raise events.
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
        this.keymap = { string: [KeyObject] };
        this.keymap["spacebar"] = new KeyObject(32, false);
        this.keymap["left"] = new KeyObject(37, false);
        this.keymap["down"] = new KeyObject(38, false);
        this.keymap["right"] = new KeyObject(39, false);
        this.keymap["up"] = new KeyObject(40, false);
        this.LEFT_KEY = this.keymap["left"].pressed;
        this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
        this.SPACEBAR = this.keymap["spacebar"].pressed;
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
            if (gKey != "string") {
                gObj = this.images[gKey];
                this.ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);
            }
        }
        for (var kKey in this.keymap) {
            if (kKey != "string" && this.keymap[kKey].pressed) {
                this.keymap[kKey].pressed = false;
            }
        }
    };
    /**
     *  Map keys. Default key is unpressed.
     */
    Emulator.prototype.mapKey = function (keyName, keyCode, isPressed) {
        if (typeof isPressed == "undefined") {
            isPressed = false;
        }
        if (typeof this.keymap[keyName] != "undefined") {
            // remapping a directional button or spacebar
            this.keymap[keyName].code = keyCode;
        }
        else {
            // custom key, return instance
            this.keymap[keyName] = new KeyObject(keyCode, isPressed);
            return this.keymap[keyName];
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
    /**
     * Resets emulator state to defaults.
     * */
    Emulator.prototype.resetEmulator = function () {
        this.images = { string: [GameObject] }; // empty images
        // reset keys
        this.keymap = { string: [KeyObject] };
        this.keymap["spacebar"] = new KeyObject(32, false);
        this.keymap["left"] = new KeyObject(37, false);
        this.keymap["down"] = new KeyObject(38, false);
        this.keymap["right"] = new KeyObject(39, false);
        this.keymap["up"] = new KeyObject(40, false);
        this.LEFT_KEY = this.keymap["left"].pressed;
        this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
        this.SPACEBAR = this.keymap["spacebar"].pressed;
    };
    /**
     * Resets objects.
     * */
    Emulator.prototype.resetImages = function () {
        for (var gKey in this.images) {
            this.images[gKey].resetPos;
        }
    };
    return Emulator;
})();
var canvas = $("canvas")[0];

if (typeof canvas == "undefined") { // in case browser doesn't have a canvas
    canvas = document.createElement('canvas');
    canvas.id     = "testcanvas";
    canvas.width  = 320;
    canvas.height = 320;
    document.body.appendChild(canvas);
}

var ctxt = canvas.getContext("2d");
var emulator = new Emulator(canvas, ctxt);
/**
 * Tells emulator which key was pressed.
 * */
window.addEventListener("keydown", function (e) {
    emulator.keyHandler(e);
});
//# sourceMappingURL=Emulator.js.map