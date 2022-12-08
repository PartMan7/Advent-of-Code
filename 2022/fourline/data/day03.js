exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim().split('\n');
	const ans1 = input.map(line => (line.substr(0, line.length / 2) + '|' + line.substr(line.length / 2)).match(/(.).*\|.*\1/)[1]).reduce((a, b) => a - (b === b.toUpperCase() ? 38 : 96) + b.charCodeAt(), 0);
	const ans2 = Array.from({ length: input.length / 3 }).map((_, i) => input.slice(3 * i, 3 * i + 3).join('\n').match(/(.).*(?:\n.*\1.*){2}/)[1]).reduce((a, b) => a - (b === b.toUpperCase() ? 38 : 96) + b.charCodeAt(), 0);
	return [ans1, ans2];
};
