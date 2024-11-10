import Vector2D from "./Vector2D";

class Motion2D {
  v: Vector2D;
  v0: Vector2D;
  a: Vector2D;

  constructor(v0: Vector2D, a = new Vector2D(0, 0)) {
    this.v = v0;
    this.v0 = v0;
    this.a = a;
  }
}

export default Motion2D;
