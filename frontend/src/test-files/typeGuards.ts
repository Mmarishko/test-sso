//  typeof 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function'
// const c:
//   | 'string'
//   | 'number'
//   | 'bigint'
//   | 'boolean'
//   | 'symbol'
//   | 'undefined'
//   | 'object'
//   | 'function'

function checkType(arg: string | IChild): string | number {
  return typeof arg === 'string' ? 'arg'.toLowerCase() : arg.age
}

function checkObjectType(arg: IBird | Box): Box | null {
  return arg instanceof Box ? arg : null
}

const events = ['Новости', 'Мероприятия', 'Статьи']

type CapitalEventType = {
  id: string
  name: string
  location: string
  date?: string
  description?: string
  category: string
  imageSrc?: string
}

type CapitalType = {
  id: string
  name: string
  location: string
  rating: number
  patronsCount: number
  category: string
  amount: string
  avatars: string[]
}

class EventClass {
  capital: CapitalEventType
}

const isEvent = (
  capital: CapitalEventType | CapitalType
): capital is CapitalEventType => {
  return 'date' in capital && events.includes(capital.category)
}

class Cat {
  meow() {
    console.log('meow')
  }
}

class Dog {
  gaw() {
    console.log('Gaw')
  }
}

function CheckAnumal(animal: Cat | Dog): void {
  if (animal instanceof Cat) {
    return animal.meow()
  } else {
    return animal.gaw()
  }
}
