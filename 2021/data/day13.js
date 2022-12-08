exports.runs = 1000;

exports.solve = function (input) {
	let [octs, folds] = input.split('\n\n').map(g => g.split('\n'));
	octs = octs.map(line => line.split(',').map(n => ~~n));
	folds = folds.map(line => line.substr(11).split('='));
	folds.forEach(line => line[1] = ~~line[1]);
	let maxX = -1, maxY = -1;
	octs.forEach(([x, y]) => {
		if (maxX < x) maxX = x;
		if (maxY < y) maxY = y;
	});
	// dimensions = maxX, maxY
	// .-----> X
	// |
	// |
	// |
	// v Y
	[maxX++, maxY++];
	function display (pap) {
		console.log('');
		console.log(pap.map(r => r.map(c => c ? '#' : ' ').join('')).join('\n'));
		console.log('');
	}
	function count (pap) {
		return pap.map(r => r.reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
	}
	const paper = Array.from({ length: maxY }).map(() => Array(maxX ).fill(0));
	octs.forEach(([x, y]) => {
		paper[y][x] = 1;
	});
	function foldX (pap, val) {
		const clone = pap.map(r => r.slice());
		for (let i = 1; i < maxX - val && i <= val; i++) clone.forEach(line => line[val - i] = Number(line[val - i] || line[val + i]));
		clone.forEach(row => row.splice(val, maxX - val));
		return clone;
	}
	function foldY (pap, val) {
		const clone = pap.map(r => r.slice());
		for (let i = 1; i < maxY - val && i <= val; i++) {
			for (let j = 0; j < maxX; j++) clone[val - i][j] = Number(clone[val - i][j] || clone[val + i][j]);
		}
		clone.splice(val, maxY - val);
		return clone;
	}
	function fold (pap, note) {
		if (note[0] === 'x') return foldX(pap, note[1]);
		else if (note[0] === 'y') return foldY(pap, note[1]);
		else return null;
	}
	
	let FF = fold(paper, folds.shift());
	const ans1 = count(FF);
	while (folds.length) FF = fold(FF, folds.shift());
	FF.forEach(line => line.length = 40);
	return [ans1, display(FF)];
}