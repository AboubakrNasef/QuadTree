import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import { IShape, IVisitor } from "./Interfaces";

export class QuadTree implements IShape {
  public Points: Point[] = [];
  public NorthWest!: QuadTree;
  public NorthEast!: QuadTree;
  public SouthWest!: QuadTree;
  public SouthEast!: QuadTree;

  divided: boolean = false;

  constructor(public Boundary: Rectangle, public Capacity: number) {}

  public Insert(point: Point): boolean {
    if (!this.Boundary.Contains(point)) {
      return false;
    }
    if (this.Points.length < this.Capacity) {
      this.Points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.Subdivide();
      }
      if (this.NorthEast.Insert(point)) {
        return true;
      }
      if (this.NorthWest.Insert(point)) {
        return true;
      }
      if (this.SouthEast.Insert(point)) {
        return true;
      }
      if (this.SouthWest.Insert(point)) {
        return true;
      }
    }
  }

  Subdivide() {
    let neBound = new Rectangle(
      this.Boundary.X + this.Boundary.W / 4,
      this.Boundary.Y - this.Boundary.H / 4,
      this.Boundary.W / 2,
      this.Boundary.H / 2
    );
    let nwBound = new Rectangle(
      this.Boundary.X - this.Boundary.W / 4,
      this.Boundary.Y - this.Boundary.H / 4,
      this.Boundary.W / 2,
      this.Boundary.H / 2
    );
    let seBound = new Rectangle(
      this.Boundary.X + this.Boundary.W / 4,
      this.Boundary.Y + this.Boundary.H / 4,
      this.Boundary.W / 2,
      this.Boundary.H / 2
    );
    let swBound = new Rectangle(
      this.Boundary.X - this.Boundary.W / 4,
      this.Boundary.Y + this.Boundary.H / 4,
      this.Boundary.W / 2,
      this.Boundary.H / 2
    );

    this.NorthEast = new QuadTree(neBound, this.Capacity);
    this.NorthWest = new QuadTree(nwBound, this.Capacity);
    this.SouthEast = new QuadTree(seBound, this.Capacity);
    this.SouthWest = new QuadTree(swBound, this.Capacity);

    this.divided = true;
  }

  Accept(visitor: IVisitor): boolean {
    visitor.VisitQuadTree(this);
    if (this.divided) {
      this.NorthEast.Accept(visitor);
      //visitor.VisitQuadTree(this.NorthEast);
      this.NorthWest.Accept(visitor);
      this.SouthEast.Accept(visitor);
      this.SouthWest.Accept(visitor);
    }
    return true;
  }
}
