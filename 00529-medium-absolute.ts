// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]


// ============= Your Code Here =============
/**
 * 
 * Absolute 需要能接受任意合法的 number / bigint 类型，那么我们则要考虑到这些情况：
普通数字：123
分组数字：1_2345（等价于 12345）
十六进制：0xF123
八进制：0o123
科学计数法：1e10
bigint：123n（末尾有 n）
看着很麻烦，需要考虑这么多种情况。不过在 TypeScript 中，通过模板字符串将数组转换为字符串时，编译器会自动进行转换：

既然编译器已经帮我们做了最自动转换，那么我们仅仅需要考虑将负数转换为正数即可。
由于不能直接判断正负，所以可以采取如下方法：
将数字转换为字符串；
判断字符串第一个字符是否为 -；
若第一个字符为 -，则保留剩余字符；
若第一个字符不为 -，则保留全部字符。
 */

type Absolute<T extends number | string | bigint> = `${T}` extends `${infer F}${infer R}` 
? (F extends `-` ? R : `${F}${R}`)
: ''
