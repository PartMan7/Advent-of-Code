exports.runs = 2;

exports.solve = function (input) {
	let original = input.split('').map(t => ~~t), current = original[0];
	let data1 = original.slice();
	function move1 (data) {
		let picked = data.splice(1, 3), target = (data[0] - 1) || 9;
		while (picked.includes(target)) target = (target - 1) || 9;
		data.splice(data.indexOf(target) + 1, 0, ...picked);
		data.push(data.shift());
	}
	function move2 (data) {
		let r1 = data[current - 1], r2 = data[r1 - 1], r3 = data[r2 - 1];
		[data[current - 1], target] = [data[r3 - 1], (current - 1) || 1000000];
		while ([r1, r2, r3].includes(target)) target = (target - 1) || 1000000;
		[data[target - 1], data[r1 - 1], data[r2 - 1], data[r3 - 1], current] = [r1, r2, r3, data[target - 1], data[current - 1]];
	}
	for (let i = 0; i < 100; i++) move1(data1);
	while (data1[0] !== 1) data1.push(data1.shift());
	let data2 = Array.from({length: 1000000 - 1}).map((_blank, i) => i + 2);
	data2.push(original[0]);
	for (let i = 0; i < original.length - 1; i++) data2[original[i] - 1] = original[i + 1];
	data2[original[original.length - 1] - 1] = original.length + 1;
	for (let i = 0; i < 10000000; i++) move2(data2);
	return [~~data1.slice(1).join(''), (data2[0]) * (data2[data2[0] - 1])];
}