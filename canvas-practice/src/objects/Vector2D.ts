class Vector2D {
  magnitude: number;
  private theta: number;
  private _x: number | undefined;
  private _y: number | undefined;

  constructor(magnitude: number, theta: number) {
    this.magnitude = magnitude;
    this.theta = theta;
  }

  get xComponent() {
    if (this._x === undefined) {
      this._x = this.magnitude * Math.cos(this.theta);
    }

    return this._x;
  }
  get yComponent() {
    if (this._y === undefined) {
      this._y = this.magnitude * Math.sin(this.theta);
    }

    return this._y;
  }

  static from(x: number, y: number) {
    const magnitude = Math.sqrt(x ** 2 + y ** 2);
    const absTheta = magnitude === 0 ? 0 : Math.acos(x / magnitude);
    const theta = y >= 0 ? absTheta : 2 * Math.PI - absTheta;

    return new Vector2D(magnitude, theta);
  }

  static add(a: Vector2D, b: Vector2D) {
    const n = Vector2D.from(
      a.xComponent + b.xComponent,
      a.yComponent + b.yComponent,
    );
    console.log(n.magnitude);
    return n;
  }
}

export default Vector2D;
