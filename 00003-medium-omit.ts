// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type Exclude<T, U> = T extends U ? never :T; 

// ============= Your Code Here =============
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>