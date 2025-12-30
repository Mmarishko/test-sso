import { VirtualPoint } from './test1'

// вызов как метод объекта
const user1 = {
  name: 'Alice',
  greet() {
    console.log('1', this.name) // "Alice"
  },
  greet1: () => {
    console.log('111', this.name) // undefined,  контекст из внешнего окружения
  },
}

user1.greet() // 1 "Alice"
user1.greet1() // 111  undefined
user1.greet1.call('Jane') // 111  undefined, нельзя привязать контекст стрелочной функции
console.log('2', user1.greet()) // this → "Alice", но функция ничего не возвращает, поэтому в консоли сначала '1' "Alice", после 2 undefined

// вызов как обычная функция
function sayHi() {
  console.log('3', this) // В браузере → window; в node -> global, в strict mode → undefined (по умолчанию в es6)
}
sayHi()

const userGreet = user1.greet // 1 this → undefined, мы отделили метод от объекта:
console.log('4', userGreet()) // this → undefined вызов как обычная функция

// вызов как новый экземпляр
function User(name) {
  this.name = name // this — новый экземпляр объекта
}
const alice = new User('Alice') // this → alice — новый экземпляр объекта

// стрелочная функция - контекст из внешнего окружения (области видимости)
const user2 = {
  name: 'Alice',
  greet: () => {
    console.log('5', this.name) // undefined! this — не user, а внешний контекст
  },
  greet_() {
    console.log('51', this.name) // Alice! this — user
  },
  // фактичестки это тоже самое, что вызывать this без обертки стрелочной функции
  // greet1: console.log(this.name),
}
user2.greet() // 5 undefined
user2.greet_() // 51 Alice

// способы привязки
const arg1 = 'hello'

user2.greet.call(alice) // вызывает функцию с this и аргументами через запятую (alice, arg1) // 5 undefined
user2.greet.apply(alice) // вызывает функцию с this и массивом аргументов (alice, [arg1]) // 5 undefined
const myUser = user2.greet.bind(alice) // создает новую функцию с привязанным this

myUser()

// потеря контекста
const user = {
  name: 'Alice',
  greet() {
    console.log('6', this.name)
  },
}
user.greet() // 6 Alice

setTimeout(user.greet, 1000) // 6 undefined! this — не user когда функция передается как колбэк, контекст теряется?
setTimeout(() => user.greet(), 1000) // без потери  // 6 Alice
setTimeout(user.greet.bind(user), 1000) // 6 Alice

const user3 = {
  name: 'Alice',
  greet: () => console.log('7', this.name), // но this — не user! Не подходит, если нужно ссылаться на сам объект.
}

user3.greet() // undefined

// Лучший способ — явно привязать или использовать стрелку вне объекта:
const greet = () => console.log('8', user.name)
setTimeout(greet, 1000) // 8 Alice
