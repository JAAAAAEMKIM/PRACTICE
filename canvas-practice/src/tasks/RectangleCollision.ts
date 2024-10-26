import Drawable from "../objects/Drawable";
import Rect from "../objects/Rect";
import UiState from "../states/UiState";
import { Task } from "./Task";

class RectangleCollision implements Task {
  uiState: UiState;
  elements: Drawable[];
  rect1: Rect;
  rect2: Rect;

  constructor(uiState: UiState) {
    this.uiState = uiState;
    this.elements = [];

    this.rect1 = new Rect(0, 0, 100, 150, "#fff");
    this.rect2 = new Rect(uiState.width - 100, 0, 100, 150, "#999");

    this.elements.push(this.rect1);
    this.elements.push(this.rect2);
  }

  detectCollision() {
    return true;
  }

  runTick(ctx: CanvasRenderingContext2D) {
    this.uiState.erase(ctx);
    this.rect1.moveTo(this.rect1.x + 1, this.rect1.y);
    this.rect2.moveTo(this.rect2.x - 1, this.rect2.y);

    this.elements.forEach((el) => el.draw(ctx));
    ctx.save();
  }
}

export default RectangleCollision;
