type TupleToUnion<T extends any[]> = T[number]

type a = TupleToUnion<[123,'456',true]>