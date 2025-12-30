/**
 * generics - это инструмент, позволяющий создавать функции, классы, переменные, которые могут работать с разными типами данных.
 * */

// синтаксис обычной функции
function getValue<Type>(value: Type[]): Type {
  return value[0]
}

// синтаксис для стрелочной функции
const GetAnotherValue = <Type>(value: Type): Type => {
  return value
}

function identity<Type>(arg: Type): Type {
  return arg
}

// синтаксис для типа с дженериком
const myIdentity: { <Type>(arg: Type): Type } = identity

type IMyIdentity<Type, U> = {
  methodFirst: (arg: Type) => Type
  methodSecond: (arg: U) => U
}

type IMyIdentity2 = {
  methodFirst: <T extends string>(arg: T) => T
  methodSecond: <U extends number>(arg: U) => U
}

const ident1: IMyIdentity<string, number> = {
  methodFirst: (arg) => {
    return '123'
  },
  methodSecond: (arg) => {
    return 123
  },
}

type Str = string
type NumbT = number

// const ident2: IMyIdentity2 = {
//   methodFirst: <Str>(arg) => {
//     return arg.toString()
//   },
//   methodSecond: <NumbT>(arg) => {
//     return +arg
//   },
// }

// дженерики-интерфейс
interface SomeType<T> {
  value: T
  add: (value: T) => void
  get: () => T
}

const object: SomeType<string> = {
  value: '123',
  add: function (value): void {
    this.value = value
  },
  get: function (): string {
    return this.value
  },
}

object.add('Name')
const object1 = object.get()

// Дженерики классы

class MyClass<T> {
  public name
  public lastName?: T

  constructor(name: T, lastName?) {
    this.name = name
    this.lastName = lastName
  }
}

const classFirst = new MyClass('John')
const classSecond = new MyClass(111, 'John')

console.log(typeof classFirst.lastName)
console.log(typeof classSecond.lastName)

/**
 * Явно передавать аргумент типа при вызове в функции не нужно, он будет взят из типа переданного аргумента
 */
function greet<T, U extends Date>(person: T, date: U) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

greet('Maddison', new Date())
greet(1200, new Date())
greet(true, new Date())

/**
 * Нельзя создавать универсальные enums and namespaces.
 */

// enum myEnum<T> { error
enum myEnum {
  first = 'first',
  second = 'second',
}

export {}
// namespace myNameSpace<T> { // error
namespace myNameSpace {
  export const first: string = 'first'
  export const second: string = 'second'
}

// нельзя передавать параметр типа в статические свойства и методы

class TestStaticFieldAndGeneric<Type> {
  // static defaultValue: Type
  static defaultValue: string

  // static getDefaultValue(): Type {
  static getDefaultValue(): string {
    return this.defaultValue
  }
}
