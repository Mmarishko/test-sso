/**
 *  Классы в js
 */

class JSUser {
  myName
  constructor(myName) {
    this.myName = myName
  }

  sayHello() {
    console.log(this.myName)
    return 0
  }

  static sayHi() {
    console.log('this.myName')
    return 1
  }
}

/**
 * Нельзя обратиться к методам класса. Нельзя вызывать методы класса без инстанцирования
 */
// JSUser.sayHello() //  - ошибка TypeError: JSUser.sayHello is not a function
// JSUser.sayHello // - в браузере можно вернет undefined
// статические методы можно получить
JSUser.sayHi() // - можно 1
JSUser.sayHi // - можно fn

// Интерфейсы
interface IUser {
  readonly id: number
  name: string
  type?: string | number
}

interface IWorker {
  doWork: () => void
}

class UserAccount implements IUser {
  name: string
  id: number
  type: string | number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
    this.type = 123
  }
}

const myUser: IUser = new UserAccount('Eric', 45)

// myUser.id = 90 //error нельзя изменять readonly свойство
myUser.name = 'John'

/**
 *  передача в качестве параметра переменной, у которой структура схожа со строктурой параметра, но явно не указан тип
 */
const newUser = {
  name: 'Jain',
  id: 12,
  yearsOld: 43,
}

function checkUser(value: IUser): boolean {
  return !!value
}

checkUser(newUser as IUser)
checkUser(newUser)
checkUser(myUser)

console.log(myUser)

function getUser(): IUser {
  return new UserAccount('Susan', 89)
}

function setUser(user: IUser) {}

/** ООП
 * модицикаторы доступа
 */
class Account {
  type: string = 'admin' // если модицикатор не указан - public по умолчанию
  public user: IUser = { id: 123, name: 'Jahn Doo' } // доступно везде: внутри класса, для наследников и для экземпляров
  protected roles: string[] = ['admin'] // доступно внутри класса и наследникам (subclasses)
  private _code?: string // доступно только внутри класса. не доступно наследникам и экземплярам
  #numberCode: number // private js
  static surname: string = 'surname' // доступно только от класса через Account.surname, не доступно внутри класса, для наследников и для экземпляров

  constructor(type: string, user: IUser, code = '') {
    this.type = type
    this.user = user
    this.roles = []
    this._code = code
    this.#numberCode = +code
  }

  sayHi(): void {
    // this.surname // error
    if (this._code) {
      console.log('Hi, ', this._code)
    } else console.log(this.#numberCode)
  }
}

const mySecondUser = new Account('user', { id: 123, name: 'Jahn Doo' })

const type = mySecondUser.type
const user = mySecondUser.user
// const roles = mySecondUser.roles; // не доступно экземплярам
// const rolesAccount = Account.roles // не доступно
const surname = Account.surname

// const password = mySecondUser._code // не доступно экземплярам

/**
 * наследовать можно от 1 класса, имплементировать несколько интерфейсов
 */
class GameAccount extends Account implements IUser, IWorker {
  id
  name

  constructor(type: string, user: IUser) {
    super(type, user)

    this.type = type
    this.roles = ['user'] // доступно наследникам
    // this._code = '3434'; // не доступно наследникам
    // this.surname = 'surname1' // не доступно через this. только от класса GameAccount.surname
  }

  doWork() {
    console.log('I am working')
  }
}

const newAcc = new Account('admin', { id: 123, name: 'John', type: 'admin' })

/**
 * ООП: Абстрактные классы
 */
abstract class AMan {
  abstract name: string
  abstract doWork: () => void
}

// const exemplar1 = new AMan() // нельзя создать экземпляр абстрактного класса

/**
 *  от абстрактного клаcса можно наследовать
 */
class Man extends AMan {
  name: string // нужно определить абстрактные свойства в наследнике
  protected roles: string[] = []

  constructor(_name, _role: string) {
    super()
    this.name = _name
    this.roles = [...this.roles, _role]
  }

  // нужно реализовать абстрактные методы в наследнике
  doWork = (): void => {
    // some logic here
  }
}

/**
 * инкапсуляция
 */
class MyWorker extends Man {
  protected position: string
  private _salary: number

  constructor(_name, _role: string) {
    super(_name, _role)
  }

  public setPosition(positionValue: string): void {
    this.position = positionValue
  }

  public getPosition(): string {
    return this.position
  }

  public setSalary(salaryValue: number): void {
    this._salary = salaryValue
  }

  public getSalary(): number {
    return this._salary
  }

  public getLastRole(): string {
    return this.roles[this.roles.length - 1]
  }
}

const userWorker = new MyWorker('Jane', 'user')

userWorker.name = 'Jose'

userWorker.doWork()
userWorker.setSalary(32340)
userWorker.getSalary()
userWorker.setPosition('teacher')
userWorker.getPosition()
// userWorker.roles(); //error нет доступа к приватным свойствам напрямую
userWorker.getLastRole()

/**
 * слияние интерфейса с классом
 */

interface IMyUser {
  readonly id: number
  name: string
  type?: string | number
}

class IMyUser {}

const newIUser = new IMyUser()

newIUser.name
newIUser.id
newIUser.type

/**
 * Класс может реализовывать (implements) класс, если все свойства родителя публичные
 */

interface IAnimal {
  name: string
}

class Animal {
  public name: string
}

class Bird implements IAnimal {
  public name: string
  protected age: number
  public get value() {
    return 'value'
  }
  public set value(value: string) {}
}

class Fish implements Animal {
  public name: string
  private arial: string
}

// class Owl implements Bird {
// error
class Owl extends Bird implements Bird {
  // ok
  public name: string = 'Name'
  declare protected age: number // or protected age: number = 1
  // public value = 'value' //'value' is defined as an accessor in class 'Bird', but is overridden here in 'Owl' as an instance property.

  public get value() {
    return 'value'
  }
  public set value(value: string) {}
}

// class Raven implements Bird {
// error
class Raven extends Bird implements Bird {
  // ok
  public name: string = 'Raven'
}

// class Shark implements Fish {
// error
class Shark extends Fish implements Fish {
  public name: string = 'Fish Shark'
}

// class Baracuda implements Fish {
// error
class Baracuda extends Fish implements Fish {
  public name: string = 'Baracuda'
  // private arial: string // error
}

const baracuda = new Baracuda()
baracuda.name

// нельзя передавать параметр типа в статические свойства и методы
class TestStaticFieldAndGeneric<Type> {
  // static defaultValue: Type
  static defaultValue: string

  // static getDefaultValue(): Type {
  static getDefaultValue(): string {
    return this.defaultValue
  }
}

// определит тип возвращаемый функцией как this
class Box {
  contents: string = ''
  set(value: string) {
    // (method) Box.set(value: string): this
    this.contents = value
    return this
  }
}

// определить тип, как наследник от Box
type BoxType = InstanceType<typeof Box>
