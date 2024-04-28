// src/main.ts
import p5 from "p5";
import { QuadTree } from "./QuadTree";
import { Rectangle } from "./Rectangle";
import { Point } from "./Point";
import { DrawingVisitor } from "./Visitors/DrawingVisitor";

let boundary = new Rectangle(250, 250, 500, 500);
let qt = new QuadTree(boundary, 4);

export const sketch = (p: p5) => {
  let drawVisitor = new DrawingVisitor(p);
  p.setup = () => {
    p.createCanvas(500, 500);
    p.frameRate(60);
    p.ellipseMode("center");
    p.noFill();
    for (let index = 0; index < 1000; index++) {
      let p = new Point(Math.random() * 490, Math.random() * 490);
      //console.log(p);
      qt.Insert(p);
    }
  };

  p.mousePressed = () => {
    let point = new Point(p.mouseX, p.mouseY);
    qt.Insert(point);
  };
  p.draw = () => {
    p.background(0);
    qt.Accept(drawVisitor);
    let points: Point[] = [];
    let range = new Rectangle(p.mouseX, p.mouseY, 50, 50);
    p.stroke(0, 255, 0);
    p.rectMode("center");
    const start = new Date().getMilliseconds();

    qt.Query(range, points);

    let elapsed = new Date().getMilliseconds() - start;
    console.log(elapsed);

    for (const point of points) {
      p.strokeWeight(5);
      p.point(point.X, point.Y);
    }
    p.strokeWeight(2);
    p.rect(p.mouseX, p.mouseY, 50, 50);
  };

  // console.log(qt);
};
