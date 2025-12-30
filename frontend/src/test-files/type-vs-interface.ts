/**
 * types vs interface
 */
interface IBird {
  wings: number
}

type TBird = {
  wings: number
}

// используются для описания формы объекта
const birdOne: IBird = { wings: 2 }
const birdTwo: TBird = { wings: 2 }

interface ISingBird {
  sing: boolean
}

/**
 * 1. типы закрыты, а интерфейсы открыты к расширению повторным объявлением
 */
type TFirst = {
  firstField: string
}

// error: Duplicate identifier 'First'

// type TFirst = {
//   secondField: string
// }

interface IFirst {
  firstField: string
}

interface IFirst {
  secondField: string
}

const first11: IFirst = {
  firstField: '123',
  secondField: 'foo',
}

const second22: TFirst = {
  firstField: '123',
}

/**
 * 2. Типы и интерфейсы можно расширять, но синтаксис отличается.
 */
type TExtBird = TBird & ISingBird //  тип можно объединить с интерфейсом
type TExtBird1 = IBird & ISingBird // можно интерфейс объединить с интерфейсом

const testExtBird: TExtBird = {
  sing: true,
  wings: 2,
}

const testExtBird1: TExtBird1 = {
  sing: true,
  wings: 2,
}

// можно интерфейс расширять типом
interface IOwl extends TBird {
  night: boolean
}

const testIOwl: IOwl = {
  night: true,
  wings: 2,
}

// можно интерфейс расширять интерфейсом
interface IGoose extends IBird {
  home: boolean
}

const testIGoose: IGoose = {
  home: true,
  wings: 2,
}

/**
 * 3. В отличии от интерфейсов, псевдонимы типов могут быть использованы для других типов
 */
type MyNumber = number // тип можно создать из примитивных типов
type SayHello = 'hello' | 'Hi' // тип можно создать как пересечение значений
type TData = [number, number, string] // кортеж
type TData1 = [MyNumber, SayHello, IGoose]

/**
 * 4. нельзя расширить (extends) / реализовывать (implements) класс от типа, объявленного как объединение (union) или от примитивных типов
 */
// class Words implements SayHello {} // нельзя имплементировать(реализовывать) класс от типа, объявленного как набор примитивных значений
// class Numbers implements MyNumber {} // нельзя имплементировать(реализовывать) класс от примитивных типов
// class Numbers_2 implements number {} // нельзя имплементировать(реализовывать) класс от примитивных типов
// class Numbers3 implements string {} // нельзя имплементировать(реализовывать) класс от примитивных типов

/**
 *  Класс может имплеменировать интерфейс или тип
 */
class Numbers1 implements IBird {
  wings: number = 123
  constructor(_wings: number) {
    this.wings = _wings
  }
}

class Numbers2 implements TBird {
  wings: number
  constructor(_wings: number) {
    this.wings = _wings
  }
}
