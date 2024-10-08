export function flatMap<T, U>(array: T[] | readonly T[], fn: (item: T) => U[]): U[] {
	// Cast to T[] to make it non-readonly
	return (array as T[]).reduce<U[]>((acc, item) => acc.concat(fn(item)), []);
}
