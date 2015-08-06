/**
  Emulator.ts holds all classes required to run the emulator.
*/

class GameObject {
  public x: number;
  public y : number;
  private sprite : HTMLImageElement;
  private spriteFile : string;

  constructor (x, y, spriteFile){
    this.x = x;
    this.y = y;
    this.sprite = new Image(spriteFile);
    this.spriteFile = spriteFile;
  }

   toString() : string {
    return "(" + this.x + "," + this.y + ") " + this.spriteFile + "!";
  }

}

class KeyObject {
	public code : number;
	public pressed : boolean;
	constructor (code, pressed){
		this.code = code;
		this.pressed = pressed;
	}
}

/**
    Holds all resources required to paint objects
    and raise events.
*/
class Emulator {
	public LEFT_KEY : boolean;
	public RIGHT_KEY : boolean;
	public UP_KEY : boolean;
	public DOWN_KEY: boolean;
	public keymap = { string : [KeyObject]};
	public images = {string : [GameObject]};
	private bg : HTMLImageElement;
	private mappedKeyFunction : Function;
	private clock_cycle : number;
	private canvas : HTMLCanvasElement;
	private ctxt : CanvasRenderingContext2D;

	constructor (canvas) {
		this.canvas = canvas;
		this.ctxt = canvas.getContext("2d");
	}

    /**
         Configures screen background and key handling events.
     */
	setup (bgFile, keyFunction) {
		// setup background
		this.bg = new Image(bgFile);
	    // initialize keys
		this.keymap["left"] = new KeyObject(37, false);
		this.keymap["down"] = new KeyObject(38, false);
        this.keymap["right"] = new KeyObject(39, false);
        this.keymap["up"] = new KeyObject(40, false)
		this.LEFT_KEY = this.keymap["left"].pressed;
		this.RIGHT_KEY = this.keymap["right"].pressed;
        this.UP_KEY = this.keymap["up"].pressed;
        this.DOWN_KEY = this.keymap["down"].pressed;
        // map keyListener
		this.mappedKeyFunction = keyFunction;
	}
    /**
         Allows applications to provide images
         so that the emulator can paint them.
     */
	addResource (name, x, y, imgFile) {
		this.images[name] = new GameObject(x, y, imgFile);
		return this.images[name];
	}

    /**
     *  Start listening for events.
     * */
	start () {
		this.paint();
		if (typeof this.clock_cycle != "undefined") {
			clearInterval(this.clock_cycle);
		}
		this.clock_cycle = setInterval(this.paint, 60);
	}

    /**
     *  Paints images and resets key values.
     */
    paint () {
        var gObj;
        this.ctxt.drawImage(this.bg, 0, 0);
        for (var gKey in this.images) {
            gObj = this.images[gKey];
            this.ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);
        }
        for (var kKey in this.keymap) {
            if (this.keymap[kKey].pressed){
                this.keymap[kKey].pressed = false;
            }
        }
    }

    /**
     *  Map keys. Default key is unpressed.
     */
	mapKey (keyCode, keyName, isPressed) {
        keyName = keyName.toLowerCase();
        if (typeof isPressed == "undefined") {
            isPressed = false;
        }
        if (typeof this.keymap[keyName] != "undefined") {
            this.keymap[keyName].code = keyCode;
        } else {
            this.keymap[keyName] = new KeyObject(keyCode, isPressed);
        }
    }

	/**
     *   Key presses will switch key maps from false to true
     *   and notify the application by using their mapped callback.
     */
	keyHandler (e) {
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
	}


}
var canvas = (document.getElementById("canvas"));
var ctxt = canvas.getContext("2d");
var emulator =  new Emulator(ctxt);

/**
 * Tells emulator which key was pressed.
 * */
window.addEventListener("keydown", function (e){
    emulator.keyHandler(e)
});