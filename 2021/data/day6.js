exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split(',').map(n => ~~n);
	function map (set) {
		const temp = set.shift();
		set.push(temp);
		set[6] += temp;
	}
	let dt = Array.from({ length: 9 }).map((_, i) => BigInt(data.filter(num => num === i).length));
	for (let i = 0; i < 80; i++) map(dt);
	const ans1 = Object.values(dt).reduce((a, b) => a + BigInt(~~b), 0n);
	for (let i = 80; i < 256; i++) map(dt);
	const ans2 = Object.values(dt).reduce((a, b) => a + BigInt(~~b), 0n);
	return [ans1, ans2];
}