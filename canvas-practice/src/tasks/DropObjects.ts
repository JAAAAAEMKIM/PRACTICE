import Circle from "../objects/Circle";
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
  movingObjects: MovingObject2D[];

  constructor(uiState: UiState, tick: number) {
    this.uiState = uiState;
    this.elements = [];
    this.movingObjects = [];

    const v0 = Vector2D.from(0.1, 0);
    const g = Vector2D.from(0, 0.0098);
    const rect = new Rect(0, 0, 20, 20, "#fff");
    const circle = new Circle(0, 100, 10, "#125ED6");

    const movingRect = new MovingObject2D(rect, new Motion2D(v0, g), tick);
    const movingCircle = new MovingObject2D(circle, new Motion2D(v0, g), tick);

    this.elements.push(rect);
    this.elements.push(circle);
    this.movingObjects.push(movingRect);
    this.movingObjects.push(movingCircle);
  }

  runTick(ctx: CanvasRenderingContext2D) {
    this.uiState.erase(ctx);

    this.movingObjects.forEach((el) => el.move());
    this.elements.forEach((el) => el.draw(ctx));
    ctx.save();
  }
}

export default DropSquare;
