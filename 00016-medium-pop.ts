// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]


// 数组rest长度为1时返回空数组，递归处理

// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [infer F, ... infer Rest] 
                              ? T['length'] extends 1
                                ? []
                                : [F, ...Pop<Rest>]
                              : [];

type Pop1<T extends any[]> = T extends [...infer A, any] ? A : []


type a = Pop<[3, 2, 1]>
