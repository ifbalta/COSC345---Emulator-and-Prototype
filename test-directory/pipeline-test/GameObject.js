/**
  GameObject 
    * Image
    * Coordinates
*/
var GameObject = (function () {
    function GameObject(x, y, spriteFile) {
        this.x = x;
        this.y = y;
        this.sprite = new Image(spriteFile);
    }
    return GameObject;
})();
