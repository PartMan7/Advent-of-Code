exports.runs = 2;

exports.solve = function (input) {
	/*let [_match, x1, x2, y1, y2] = input.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/);
	[x1, x2, y1, y2] = [x1, x2, y1, y2].map(n => ~~n);
	const ans1 = [Math.max(Math.abs(y1), Math.abs(y2))].map(n => n * (n - 1) / 2)[0];
	const rangesets = [];
	const infinX = [];
	const xs = [x1, x2].sort((a, b) => a - b);
	const ys = [y1, y2].sort((a, b) => a - b);
	const testX = x => xs[0] <= x && x <= xs[1];
	for (let i = 2; true; i++) {
		const summed = i * (i + 1) / 2;
		if (testX(summed)) infinX[i] = summed;
		else if (summed > xs[1]) break;
	}
	const endTime = 2 * (Math.max(Math.abs(y1), Math.abs(y2))) + 1;
	const points = [];
	let infinable = [];
	for (let time = 1; time < endTime; time++) {
		// 'time' is the time for this batch of valid points
		const push = [];
		if (infinX[time - 1]) infinable.push(time - 1);
		const minX = (xs[0] * 2 / (time) + (time - 1)) / 2;
		let maxX = (xs[1] * 2 / (time) + (time - 1)) / 2;
		if (infinable.at(-1) < maxX) console.log('!', maxX, maxX = infinable.at(-1) - 0.1);
		const validX = Math.floor(maxX) - Math.ceil(minX) + 1;
		const minY = (ys[0] * 2 / (time) + (time - 1)) / 2;
		const maxY = (ys[1] * 2 / (time) + (time - 1)) / 2;
		const validY = Math.floor(maxY) - Math.ceil(minY) + 1;
		// if (time === 12) console.log({ validX, validY, minX, maxX, minY, maxY, infinable });
		for (let i = Math.ceil(minX); i <= Math.floor(maxX); i++) for (let j = Math.ceil(minY); j <= Math.floor(maxY); j++) push.push([i, j]);
		infinable.forEach((i) => {
			if (i >= Math.ceil(minX) && i <= Math.floor(maxX)) console.log(`DUPE`, i, minX, maxX, time);
			for (let j = Math.ceil(minY); j <= Math.floor(maxY); j++) push.push([i, j]);
		});
		// console.log(time, infinable);
		if (validX <= 0 || validY <= 0) rangesets.push(0);
		rangesets.push((validX + infinable.length) * validY);
		points.push(push);
	}
	points.forEach((l, i) => {
		console.log('> ', i + 1, `(${l.length})`);
		console.log(l.map(r => {
			//
			const until = Math.max(0, r[0] - i);
			const finalX = (r[0] + until) * (r[0] - until + 1) / 2;
			return [r, [finalX, (2 * r[1] - i) * (i + 1) / 2]].join(' | ');
		}).join('\n'));
		console.log('');
	});
	let lens = points.map(r => r.length);
	console.log(lens.join('+'), `=`, lens.reduce((a, b) => a + b, 0));
	console.log('===');
	console.log(points.flat().join('\n'));
	console.log('===');*/
	///////
	const [x1, x2, y1, y2] = input
			.match(/(-{0,1}\d+)/g)
			.map(n => parseInt(n, 10));

		const stepsY = new Map();
		const velocities = new Set();

		let maxHeight = 0;

		for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			for (let ny = 1;; ny++) { // number of steps
				const vy = y/ny + (ny - 1)/2;

				if (ny > 2 * Math.abs(y)) {
					// vy is not an integer
					break;
				}

				if (Number.isInteger(vy)) {
					const h = vy/2 * (vy + 1);

					if (h > maxHeight) {
						maxHeight = h;
					}

					if (!stepsY.has(ny)) {
						stepsY.set(ny, new Set());
					}

					stepsY.get(ny).add(vy);
				}
			}
		}

		for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			for (let nx = 1;; nx++) { // number of steps
				const vx = x/nx + (nx - 1)/2;

				if (nx > vx) {
					// vx is 0 in nx steps
					break;
				}

				if (Number.isInteger(vx)) {
					stepsY.forEach((Vy, ny) => {
						if (ny === nx || (vx === nx && ny > nx)) {
							// x steps = y steps or vx = n (then it's 0 in n steps)
							// so that we can make more steps with the same x
							for (const vy of Vy) {
								velocities.add(`${vx},${vy}`);
							}
						}
					});
				}
			}
		}

		console.log('max height:', maxHeight);
		console.log('possible velocities:', velocities.size);
	// return [ans1, rangesets.reduce((a, b) => a + b, 0)];
}