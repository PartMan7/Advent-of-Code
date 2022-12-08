exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n');
	const board = data.map(line => line.split('').map(n => ~~n));
	const clone = board.map(r => r.slice());
	let totalFlashes = 0, ans2;
	for (let i = 0; i < 100; i++) {
		const flashes = [];
		clone.forEach(r => r.forEach((c, i) => r[i]++));
		while (true) {
			let flashed = false;
			clone.forEach((r, i) => {
				r.forEach((c, j) => {
					if (c > 9 && !flashes.includes(`${i}|${j}`)) {
						flashes.push(`${i}|${j}`);
						flashed = true;
						const is = [], js = [];
						if (i > 0) is.push(i - 1);
						is.push(i);
						if (i < 9) is.push(i + 1);
						if (j > 0) js.push(j - 1);
						js.push(j);
						if (j < 9) js.push(j + 1);
						is.forEach(I => js.forEach(J => clone[I][J]++));
					}
				});
			});
			if (!flashed) break;
		}
		for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) if (clone[x][y] > 9) clone[x][y] = 0;
		if (flashes.length === 100) ans2 = i;
		totalFlashes += flashes.length;
	}
	if (ans2) return [totalFlashes, ans2 + 1];
	for (let i = 100; i < 10000; i++) {
		const flashes = [];
		clone.forEach(r => r.forEach((c, i) => r[i]++));
		while (true) {
			let flashed = false;
			clone.forEach((r, i) => {
				r.forEach((c, j) => {
					if (c > 9 && !flashes.includes(`${i}|${j}`)) {
						flashes.push(`${i}|${j}`);
						flashed = true;
						const is = [], js = [];
						if (i > 0) is.push(i - 1);
						is.push(i);
						if (i < 9) is.push(i + 1);
						if (j > 0) js.push(j - 1);
						js.push(j);
						if (j < 9) js.push(j + 1);
						is.forEach(I => js.forEach(J => clone[I][J]++));
					}
				});
			});
			if (!flashed) break;
		}
		for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) if (clone[x][y] > 9) clone[x][y] = 0;
		if (flashes.length === 100) return [totalFlashes, i + 1];
	}
	return [totalFlashes, null];
}