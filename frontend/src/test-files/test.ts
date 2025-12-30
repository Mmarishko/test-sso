// исправить ошибку в типах
type TArray = number | { foo: number }

const arr: Array<number | { foo: number }> = [1, { foo: 2 }, 3, 4, { foo: 2 }]
const arr11: TArray[] = [1, { foo: 2 }, 3, 4, { foo: 2 }]
const arr1: [number, { foo: number }, string, number, ...number[]] = [
  1,
  { foo: 2 },
  '3',
  4,
  4,
  4,
]
const arr2 = [1, { foo: 2 }, 3, 4] as const

// const [first, second, third] = arr;
// const [first, { foo: second }, third] = arr; // error
// const [first11, { foo: second11 }, third11, ...rest1] = arr11; // error
const [first1, { foo: second1 }, third1, ...rest] = arr1
const [first2, { foo: second2 }, third2] = arr2

arr[4] = 45
arr1[4] = 45
// arr2[2] = 45;
//@ts-expect-error
arr2.push(45)

console.log(arr)
console.log(arr1)
console.log(arr2)

// дженерики
// на входе массив чисел или строк, на выходе первый элемент массива

function getFirstElement<T>(arr: Array<T>): T {
  return arr[0]
}

const getLastElement = <T extends number | string>(arr: Array<T>): T => {
  return arr[arr.length - 1]
}

console.log(getFirstElement([1, 2, 3]))
console.log(getLastElement([1, 2, 3]))
console.log(getFirstElement(['1', '2', '3']))
console.log(getLastElement(['1', '2', '3']))
console.log(getFirstElement([{ k: 1 }, { k: 45 }, { k: 78 }]))
// console.log(getLastElement([{ k: 1 }, { k: 45 }, { k: 78 }])); //error

type TSomeUnionTypes<T, U> = T | U

interface ISomeTypes<T, U> {
  first: T
  last: U
}

const getElement = <T extends TSomeUnionTypes<string, number>>(
  arr: Array<T>
): T => {
  return arr[0]
}

const getElement1 = <T extends ISomeTypes<string, number>>(
  arr: Array<T>
): T => {
  return arr[0]
}

const getElementUnion = (arg: Array<number | string>): number | string => {
  return arg[0]
}

console.log(getElement([1, 2, 3]))
console.log(getElement(['1', '2', '3']))
// console.log(getElement([{ k: 1 }, { k: 45 }, { k: 78 }])); // error
