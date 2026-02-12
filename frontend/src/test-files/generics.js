'use strict'
export {}
/**
 * generics - это инструмент, позволяющий создавать функции, классы, переменные, которые могут работать с разными типами данных.
 * */
Object.defineProperty(exports, '__esModule', { value: true })
// синтаксис обычной функции
function getValue(value) {
  return value[0]
}
// синтаксис для стрелочной функции
const GetAnotherValue = function (value) {
  return value
}
function identity(arg) {
  return arg
}
// синтаксис для типа с дженериком
const myIdentity = identity
const ident1 = {
  methodFirst: function (arg) {
    return '123'
  },
  methodSecond: function (arg) {
    return 123
  },
}
const object = {
  value: '123',
  add: function (value) {
    this.value = value
  },
  get: function () {
    return this.value
  },
}
object.add('Name')
const object1 = object.get()
// Дженерики классы
const MyClass = /** @class */ (function () {
  function MyClass(name, lastName) {
    this.name = name
    this.lastName = lastName
  }
  return MyClass
})()
const classFirst = new MyClass('John')
const classSecond = new MyClass(111, 'John')
console.log(typeof classFirst.lastName)
console.log(typeof classSecond.lastName)
/**
 * Явно передавать аргумент типа при вызове в функции не нужно, он будет взят из типа переданного аргумента
 */
function greet(person, date) {
  console.log(
    'Hello '.concat(person, ', today is ').concat(date.toDateString(), '!')
  )
}
greet('Maddison', new Date())
greet(1200, new Date())
greet(true, new Date())
/**
 * Нельзя создавать универсальные enums and namespaces.
 */
// enum myEnum<T> { error
let myEnum
;(function (myEnum) {
  myEnum['first'] = 'first'
  myEnum['second'] = 'second'
})(myEnum || (myEnum = {}))
// namespace myNameSpace<T> { // error
let myNameSpace
;(function (myNameSpace) {
  myNameSpace.first = 'first'
  myNameSpace.second = 'second'
})(myNameSpace || (myNameSpace = {}))
// нельзя передавать параметр типа в статические свойства и методы
const TestStaticFieldAndGeneric = /** @class */ (function () {
  function TestStaticFieldAndGeneric() {}
  // static getDefaultValue(): Type {
  TestStaticFieldAndGeneric.getDefaultValue = function () {
    return this.defaultValue
  }
  return TestStaticFieldAndGeneric
})()
