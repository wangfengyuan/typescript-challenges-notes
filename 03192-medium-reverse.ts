// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]


// ============= Your Code Here =============
type Reverse<T extends any[]> = T extends [infer Head, ...infer Rest]
? [...Reverse<Rest>, Head]
: []
