/**
 * Conditional Type  - типы с условием сходно тернарному оператору.
 */
type StringType<T> = T extends string ? string : never

/** infer в TypeScript — это ключевое слово, которое используется внутри
 *  условных типов для автоматического вывода (извлечения) типа из другой конструкции.
 *  Позволяет создать внутри условного типа переенную, на которую можно ссылаться
 */

type InferTypeTest<T> = T extends (arg: string[]) => infer ReturnType
  ? ReturnType
  : never

type ItemType<Type> = Type extends Array<infer Item> ? Item : Type

type A = Array<number>
type B = string

type Str = ItemType<string[]>
type AType = ItemType<A>
type BType = ItemType<B>

type Unpromisify<T> = T extends Promise<infer U> ? U : T
type Unarray<T> = T extends (infer U)[] ? U : T
type GetParam<T> = T extends (param: infer P) => any ? P : never

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never

type GetReturnTypeStr<Type> = Type extends (...args: string[]) => infer Return
  ? Return
  : never

type return1 = GetReturnType<() => void>
type return11 = GetReturnTypeStr<() => void>
type return2 = GetReturnType<(a: string) => string>
type return21 = GetReturnTypeStr<(a: string) => string>
type return3 = GetReturnType<(a: string[]) => number>
type return31 = GetReturnTypeStr<(a: string[]) => number>
type return4 = GetReturnType<(a: number[]) => number>
type return41 = GetReturnTypeStr<(a: number[]) => number>
type return5 = GetReturnType<(a: boolean, b: boolean) => boolean[]>
type return51 = GetReturnTypeStr<(a: boolean, b: boolean) => boolean[]>

// несколько infer
type GetFirstParam<T> = T extends (a: infer A, b: infer B) => any ? A[] : never

// Литеральные типы
type Greeting = 'HELlo, world'
type Greeting1 = 'hello, world'
type ShoutyGreeting = Uppercase<Greeting>
type LowercaseGreeting = Lowercase<Greeting>
type CapitalizeGreeting = Capitalize<Greeting1>
type UnCapitalizeGreeting = Uncapitalize<Greeting>

// Distributive Conditional Types
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number> //   string[] | number[];

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
type ArrOfStrOrNum = ToArrayNonDist<string | number> // type ArrOfStrOrNum = (string | number)[]
