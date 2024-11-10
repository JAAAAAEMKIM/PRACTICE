import MovingObject2D from "../MovingObject2D";

interface Collision {
  e: number;
  handleCollision(elements: MovingObject2D[]): void;
}

export default Collision;
