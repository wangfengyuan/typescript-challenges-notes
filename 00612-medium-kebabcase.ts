// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/**
  这一题关键的地方在于判断何时需要添加 - 连字符，当且仅当满足下面两个条件时需添加 -：
  当前字符为大写字母；
  当前字符不是第一个字符。
  实现的方式有很多，其中一种巧妙的方法如下：
  将字符串分为第一个字符 F 和剩余字符 R；
  总是通过 Lowercase<F> 将第一个字符转换为小写；
  通过 R extends Uncapitalize<R> 判断 R 的第一个字符是否为大写；
  若 R 的第一个字符为大写，则添加 - 后继续递归调用；
  若 R 的第一个字符为小写，则直接递归调用。
 */


// ============= Your Code Here =============
type KebabCase<S extends string> = S extends `${infer F}${infer Rest}`
                                    ? Rest extends Uncapitalize<Rest>
                                      ? `${Lowercase<F>}${KebabCase<Rest>}`
                                      : `${Lowercase<F>}-${KebabCase<Rest>}`
                                    : S

