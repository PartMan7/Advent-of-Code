exports.runs = 1000;

exports.solve = function(fileString) {
	const input = fileString.trim().split('\n');
	const ans1 = ((n, output) => !(r => r = ((cond, code) => !cond() || [code(n % 5), r(cond, code)]))()(() => n > 0, rem => [n = parseInt(n / 5), (rem > 2) && [rem -= 5, n++], output = ({ '-2': '=', '-1': '-' }[rem] || rem) + output]) || output)(input.reduce((a, b) => a + b.split('').reverse().reduce((a, n, i) => a + ~~({ '=': -2, '-': -1 }[n] || n) * (5 ** i), 0), 0), '');
	const ans2 = '-';
	return [ans1, ans2];
};