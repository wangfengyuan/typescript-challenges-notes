// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]


// ============= Your Code Here =============
// 通过 keyof T 获取 T 的所有 key。
// 通过 kyeof T | U，添加一个新的 key U。
// 通过 in 操作符遍历全部的 key。
// 通过 key extends U 判断是新的字段，还是T原有的字段。
// type AppendToObject<T extends Record<string, any>, U extends string, V> = {
//   [K in (U | keyof T)]: K extends U ? V : T[K];
// };

type AppendToObject<T extends Record<string, any>, U extends string, V> = T & {
  [K in U]: V;
} extends infer TFinal ? {
  [K in keyof TFinal]: TFinal[K];
} : never;


type a = AppendToObject<test1, 'home', boolean>
