// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
]


// ============= Your Code Here =============
type MinusOne<T extends number> = BuildArray<T> extends [infer F, ...infer R] ? R['length'] : -1

type BuildArray<T extends number, E extends any = unknown, U extends any[] = []> 
  = U['length'] extends T
    ? U
    : BuildArray<T, E, [E, ...U]>

type a = BuildArray<1110>