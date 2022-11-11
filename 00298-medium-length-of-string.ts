// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
// 没有办法直接获取字符串类型的长度。不过对于数组类型，可以通过 array['length'] 的方式获取它的长度
// 因此现将string转为数组
type StringToArray<S extends string> = S extends `${infer F}${infer Rest}` ? [F, ...StringToArray<Rest>]: []

type LengthOfString<S extends string> = StringToArray<S>['length'];
