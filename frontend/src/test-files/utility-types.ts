// utility Types
interface IMan {
  name: string | null
  surname: string
  patronymic?: string
  age: number
}

interface IChild {
  parents: IMan[]
  age: number
}

// 18 утилитарных типов

type TManCreate = Required<IMan> // 1. делает все поля обязательными
type TManUpdate = Partial<IMan> // 2. делает все поля необязательными

type TManName = Omit<IMan, 'age'> // 3. удаляет из типа все поля, указанные во втором параметре
type TManAge = Pick<IMan, 'age'> // 4. оставляет в типе толькол поля, указанные во стором параметре

type TRecord = Record<keyof IChild, string | null> // 5. создает тип, где ключами будут ключи из первого параметра, а занчениями из второго.
// Для сопоставления типов

type TAwaited = Awaited<IChild> // 6. разворачивает тип из промиса

type TExclude = Exclude<'GET' | 'POST' | 'PUT' | 'DELETE', 'DELETE' | 'PUT'> // 7. убирает из объединения  значение
type TExtract = Extract<'GET' | 'POST' | 'PUT' | 'DELETE', 'DELETE' | 'OPTIONS'> // 8. достает из объединения значения

type TNonNullable = NonNullable<string | null | undefined> // 9. убирает значения null | undefined

// 10. Parameters кортеж из параметров типов аргементов функции
function func(arg1: string, arg2: number, arg3: boolean) {}
type TParameters = Parameters<typeof func> // кортеж из параметров типов аргементов функции

type T0 = Parameters<() => void>
type T1 = Parameters<(arg: string, arg1: string[]) => void>
type T2 = Parameters<<T>(arg: T) => T>
type T4 = Parameters<never>
type T7 = Parameters<any>
// type T5 = Parameters<unknown>
// type T3 = Parameters<void>
// type T6 = Parameters<string>
// type T10 = Parameters<number>
// type T8 = Parameters<Object>
// type T9 = Parameters<Function>

// 11. ConstructorParameters Возвращает кортеж параметров конструктора
type ConstructorParam = ConstructorParameters<ErrorConstructor>
type ConstructorParam1 = ConstructorParameters<FunctionConstructor>
type ConstructorParam2 = ConstructorParameters<ObjectConstructor>
type ConstructorParam3 = ConstructorParameters<ArrayConstructor>
type ConstructorParam5 = ConstructorParameters<StringConstructor>

class C {
  constructor(a: number, b?: string) {}
}
type ConstructorParam6 = ConstructorParameters<typeof C>

// 12. ReturnType достает тип возвращаемого значения
function firstFunc(arr: IChild[]): IChild {
  return arr[0]
}

type ReturnT = ReturnType<typeof firstFunc> // достает тип возвращаемого значения

type R0 = ReturnType<() => void>
type R1 = ReturnType<(arg: string) => void>
type R2 = ReturnType<<T>(arg: T) => T>
type R4 = ReturnType<never>
type R7 = ReturnType<any>
type R5 = ReturnType<<T extends U, U extends number[]>() => T>
type R3 = ReturnType<typeof firstFunc>
// type R6 = ReturnType<string>
// type R9 = ReturnType<Function>

// 13. InstanceType - тип, состоящий из экземпляра функции конструктора

class ClassMy {
  type: string
  value: number
  constructor(
    private someOne,
    private someTwo
  ) {}
}
type InstanceType1 = InstanceType<typeof C>
type InstanceType2 = InstanceType<typeof ClassMy>
type InstanceType3 = InstanceType<any>
type InstanceType4 = InstanceType<never>

type This1 = ThisParameterType<(arg: string) => void> //14. ThisParameterType тип параметра this или unknown
type This2 = ThisParameterType<(this: number, arg: string) => void>

// 15. ThisType не возвращает тип, служит маркером контекстного типа this
type This3 = ThisType<C>
type This4 = ThisType<{ this: number; arg: string }>

// 16 OmitThisParameter<Type> удаляет пораметр this из типа. Eсли в типе явно не передается параметр this, вернется тот же тип.
function toHex(this: number) {
  return this.toString(16)
}

function toHexNoThis(arg: number) {
  return arg.toString(16)
}

const tex: OmitThisParameter<typeof toHex> = toHex.bind(5)
const texNoThis: OmitThisParameter<typeof toHexNoThis> = toHex.bind(5)

// 17 Readonly<Type> добавляет всем полям типа аргумента модицикатор Readonly
type TreadOnly = Readonly<IMan>

// 18 NoInfer<Type> , блокирует вывод (извлечения) типа из содержимого. В остальном идентичен типу.
// Гарантирует, что второй аргумент функции является частью первого
function createInfer<C extends string>(a: C[], b: NoInfer<C>) {
  // some logic
}

const a = createInfer(['red', 'yellow', 'green'], 'yellow')
// const b = createInfer(['red', 'yellow', 'green'], 'blue') // error.  'blue' не содержится в первом аргументе
