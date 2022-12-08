exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n');
	let width = data[0].length, height = data.length;
	function getAdj (x, y, alt, board) {
		let adj = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!i && !j) continue;
				dist: for (let m = 1; alt || m <= 1; m++) {
					if (!board[x + i * m]) break;
					switch (board[x + i * m][y + j * m]) {
						case '#': adj++; break dist;
						case '.': continue;
						default: break dist;
					}
				}
			}
		}
		return adj;
	}
	function nextBoard (board, alt) {
		let next = board.slice();
		for (let x = 0; x < height; x++) {
			for (let y = 0; y < width; y++) {
				if (board[x][y] === '.') continue;
				let adj = getAdj(x, y, alt, board);
				if (board[x][y] === 'L' && adj === 0) next[x] = next[x].substr(0, y) + '#' + next[x].substr(y + 1);
				if (board[x][y] === '#' && ((alt && adj >= 5) || (!alt && adj >= 4))) next[x] = next[x].substr(0, y) + 'L' + next[x].substr(y + 1);
			}
		}
		return next;
	}
	let current = data, last = [], runs1 = 0, runs2 = 0;
	while (current.join('\n') !== last.join('\n')) {
		last = current;
		current = nextBoard(current);
		runs1++;
	}
	let ans1 = current.join('').split('#').length - 1;
	current = data, last = [];
	while (current.join('\n') !== last.join('\n')) {
		last = current;
		current = nextBoard(current, true);
		runs2++;
	}
	return [ans1, current.join('').split('#').length - 1];
}