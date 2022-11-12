// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


// ============= Your Code Here =============
// 方法1：keyof T & keyof U获取公共的key，然后Omit出去
// type Diff<O extends Record<string, any>, O1 extends Record<string, any>> = Omit<O & O1, CommonKey<O, O1>>
// 方法2：获取diff的字段然后pick出来
type Diff<O, O1> = Pick<O&O1, Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>>

type CommonKey<T, U> = keyof T & keyof U

type a = CommonKey<Foo, Bar> // name | age

type Common = ('a' | 'b') & ('a' | 'c')



