exports.runs = 200;

exports.solve = function (input) {
	const lines = input.split('\n');
	let aim = 0;
	const pos1 = [0, 0], pos2 = [0, 0];
	lines.forEach(line => {
		const num = ~~line[line.length - 1];
		const dir = Number(Boolean(line.match(/^f/)))
		const mod = line.match(/^[df]/) ? 1 : -1;
		if (dir) {
			pos2[0] += num;
			pos2[1] += aim * num;
		} else aim += mod * num;
		pos1[dir] += mod * num;
	});
	return [Math.abs(pos1[0] * pos1[1]), Math.abs(pos2[0] * pos2[1])];
}