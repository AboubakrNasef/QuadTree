import { IShape, IVisitor } from "./Visitors/Interfaces";
import { Point } from "./Point";

export class Rectangle implements IShape {
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(
    public X: number,
    public Y: number,
    public W: number,
    public H: number
  ) {
    this.left = X - W / 2;
    this.right = X + W / 2;
    this.top = Y - H / 2;
    this.bottom = Y + H / 2;
  }

  Contains(point: Point): boolean {
    return (
      this.left <= point.X &&
      point.X <= this.right &&
      this.top <= point.Y &&
      point.Y <= this.bottom
    );
  }

  Intersects(rect: Rectangle): boolean {
    return !(
      this.right < rect.left ||
      rect.right < this.left ||
      this.bottom < rect.top ||
      rect.bottom < this.top
    );
  }

  Accept(visitor: IVisitor): boolean {
    visitor.VisitRectangle(this);
    return true;
  }
}
