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
        this.code = code,
        this.pressed = pressed;        
    }
    return KeyObject;
})();
