import Drawable from "./Drawable";
import Movable from "./Movable2D";

class Circle implements Drawable, Movable {
  x: number;
  y: number;
  radius: number;
  color: string;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(this.x, this.y);
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Circle;
