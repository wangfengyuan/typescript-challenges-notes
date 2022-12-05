// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})



type GetComputedType<C> = {
  [K in keyof C]: C[K] extends (...args: any[]) => unknown ?
    ReturnType<C[K]> :
    never;
}

// ============= Your Code Here =============
declare function SimpleVue<D, C, M>(options: {
  data?: (this: {}) => D,
  computed?: C & ThisType<D>,
  methods?: M & ThisType<D & GetComputedType<C> & M>
}): any

