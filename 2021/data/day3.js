exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split('\n');
	const freq = Array.from({ length: data[0].length }).map(() => [0, 0]);
	data.forEach(line => line.split('').forEach((char, i) => freq[i][char]++));
	const gn = arr => arr[0] > arr[1] ? 0 : 1;
	let gamma = parseInt(freq.map(gn).join(''), 2), epsilon = parseInt(freq.map(nums => Number(!gn(nums))).join(''), 2);
	function filter (arr, i, o2) {
		const fqs = [0, 0];
		arr.forEach(line => fqs[line[i]]++);
		if ((fqs[0] > fqs[1] && o2) || (fqs[0] <= fqs[1] && !o2)) return arr.filter(line => line[i] === '0');
		else return arr.filter(line => line[i] === '1');
	}
	let o2g = data, c02 = data;
	for (let i = 0; i < data[0].length; i++) {
		o2g = filter(o2g, i, true);
		if (o2g.length === 1) break;
	}
	for (let i = 0; i < data[0].length; i++) {
		c02 = filter(c02, i, false);
		if (c02.length === 1) break;
	}
	return [gamma * epsilon, parseInt(o2g[0], 2) * parseInt(c02[0], 2)];
}