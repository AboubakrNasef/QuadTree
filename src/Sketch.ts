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
    for (let index = 0; index < 500; index++) {
      let p = new Point(Math.random() * 490, Math.random() * 490);
      console.log(p);
      qt.Insert(p);
    }

    console.log(qt);
  };

  p.draw = () => {
    p.background(0);
    p.ellipseMode("center");
    p.noFill();

    qt.Accept(drawVisitor);
    p.strokeWeight(1);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };

  console.log(qt);
};
