import p5 from "p5";
import { IVisitor } from "../Interfaces";
import { Point } from "../Point";
import { QuadTree } from "../QuadTree";
import { Rectangle } from "../Rectangle";

export class DrawingVisitor implements IVisitor {
  constructor(private p5: p5) {}

  VisitQuadTree(quadTree: QuadTree): void {
    this.p5.rectMode("center");
    this.p5.noFill();
    this.VisitRectangle(quadTree.Boundary);
    for (let index = 0; index < quadTree.Points.length; index++) {
      this.VisitPoint(quadTree.Points[index]);
    }
  }
  VisitRectangle(rect: Rectangle): void {
    this.p5.strokeWeight(1);
    this.p5.stroke(50, 50, 250);
    this.p5.rect(rect.X, rect.Y, rect.W, rect.H);
  }
  VisitPoint(point: Point): void {
    this.p5.stroke(255);
    this.p5.strokeWeight(4);
    this.p5.point(point.X, point.Y);
  }
}
