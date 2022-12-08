exports.runs = 100;

exports.solve = function (input) {
	let [draws, ...lines] = input.split('\n\n');
	draws = draws.split(',');
	const boards = lines.map(line => line.split(/\n */).map(row => row.split(/ +/)));
	const drawn = [];
	function checkBoard (board) {
		if (board.find(row => row.every(cell => drawn.includes(cell)))) return board.flat().reduce((a, b) => a + (drawn.includes(b) ? 0 : ~~b), 0) * ~~drawn.at(-1);
		for (let i = 0; i < board[0].length; i++) {
			const row = board.map(row => row[i]);
			if (row.every(cell => drawn.includes(cell))) return board.flat().reduce((a, b) => a + (drawn.includes(b) ? 0 : ~~b), 0) * ~~drawn.at(-1);
		}
		return null;
	}
	let last, ans1;
	while (true) {
		drawn.push(draws.shift());
		const is = boards.map((_, i) => i).map(i => checkBoard(boards[i]));
		if (!ans1) ans1 = is.find(val => val > 0);
		if (is.every(i => typeof i === 'number')) return [ans1, is[last.indexOf(null)]];
		last = is;
		continue;
	}
}