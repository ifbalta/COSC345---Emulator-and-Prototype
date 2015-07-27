/**
  GameObject.ts
*/

class GameObject {
  public x: number;
  public y : number;
  private sprite : HTMLImageElement;
  
  constructor (x, y, spriteFile){
    this.x = x;
    this.y = y;
    this.sprite = new Image(spriteFile);
  }

}