// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}


// ============= Your Code Here =============
// type DeepReadonly<T extends Record<string, any>> = {
//   readonly [P in keyof T]: T[P] extends Record<string, any> ? DeepReadonly<T[P]> : T[P];
// }

// 需要单独判断Function, 因为 Function extends Record<string, any> 为true

type DeepReadonly<T extends Record<string, any>> = {
  readonly [K in keyof T]: T[K] extends Function 
                            ? T[K] 
                            : T extends Record<string, any> 
                              ? DeepReadonly<T[K]> 
                              : T[K]
}

type b = () => {};

type a = b extends Record<string, any> ? true : false; // true

type c = keyof b;