import Drawable from "../objects/Drawable";

class ElementState {
  private elements: Drawable[];

  constructor() {
    this.elements = new Array<Drawable>();
  }

  addElement(element: Drawable) {
    this.elements.push(element);
  }

  reset() {
    this.elements = [];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.elements.forEach((element) => element.draw(ctx));
  }
}

export default ElementState;
