# typescript类型挑战笔记记录

### Pick
```typescript
type MyPick<T, K extends keyof T> = { 
  [P in K]: T[P] 
}
```


### ReadOnly
```typescript
type MyReadonly<T> = {
	readonly [K in keyof T]: T[K]
}
```
### TupleToObject
```typescript
// 元组转换为对象

type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};
// T[number]取出元组的联合类型

const tuple = ['tesla', 'model 3', 'model X', 'model Y']
type obj = TupleToObject<typeof tuple>;

type obj = {
    tesla: "tesla";
    "model 3": "model 3";
    "model X": "model X";
    "model Y": "model Y";
}
```
​

### First Array获取数组第一个元素
```typescript
type First<T extends any[]> = T extends [] ? never : T[0];
2、type First<T extends any[]> = T extends [f: infer F, ...rest: any[]] ? F : never;
```
### [Length of Tuple](https://github.com/type-challenges/type-challenges/issues/5413)
```typescript
type Length<T extends readonly any[]> = T['length']
```
### MyExclude
```typescript
type MyExclude<T, U> = T extends U ? never : T;

// T是联合类型时，extends会一个个判断， T 可能是 A | B 的联合类型, 
// 那实际情况就变成(A extends U ? X : Y) | (B extends U ? X : Y)
```
### MyAwaited 获取promise返回类型
```typescript
// 有可能是嵌套promise，需要递归
type MyAwaited<T> = T extends Promise<infer K> ? MyAwaited<K> : T;


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]
```
### IF 
```typescript
type If<C extends boolean, T, F> = C extends true ? T : F;
```
# Concat 
```typescript
type Concat<T extends any[], K extends any[]> = [...T, ...K]
```
### Equal
```typescript
// 建议
export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

// 不建议，判断不了any
export type Equal<T, S> =
	[T] extends [S] ? (
		[S] extends [T] ? true : false
	) : false


type a = Equals<number, string>; // false
type b = Equals<any, 1>; // false
type c = Equals<1|2, 1>; // false
type d = Equals<any, never>; // false 
type e = Equals<[any], [number]>; // false
type f = Equals<{ a: string, b: string }, { a: string } & { b: string }>; // false
type g = Equals<MergeInsertions<{ a: string } & { b: string }>, MergeInsertions<{ a: string, b: string }>>;

type a1 = Equal<number, string>; // false
type b1 = Equal<any, 1>; // true
type c1 = Equal<1|2, 1>; // false
type d1 = Equal<any, never>; // false 
type e1 = Equal<[any], [number]>; // true 
type f1 = Equal<{ a: string, b: string }, { a: string } & { b: string }>; // true 

export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

type a2 = MergeInsertions<{ a: string } & { b: string }>
```
### Includes
```typescript
type isEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R] ? (
  isEqual<U, F> extends true ? true : Includes<R, U>
) : false;
```
### MyParameters
```typescript
type MyParameters<T extends (...args: any[]) => any> = 
	T extends (...args: infer U) => any ? U : never;  
```
