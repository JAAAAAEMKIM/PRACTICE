import Motion2D from "./Motion2D";
import Movable2D from "./properties/Movable2D";
import RigidBody from "./properties/RigidBody";
import Vector2D from "./Vector2D";

class MovingObject2D<T extends Movable2D = Movable2D> implements RigidBody {
  instance: T;
  motion: Motion2D;
  runningRate: number;
  mass: number;

  constructor(movable: T, motion: Motion2D, runningRate: number, mass: number) {
    this.instance = movable;
    this.motion = motion;
    this.runningRate = runningRate;
    this.mass = mass;
  }

  move() {
    const { v, a } = this.motion;

    const vNew = Vector2D.add(v, a);

    const vX = (v.xComponent + vNew.xComponent) / 2;
    const posX = this.instance.x + vX * this.runningRate;

    const vY = (v.yComponent + vNew.yComponent) / 2;
    const posY = this.instance.y + vY * this.runningRate;

    this.motion.v = vNew;

    this.instance.moveTo(posX, posY);
  }
}

export default MovingObject2D;
