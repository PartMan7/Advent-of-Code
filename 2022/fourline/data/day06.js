exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim();
	const ans1 = Array.from({ length: (input.length - 4 + 1) }).findIndex((_, i) => new Set(input.slice(i, i + 4).split('')).size === 4) + 4;
	const ans2 = Array.from({ length: (input.length - 14 + 1) }).findIndex((_, i) => new Set(input.slice(i, i + 14).split('')).size === 14) + 14;
	return [ans1, ans2];
};
