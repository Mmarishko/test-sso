/**
 * enum: как объявлять и использовать
 */
enum MyDays {
  monday = 1,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

function getSomeValue(val: number) {
  return val * 1
}

// можно к каждому элементу обратиться по имени
const day: MyDays = MyDays.monday

enum Direction {
  Down = 3,
  Left,
  Right,
  Up = '6',
}

// можно передавать в качестве значения другой переменной,
const downDirection = Direction.Down

// полю интерфейса
interface Down {
  down: Direction.Down
}

// или другому enum
enum Up {
  up = Direction.Up,
}

/**
 * нельзя изменять после создания
 *  */
MyDays['weekand'] = 9
// MyDays.weekand = 9 // error

// const down: Down = { down: Direction.Up } // error

/**
 * значения enum могут быть числа, строки, булевы, значения других enum и вычисляемые поля
 */
enum Bool {
  false,
  true,
}

enum One {
  // one = getSomeValue(1), // error если после есть поля, значения которых явно не указаны, вычисляемые поле должно быть последним.
  one,
  zero,
  two = 2,
}

enum Two {
  firsh = 'firsh',
  second = One.two,
}

// как выглядит enum после компиляции
enum Classes {
  math = 'math',
  english = 0,
  russian = 'russian',
  biology = 'biology',
  chemistry = 'chemistry',
}

/* после компиляции
var Classes;
(function (Classes) {
  Classes[Classes['english'] = 0] = 'english';
  Classes['math'] = 'math';
  Classes['russian'] = 'russian';
  Classes['biology'] = 'biology';
  Classes['chemistry'] = 'chemistry';
})(Classes || (Classes = {}));
 */

// в качестве альтернативы можно испотзовать объекты

const ObjClasses = {
  math: 'math',
  english: 0,
  russian: 'russian',
  biology: 'biology',
  chemistry: 'chemistry',
} as const

// получить строку по числу и число по строке для числовых enum
console.log(Classes[0]) // english
console.log(ObjClasses[0]) // undefined. только по ключу

type TObjClasses = (typeof ObjClasses)[keyof typeof ObjClasses]

const MapWithEnum: Map<Classes, string> = new Map([
  [Classes.biology, 'first'],
  [Classes.english, 'second'],
])

const jsonClasses = JSON.parse(JSON.stringify(Classes))
console.log(Classes.biology) // biology
console.log(Classes['math']) // math

console.log(jsonClasses)

/**
 * {
    '0': 'english',
    english: 0,
    math: 'math',
    russian: 'russian',
    biology: 'biology',
    chemistry: 'chemistry'
  }
 */

const enum Color {
  Red = 1,
  Green = 2,
}
