exports.runs = 200;

exports.solve = function (input) {
	let data = input.split('\n').map(line => line.split(' -> ').map(c => c.split(',').map(n => ~~n)));
	function maxOf (arr) {
		let max = -1;
		arr.forEach(e => {
			if (e > max) max = e;
		});
		return max;
	}
	const dims = [maxOf(data.map(line => [line[0][0], line[1][0]]).flat()), maxOf(data.map(line => [line[0][1], line[1][1]]).flat())];
	const grid1 = Array.from({ length: dims[0] + 2 }).map(() => Array.from({ length: dims[1] + 2 }).fill(0)), grid2 = grid1.map(r => r.slice());
	data.forEach(line => {
		if (line[0][0] === line[1][0]) {
			const offset = Math.sign(line[1][1] - line[0][1]);
			for (let i = line[0][1]; i !== line[1][1]; i += offset) [grid1[line[0][0]][i]++, grid2[line[0][0]][i]++];
			grid1[line[0][0]][line[1][1]]++;
			grid2[line[0][0]][line[1][1]]++;
		} else if (line[0][1] === line[1][1]) {
			const offset = Math.sign(line[1][0] - line[0][0]);
			for (let i = line[0][0]; i !== line[1][0]; i += offset) [grid1[i][line[0][1]]++, grid2[i][line[0][1]]++];
			grid1[line[1][0]][line[0][1]]++;
			grid2[line[1][0]][line[0][1]]++;
		} else {
			const start = line[0], end = line[1];
			const o_i = Math.sign(end[0] - start[0]), o_j = Math.sign(end[1] - start[1]);
			for (let i = start[0], j = start[1]; i !== end[0]; [i += o_i, j += o_j]) grid2[i][j]++;
			grid2[end[0]][end[1]]++;
		}
	});
	let ans1 = grid1.flat().filter(cell => cell > 1).length;
	let ans2 = grid2.flat().filter(cell => cell > 1).length;
	return [ans1, ans2];
}