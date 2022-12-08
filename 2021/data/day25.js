exports.runs = 10;

exports.solve = function (input) {
	const data = input.split('\n').map(t => t.split(''));
	function travel (data) {
		let stop = true;
		for (let i = 0; i < data.length; i++) {
			let row = data[i].join('');
			const firstChar = row.charAt(0), lastChar = row.charAt(row.length - 1);
			const oldRow = row;
			row = row.replace(/>\./g, '.>');
			if (row !== oldRow) stop = false;
			data[i] = row.split('');
			if (firstChar === '.' && lastChar === '>') [data[i][0], data[i][data[i].length - 1], stop] = ['>', '.', false];
		}
		for (let i = 0; i < data[0].length; i++) {
			let col = data.map(line => line[i]).join('');
			const firstChar = col.charAt(0), lastChar = col.charAt(col.length - 1);
			const oldCol = col;
			col = col.replace(/v\./g, '.v');
			if (col !== oldCol) stop = false;
			col.split('').forEach((c, k) => data[k][i] = c);
			if (firstChar === '.' && lastChar === 'v') [data[0][i], data[data.length - 1][i], stop] = ['v', '.', false];
		}
		return stop;
	}
	function display (dt) {
		console.log(dt.map(r => r.map(c => c || '.').join('')).join('\n'));
		console.log('='.repeat(30));
	}
	let i = 1;
	while (!travel(data)) i++;
	return [i];
}