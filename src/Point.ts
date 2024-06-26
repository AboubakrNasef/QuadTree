import { IShape, IVisitor } from "./Visitors/Interfaces";

export class Point implements IShape {
  constructor(public X: number, public Y: number) {}
  Accept(visitor: IVisitor): boolean {
    visitor.VisitPoint(this);
    return true;
  }
}
