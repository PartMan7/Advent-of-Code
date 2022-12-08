exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim().split('\n').map(line => line.split(/[-,]/).map(num => ~~num));
	const ans1 = input.filter(([a, b, c, d]) => (a >= c && b <= d) || (a <= c && b >= d)).length;
	const ans2 = input.filter(([a, b, c, d]) => (a >= c && a <= d) || (b >= c && b <= d) || (c >= a && c <= b) || (d >= a && d <= b)).length;
	return [ans1, ans2];
};
