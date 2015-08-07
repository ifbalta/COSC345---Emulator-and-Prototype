/**
 * Created by Isabel on 6/08/2015.
 * Something went wrong with the TypeScript port
 * so that neither KeyObjects nor GameObjects work correctly.
 *
 * This is a copy of that last file that worked.
 * Remember to write handlers for Swipe and Click events.
 */

/**
 GameObject
 * Image
 * Coordinates
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
 * KeyCode
 * KeyPressed
 */
var KeyObject = (function (){
    function KeyObject(code, pressed) {
        this.code = code;
        this.pressed = pressed;
    }
    return KeyObject;
})();
