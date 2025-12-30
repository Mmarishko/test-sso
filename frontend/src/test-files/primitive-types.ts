//
// 2. new base types for TS
function myAny(arg: any): any {
  return 'taratata'
}

function myVoid(arg: string): void {
  console.log(arg)
  // nothing returned
}

function myNever(): never {
  throw new Error('something went wrong')
  //never complete
}

function myUnknown(arg: unknown): unknown {
  return arg
}

myAny(123)
myAny('123')

myVoid('123')

// myNever();

myUnknown({ a: '123' })
myUnknown('123')

const myType = typeof ['a', 'as']
const myTypeMyVoid = typeof myVoid

console.log('1', myType) // -> object
console.log('2', myTypeMyVoid) // -> function
