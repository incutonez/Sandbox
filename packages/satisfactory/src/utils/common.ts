export function emptyFn() {

}

export function sum(value: number[]) {
	return value.reduce((total, current) => total + current, 0);
}
