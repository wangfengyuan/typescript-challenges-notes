// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]


// ============= Your Code Here =============
// 这个题目相对而言比较简单，关键在于三点：
// 1、通过 T extends [infer F, ...infer Rest] 的方式，取出数组中的第一个元素。
// 2、通过 F extends Array<any> 的方式，判断 F 是否为数组：若是数组，则继续带入 Flatten<F> 进行展开；若不是数组，则对剩余元素 Rest 进行处理。
// 3、对于剩余元素组成的数组 Rest，带入 Flatten<Rest> 进行递归处理即可。
type Flatten<T extends any[]> = T extends [infer F, ...infer Rest] 
            ? F extends Array<any>
              ? [...Flatten<F>, ...Flatten<Rest>]
              : [F, ...Flatten<Rest>]
            : [];
