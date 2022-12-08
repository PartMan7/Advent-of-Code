exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim().split('\n');
	const ans1 = input.map(line => ' XYZ'.indexOf(line[2]) + ((' XYZ'.indexOf(line[2]) - ' ABC'.indexOf(line[0]) + 4) % 3) * 3).reduce((a, b) => a + b, 0);
	const ans2 = input.map(line => 'XYZ'.indexOf(line[2]) * 3 + (' ABC'.indexOf(line[0]) + 'XYZ'.indexOf(line[2]) + 1) % 3 + 1).reduce((a, b) => a + b, 0);
	return [ans1, ans2];
};
