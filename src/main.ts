// src/main.ts
import p5 from 'p5';

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400);
    };

    p.draw = () => {
        p.background(220);
        p.ellipse(p.mouseX, 200, 50, 50);
    };
};

const sketch2 = (p: p5) => {
  p.setup = () => {
      p.createCanvas(400, 400);
  };

  p.draw = () => {
      p.background(220);
      p.ellipse(20, p.mouseX, 50, 50);
  };
};
new p5(sketch);

new p5(sketch2);