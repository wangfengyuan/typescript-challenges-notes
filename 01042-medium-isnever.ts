// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]


// ============= Your Code Here =============
// 因为never是不能够被判断的，进不到判断条件，所以我们如果要判断的话，构建一个数组即可，因为数组可以存在never
type IsNever<T> = [T] extends [never] ? true : false;
