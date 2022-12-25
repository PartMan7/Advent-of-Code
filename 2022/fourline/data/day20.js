exports.runs = 1000;

exports.solve = function (fileString) {
	const input = (input => (len => ![input.len = len, input.mapping = input.lines.slice(), input.moddedMap = (modKey => input.mapping.map(n => (n * modKey + len - 1) % (len - 1)))(811589153 % (len - 1)), input.fullModdedMap = input.mapping.map(n => n * 811589153), input.list1 = input.mapping.map((_, i) => i), input.list2 = input.mapping.map((_, i) => i), input.lines.forEach((e, i) => (index => input.list1.splice(...[...input.list1.splice(index, 1), 0, (index + input.mapping[i] + (len - 1)) % (len - 1)].reverse()))(input.list1.indexOf(i))), Array.from({ length: 10 }).forEach(() => input.lines.forEach((e, i) => (index => input.list2.splice(...[...input.list2.splice(index, 1), 0, (index + input.moddedMap[i] + (len - 1)) % (len - 1)].reverse()))(input.list2.indexOf(i))))] || input)(input.lines.length))({ lines: fileString.trim().split('\n').map(n => ~~n) });
	const ans1 = (z => [1000, 2000, 3000].map(n => input.mapping[input.list1[(z + n + input.len) % input.len]]).reduce((a, b) => a + b, 0))(input.list1.indexOf(~~Object.keys(input.mapping).find(k => input.mapping[k] === 0)));;
	const ans2 = (z => [1000, 2000, 3000].map(n => input.fullModdedMap[input.list2[(z + n + input.len) % input.len]]).reduce((a, b) => a + b, 0))(input.list2.indexOf(~~Object.keys(input.mapping).find(k => input.mapping[k] === 0)));
	return [ans1, ans2];
};
