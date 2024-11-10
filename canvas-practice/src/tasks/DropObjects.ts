import Circle from "../engine/figures/Circle";
import Drawable from "../engine/properties/Drawable";
import Motion2D from "../engine/Motion2D";
import MovingObject2D from "../engine/MovingObject2D";
import Rect from "../engine/figures/Rect";
import Vector2D from "../engine/Vector2D";
import { Task } from "./Task";
import { Config } from "../world";
import Collision from "../engine/collisions/Collision";

class DropSquare implements Task {
  config: Config;
  elements: Drawable[];
  movingObjects: MovingObject2D[];
  collision: Collision;

  constructor(config: Config, collision: Collision, runningRate: number = 1) {
    this.config = config;
    this.collision = collision;
    this.elements = [];
    this.movingObjects = [];

    const v0 = Vector2D.from(0.1, 0);
    const v02 = Vector2D.from(0.2, 0);

    const g = Vector2D.from(0, 0.0098);
    const rect = new Rect(200, 0, 20, 20, "#fff");
    const rect2 = new Rect(300, 0, 40, 40, "pink");
    const circle = new Circle(0, 100, 10, "yellow");
    const ground = new Rect(0, config.height - 20, config.width, 20, "green");

    const groundObject = new MovingObject2D(
      ground,
      new Motion2D(Vector2D.from(0, 0), Vector2D.from(0, 0)),
      runningRate,
      1000000000000,
    );
    const movingRect = new MovingObject2D(
      rect,
      new Motion2D(v0, g),
      runningRate,
      3,
    );
    const movingRect2 = new MovingObject2D(
      rect2,
      new Motion2D(v02, g),
      runningRate,
      30,
    );
    const movingCircle = new MovingObject2D(
      circle,
      new Motion2D(v0, g),
      runningRate,
      3,
    );

    this.elements.push(rect);
    this.elements.push(rect2);
    this.elements.push(circle);
    this.elements.push(ground);
    this.movingObjects.push(movingRect);
    this.movingObjects.push(movingRect2);
    this.movingObjects.push(movingCircle);
    this.movingObjects.push(groundObject);
  }

  runTick(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.config.width, this.config.height);

    this.movingObjects.forEach((el) => el.move());
    this.collision.handleCollision(this.movingObjects);
    this.elements.forEach((el) => el.draw(ctx));
    ctx.save();
  }
}

export default DropSquare;
