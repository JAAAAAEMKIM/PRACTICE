import Drawable from "../properties/Drawable";
import Movable from "../properties/Movable2D";

class Rect implements Drawable, Movable {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(this.x, this.y);
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.moveTo(this.x + this.width, this.y);
    ctx.moveTo(this.x + this.width, this.y + this.height);
    ctx.moveTo(this.x, this.y + this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  changeWidth(width: number) {
    this.width = width;
  }

  changeHeight(height: number) {
    this.height = height;
  }

  static isRect(movable: Movable): movable is Rect {
    return "width" in movable && "height" in movable;
  }
}

export default Rect;
