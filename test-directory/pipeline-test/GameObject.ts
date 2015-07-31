/**
  GameObject.ts
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