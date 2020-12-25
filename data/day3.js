exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split('\n'), width = data[0].length;
	function slopeOf(x, y) {
		let i = 0, j = 0, row, hits = 0;
		while (row = data[i]) {
			if (row[j % width] === '#') hits++;
			i += x;
			j += y;
		}
		return hits;
	}
	return [slopeOf(1, 3), [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]].reduce((acc, cur) => acc * slopeOf(...cur), 1)];
}