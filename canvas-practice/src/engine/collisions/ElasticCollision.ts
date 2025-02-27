import Circle from "../figures/Circle";
import Rect from "../figures/Rect";
import MovingObject2D from "../MovingObject2D";
import Vector2D from "../Vector2D";
import Collision from "./Collision";

class ElasticCollision implements Collision {
  e: number = 1;

  calcSpeedAfterCollision1D(m1: number, v1: number, m2: number, v2: number) {
    return ((1 + this.e) * m2 * v2 + v1 * (m1 - this.e * m2)) / (m1 + m2);
  }

  calcSpeedAfterCollision2D(
    m1: number,
    v1: Vector2D,
    m2: number,
    v2: Vector2D,
  ) {
    return Vector2D.from(
      this.calcSpeedAfterCollision1D(m1, v1.xComponent, m2, v2.xComponent),
      this.calcSpeedAfterCollision1D(m1, v1.yComponent, m2, v2.yComponent),
    );
  }
  rectToRectCollision(el1: MovingObject2D<Rect>, el2: MovingObject2D<Rect>) {
    const isColliding =
      el1.instance.x < el2.instance.x + el2.instance.width &&
      el2.instance.x < el1.instance.x + el1.instance.width &&
      el1.instance.y < el2.instance.y + el2.instance.height &&
      el2.instance.y < el1.instance.y + el1.instance.height;

    if (!isColliding) return;

    const m1 = el1.mass;
    const v1 = el1.motion.v;

    const m2 = el2.mass;
    const v2 = el2.motion.v;

    const nv1 = this.calcSpeedAfterCollision2D(m1, v1, m2, v2);
    const nv2 = this.calcSpeedAfterCollision2D(m2, v2, m1, v1);

    el1.motion.v = nv1;
    el2.motion.v = nv2;
  }

  rectToCircleCollision(el1: MovingObject2D<Rect>, el2: MovingObject2D<Circle>) {

    const closestX = Math.max(el1.instance.x, Math.min(el2.instance.x, el1.instance.x + el1.instance.width));
    const closestY = Math.max(el1.instance.y, Math.min(el2.instance.y, el1.instance.y + el1.instance.height));
    const dx = el2.instance.x - closestX;
    const dy = el2.instance.y - closestY;
    const isColliding = dx * dx + dy * dy < el2.instance.radius * el2.instance.radius;
    
    if (el1.mass > 100) console.log(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)), isColliding)

    if (!isColliding) return;

    const m1 = el1.mass;
    const v1 = el1.motion.v;

    const m2 = el2.mass;
    const v2 = el2.motion.v;

    const nv1 = this.calcSpeedAfterCollision2D(m1, v1, m2, v2);
    const nv2 = this.calcSpeedAfterCollision2D(m2, v2, m1, v1);

    el1.motion.v = nv1;
    el2.motion.v = nv2;
  }

  collide(el1: MovingObject2D, el2: MovingObject2D) {
    if (Rect.isRect(el1.instance) && Rect.isRect(el2.instance)) {
      return this.rectToRectCollision(
        el1 as MovingObject2D<Rect>,
        el2 as MovingObject2D<Rect>,
      );
    }

    if (Rect.isRect(el1.instance) && Circle.isCircle(el2.instance)) {
      return this.rectToCircleCollision(el1 as MovingObject2D<Rect>, el2 as MovingObject2D<Circle>);
    }

    if (Rect.isRect(el2.instance) && Circle.isCircle(el1.instance)) {
      return this.rectToCircleCollision(el2 as MovingObject2D<Rect>, el1 as MovingObject2D<Circle>);
    }
  }

  handleCollision(elements: MovingObject2D[]): void {
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        this.collide(elements[i], elements[j]);
      }
    }
  }
}

export default ElasticCollision;
