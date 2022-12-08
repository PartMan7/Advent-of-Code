exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim().split('\n\n').map(elf => elf.split('\n').reduce((a, b) => a + ~~b, 0)).sort((a, b) => b - a);
	const ans1 = input[0];
	const ans2 = input[0] + input[1] + input[2];
	return [ans1, ans2];
};
