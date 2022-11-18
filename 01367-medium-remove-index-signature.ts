// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]


// ============= Your Code Here =============
// 在 TypeScript 中，索引签名的类型允许为 string number symbol。对于使用索引签名的对象，通过 keyof 获取到的键（key）类型也是对应的类型：
type IsIndexSignature<T> = 
  string extends T
    ? true
    : number extends T
      ? true
      : symbol extends T
        ? true
        : false
type RemoveIndexSignature<T> = { [P in keyof T as IsIndexSignature<P> extends true ? never : P]: T[P] };

