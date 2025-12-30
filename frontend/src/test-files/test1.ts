//
interface IPoint {
  x: number
  y: number
}

function logPoint(p: IPoint, ...args: number[]): void {
  // console.log('arguments', arguments);
  console.log('args', args)
  console.log(`x: ${p.x}; y: ${p.y}`)
}

const point = { x: 12, y: 14 }
const point1 = { x: 12, y: 14, z: 67 }
const point2 = { x: 12, y: 14, width: 120, heigth: 567 }
const point3 = { x: 12, width: 120 }
const point4 = { xxx: 12, yyy: 14 }

logPoint(point, 1)
logPoint(point1)
logPoint(point2)
// logPoint(point3, 90); // error
// logPoint(point4); // error

export class VirtualPoint<T> {
  x: T
  y: number

  constructor(x: T, y: number) {
    this.x = x
    this.y = y
  }
}

const newPoint = new VirtualPoint(12, 34)
const newPoint1 = new VirtualPoint('12', 34)

logPoint(newPoint)
