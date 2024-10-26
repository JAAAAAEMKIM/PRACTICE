import Drawable from "../objects/Drawable";
import Motion2D from "../objects/Motion2D";
import MovingObject2D from "../objects/MovingObject2D";
import Rect from "../objects/Rect";
import Vector2D from "../objects/Vector2D";
import UiState from "../states/UiState";
import { Task } from "./Task";

class DropSquare implements Task {
  uiState: UiState;
  elements: Drawable[];
  rect1: Rect;
  movingObj: MovingObject2D;

  constructor(uiState: UiState) {
    this.uiState = uiState;
    this.elements = [];

    const v0 = Vector2D.from(0.1, 0);
    const g = Vector2D.from(0, 0.0098);
    this.rect1 = new Rect(0, 0, 20, 20, "#fff");
    this.movingObj = new MovingObject2D(this.rect1, new Motion2D(v0, g));

    this.elements.push(this.rect1);
  }

  runTick(ctx: CanvasRenderingContext2D, tick: number) {
    this.uiState.erase(ctx);
    this.movingObj.move(tick);

    this.elements.forEach((el) => el.draw(ctx));
    ctx.save();
  }
}

export default DropSquare;
