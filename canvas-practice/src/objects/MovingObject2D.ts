import Motion2D from "./Motion2D";
import Movable2D from "./Movable2D";
import Vector2D from "./Vector2D";

class MovingObject2D {
  instance: Movable2D;
  motion: Motion2D;
  tick: number;

  constructor(movable: Movable2D, motion: Motion2D, tick: number) {
    this.instance = movable;
    this.motion = motion;
    this.tick = tick;
  }

  move() {
    const { v, a } = this.motion;

    const vNew = Vector2D.add(v, a);

    const vX = (v.xComponent + vNew.xComponent) / 2;
    const posX = this.instance.x + vX * this.tick;

    const vY = (v.yComponent + vNew.yComponent) / 2;
    const posY = this.instance.y + vY * this.tick;

    this.motion.v = vNew;

    this.instance.moveTo(posX, posY);
  }
}

export default MovingObject2D;
