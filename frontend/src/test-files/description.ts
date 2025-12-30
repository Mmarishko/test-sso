/* Задание:
    Напишите TypeScript типы для этого кода
*/
interface Vector {
  x: number
  y: number
  length: number
  angle: number
}

declare class MyVector {
  x: number
  y: number
  length: number
  angle: number
  constructor(x: number, y: number)
  add: (vector: Vector) => Vector
  sub: (vector: Vector) => Vector
  negate: () => Vector
  dot: (vector: Vector) => number
}

declare class NVector {
  zero: Vector
  up: Vector
  down: Vector
  left: Vector
  right: Vector

  equals(a: number, b: number): boolean
  isVector(obj: unknown): obj is Vector
}

declare function fcreateVector(x: number, y: number): Vector
declare function fcreateVector(xy: [number, number]): Vector
declare function fcreateVector(xy: { x: number; y: number }): Vector

class Vector implements NVector {
  constructor(x, y) {
    super()
    this.x = x
    this.y = y
    this.length = Math.sqrt(x * x + y * y)
    this.angle = Math.atan2(y, x)
  }
  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }
  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }
  negate() {
    return new Vector(-this.x, -this.y)
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  static zero: Vector
  static up: Vector
  static down: Vector
  static left: Vector
  static right: Vector

  // static equals(a: Vector, b: Vector): boolean
  // static isVector(obj: unknown): obj is Vector
}

Vector.zero = new Vector(0, 0)
Vector.up = new Vector(0, 1)
Vector.down = new Vector(0, -1)
Vector.left = new Vector(-1, 0)
Vector.right = new Vector(1, 0)

Vector.equals = function (a, b) {
  return a.x === b.x && a.y === b.y
}

Vector.isVector = function (obj) {
  return obj instanceof Vector
}

function createVector<T extends number>(...args: T[]): Vector {
  if (args.length === 2) {
    return new Vector(args[0], args[1])
  }
  if (Array.isArray(args[0])) {
    return new Vector(args[0][0], args[0][1])
  }
  return new Vector(args[0].x, args[0].y)
}
