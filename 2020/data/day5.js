exports.runs = 200;

exports.solve = function (input) {
	let data = input.split('\n').map(line => {
		let row = '', col = '';
		for (let i = 0; i < 7; i++) row += line[i] === 'B' ? '1' : '0';
		for (let i = 7; i < 10; i++) col += line[i] === 'R' ? '1' : '0';
		return parseInt(row, 2) * 8 + parseInt(col, 2);
	}).sort((a, b) => a - b);
	for (let i = 1; i < data.length; i++) if (data[i + 1] !== data[i] + 1) return [data[data.length - 1], data[i] + 1];
}