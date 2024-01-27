import { IShape, IVisitor } from "./Interfaces";
import { Point } from "./Point";

export class Rectangle implements IShape {
  Contains(point: Point): boolean {
    return (
      point.X >= this.X - this.W &&
      point.X <= this.X + this.W &&
      point.Y >= this.Y - this.H &&
      point.Y <= this.Y + this.H
    );
  }
  constructor(
    public X: number,
    public Y: number,
    public W: number,
    public H: number
  ) {}
  Accept(visitor: IVisitor): boolean {
    visitor.VisitRectangle(this);
    return true;
  }
}
