exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n').map(line => line.split('').map(n => ~~n));
	let lows = [];
	for (let i = 0; i < data.length; i++) for (let j = 0; j < data[0].length; j++) {
		let explore = [[i - 1, i + 1], [j - 1, j + 1]];
		if (i === 0) explore[0].shift();
		else if (i === data.length - 1) explore[0].pop();
		if (j === 0) explore[1].shift();
		else if (j === data[0].length - 1) explore[1].pop();
		const num = data[i][j];
		if (explore[0].some(I => data[I][j] <= num)) continue;
		else if (explore[1].some(J => data[i][J] <= num)) continue;
		lows.push([i, j]);
	}
	/*function basin (i, j, num, coords) {
		// look for all points with n+1
		if (num === 8) return coords;
		let explore = [[i - 1, i + 1], [j - 1, j + 1]];
		if (i === 0) explore[0].shift();
		else if (i === data.length - 1) explore[0].pop();
		if (j === 0) explore[1].shift();
		else if (j === data[0].length - 1) explore[1].pop();
		explore[0].forEach(I => {
			if (data[I][j] === num + 1) {
				if (coords.map(c => c.join('|')).includes(`${I}|${j}`)) return;
				coords.push([I, j]);
				basin(I, j, data[I][j], coords);
			}
		});
		explore[1].forEach(J => {
			if (data[i][J] === num + 1) {
				if (coords.map(c => c.join('|')).includes(`${i}|${J}`)) return;
				coords.push([i, J]);
				basin(i, J, data[i][J], coords);
			}
		});
		return coords;
	}
	const basins = lows.map(low => basin(...low, data[low[0]][low[1]], [low]));*/
	const cloned = data.map(row => row.slice()), tClone = data.map(r => r.slice());
	/*basins.sort((a, b) => b.length - a.length);
	basins.slice(0, 3).flat().forEach(([i, j]) => {
		if (typeof cloned[i][j] === 'string') return;
		cloned[i][j] = `\u001b[31m${cloned[i][j]}\u001b[0m`;
	});
	basins.slice(3).flat().forEach(([i, j]) => {
		if (typeof cloned[i][j] === 'string') return;
		cloned[i][j] = `\u001b[32m${cloned[i][j]}\u001b[0m`;
	});
	console.log(cloned.map(row => row.join(' ')).join('\n'));
	const colors = ["\u001b[31m", "\u001b[31;1m", "\u001b[35m", "\u001b[33m", "\u001b[32m", "\u001b[36;1m", "\u001b[36m", "\u001b[34m", "\u001b[35;1m", "\u001b[37;1m"];
	const sClone = data.map(r => r.map(c => colors[c] + c + "\u001b[0m"));
	console.log('');
	console.log(sClone.map(row => row.join(' ')).join('\n'));
	console.log(basins.map(b => b.length).slice(0, 3).reduce((a, b) => a * b, 1));*/
	function nav (i, j, coords, depth) {
		const num = data[i][j];
		let explore = [[i - 1, i + 1], [j - 1, j + 1]];
		if (i === 0) explore[0].shift();
		else if (i === data.length - 1) explore[0].pop();
		if (j === 0) explore[1].shift();
		else if (j === data[0].length - 1) explore[1].pop();
		explore[0].forEach(I => {
			if (data[I][j] === 9) return;
			if (data[I][j] < num) return;
			if (coords.has(`${I}|${j}`)) return;
			coords.add(`${I}|${j}`);
			nav(I, j, coords, depth + 1);
		});
		explore[1].forEach(J => {
			if (data[i][J] === 9) return;
			if (data[i][J] < num) return;
			if (coords.has(`${i}|${J}`)) return;
			coords.add(`${i}|${J}`);
			nav(i, J, coords, depth + 1);
		});
		return [...coords];
	}
	// return nav(...lows[11], new Set([lows[11].join('|')]), 0);
	const actualBasins = lows.map(low => nav(...low, new Set([low.join('|')]), 0)).sort((a, b) => b.length - a.length);
	console.log(lows[11]);
	actualBasins.sort((a, b) => b.length - a.length);
	actualBasins.slice(0, 3).flat().forEach((c) => {
		const [i, j] = c.split('|');
		if (typeof tClone[i][j] === 'string') return;
		tClone[i][j] = `\u001b[31m${tClone[i][j]}\u001b[0m`;
	});
	actualBasins.slice(3).flat().forEach((c) => {
		const [i, j] = c.split('|');
		if (typeof tClone[i][j] === 'string') return;
		tClone[i][j] = `\u001b[32m${tClone[i][j]}\u001b[0m`;
	});
	console.log(tClone.map(row => row.map(c => c === 9 ? ' ' : c).join(' ')).join('\n'));
	console.log(actualBasins.map(b => b.length).slice(0, 3));
	return [lows.map(([x, y]) => data[x][y]).reduce((a, b) => a + b) + lows.length];
}