function factorial(n: number): number {
	return n <= 1 ? 1 : n * factorial(n - 1);
}

function combination(n: number, r: number): number {
	if (r > n) return 0;
	return factorial(n) / (factorial(r) * factorial(n - r));
}

function permutation(n: number, r: number): number {
	if (r > n) return 0;
	return factorial(n) / factorial(n - r);
}

export { combination, permutation };
