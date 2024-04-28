import { Point } from "../Point";
import { QuadTree } from "../QuadTree";
import { Rectangle } from "../Rectangle";

interface IVisitable {
  Accept(visitor: IVisitor): boolean;
}

export interface IShape extends IVisitable {}

export interface IVisitor {
  VisitQuadTree(quadTree: QuadTree): void;
  VisitRectangle(rect: Rectangle): void;
  VisitPoint(point: Point): void;
}
