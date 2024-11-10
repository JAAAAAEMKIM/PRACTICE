import MovingObject2D from "../MovingObject2D";
import Collision from "./Collision";

class InelasticCollision implements Collision {
  isCollapsing(el1: MovingObject2D, el2: MovingObject2D) {
    return true;
  }
  handleCollision(elements: MovingObject2D[]): void {
    const afterCollision = [...elements];
    for (let i = 0; i < elements.length; i++) {
      const impactVectors = [];
      for (let j = 0; j < elements.length; j++) {
        if (!this.isCollapsing(elements[i], elements[j])) continue;
        const impact = 

        
      }
    }
  }
}

export default InelasticCollision;
