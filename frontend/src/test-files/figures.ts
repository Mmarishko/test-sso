class MyClass<T> {
  static size1 = 10
  size2 = 10
  static method1() {
    this.size1
    MyClass.size1
    const size3 = new MyClass()
    const size4 = new this()
    const size5 = MyClass
  }
}

const ex = new MyClass()

class NextClass<T> extends MyClass<T> {
  dododod() {
    // @ts-ignore
    this.size1
    this.size2
    const size3 = new MyClass()
    const consttt = this
  }
}

// задача: класс создает фигуры и считает общую площадь и периметр фигур

abstract class Figure {
  abstract getPerimeter(): number
  abstract getArea(): number
}

class Rectangle extends Figure {
  constructor(
    public width: number = 0,
    public height: number = 0
  ) {
    super()
  }

  public getArea(): number {
    return this.width * this.height
  }

  public getPerimeter(): number {
    return 2 * (this.width + this.height)
  }
}

class Triangle extends Figure {
  constructor(
    public sideA: number = 0,
    public sideB: number = 0,
    public sideC: number = 0
  ) {
    super()
  }

  public getArea(): number {
    const halfPerimeter = this.getPerimeter() / 2

    return Math.sqrt(
      halfPerimeter *
        (halfPerimeter - this.sideA) *
        (halfPerimeter - this.sideB) *
        (halfPerimeter - this.sideC)
    )
  }

  public getPerimeter(): number {
    return this.sideA + this.sideB + this.sideC
  }
}

class FiguresManager {
  static figures: Figure[] = []

  do() {
    FiguresManager.addTriangle
  }

  static addRectangle(a: number, b: number): Rectangle {
    const rectangle = new Rectangle(a, b)
    this.figures = [...this.figures, rectangle]

    return rectangle
  }

  static addTriangle(a: number, b: number, c: number): Triangle {
    const triangle = new Triangle(a, b, c)
    this.figures = [...this.figures, triangle]

    return triangle
  }

  static getTotalArea(): number {
    return this.figures.reduce((sum, figure) => sum + figure.getArea(), 0)
  }

  static getTotalPerimeter(): number {
    return this.figures.reduce((sum, figure) => sum + figure.getPerimeter(), 0)
  }
}

FiguresManager.addTriangle(9, 10, 5)
FiguresManager.addTriangle(9, 9, 9)
FiguresManager.addTriangle(6, 10, 8)

FiguresManager.addRectangle(2, 5)
FiguresManager.addRectangle(5, 10)
FiguresManager.addRectangle(15, 15)

console.log(FiguresManager.getTotalArea().toFixed(2))
console.log(FiguresManager.getTotalPerimeter().toFixed(2))
