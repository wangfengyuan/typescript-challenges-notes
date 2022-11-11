// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
// 关键在于两点：
// 通过 [key in (keyof F | keyof S)] 的方式，获取 F 和 S 所有的 key；
// 若 key 在 S 中，则优先使用 S[key] 的值，从而实现第二个类型的键会覆盖第一个类型的键。
type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [K in (keyof F | keyof S)]: K extends keyof S 
                                ? S[K] 
                                : K extends keyof F
                                  ? F[K]
                                  : never
}

type aaa = Merge<Foo, Bar>

