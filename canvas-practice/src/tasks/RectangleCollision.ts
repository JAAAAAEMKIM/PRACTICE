import Drawable from "../engine/properties/Drawable";
import Rect from "../engine/figures/Rect";
import { Task } from "./Task";
import { Config } from "../world";

class RectangleCollision implements Task {
  elements: Drawable[];
  rect1: Rect;
  rect2: Rect;
  config: Config;

  constructor(config: Config) {
    this.elements = [];
    this.config = config;

    this.rect1 = new Rect(0, 0, 100, 150, "#fff");
    this.rect2 = new Rect(config.width - 100, 0, 100, 150, "#999");

    this.elements.push(this.rect1);
    this.elements.push(this.rect2);
  }

  runTick(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.rect1.moveTo(this.rect1.x + 1, this.rect1.y);
    this.rect2.moveTo(this.rect2.x - 1, this.rect2.y);

    this.elements.forEach((el) => el.draw(ctx));
    ctx.save();
  }
}

export default RectangleCollision;
