// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable


const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}


// ============= Your Code Here =============
// type Chainable<T = {}> = {
//   option<K extends string, V>(key: K, value: V): Chainable<T & Record<K, V>>
//   get(): T
// }
// [P in K]: V 如果改成 P: V的写法, 只能获取到P的类型就是 string: V 不符合要求。
// [P in K] 的作用是取函数参数的值作为对象类型的key,参数是'foo',获取到的就是 'foo': V 相当于js里对象的动态键名 
// V extends T[K] ? never : K 对于已经存在的类型，将类型定为never,再次赋值相同类型时会报错，如上面result2

type Chainable<T = {}> = {
  option<K extends string, V>(key: K extends keyof T ? (V extends T[K] ? never : K) : K, value: V): Chainable< Omit<T, K> & { [P in K]: V} >
  get(): T
}
