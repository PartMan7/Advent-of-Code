exports.runs = 5;

exports.solve = function (input) {
	let data = input.split(',').map(n => ~~n);
	const dt = data.slice().sort((a, b) => a - b);
	let ans1, last;
	for (let i = Math.floor(dt.length / 2.2); i < dt.at(-1); i++) {
		const temp = dt.map(n => Math.abs(n - dt[i])).reduce((a, b) => a + b)
		if (last < temp) {
			ans1 = last;
			break;
		}
		last = temp;
	}
	last = undefined;
	for (let i = Math.floor(dt.length / 2.2); i < dt.at(-1); i++) {
		const temp = dt.map(n => Math.abs(n - dt[i])).map(n => n * (n + 1) / 2).reduce((a, b) => a + b)
		if (last < temp) return [ans1, last];
		last = temp;
	}
}