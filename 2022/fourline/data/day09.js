exports.runs = 1000;

exports.solve = function (fileString) {
	const input = fileString.trim().split('\n').map(line => line.split(' ')).map(line => [line[0], ~~line[1]]);
	const ans1 = ((knotsAmt, map, tailSet) => (knots => input.forEach(([dir, amt]) => [[0, 1].forEach(i => knots[0][i] += map[dir][i] * amt), Array.from({ length: amt }).forEach((_, i) => Array.from({ length: knotsAmt - 1 }).find((_, k) => ((head, tail) => (delta => (Math.abs(delta[0]) <= 1 && Math.abs(delta[1]) <= 1) || ([tail[0] += Math.sign(delta[0]), tail[1] += Math.sign(delta[1]), k === knotsAmt - 2 ? tailSet.add(tail.join('|')) : 0] && 0))([head[0] - tail[0], head[1] - tail[1]]))(knots[k], knots[k + 1])))]) || tailSet.size)(Array.from({ length: knotsAmt }).map(() => [0, 0])))(2, { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] }, new Set(['0|0']));
	const ans2 = ((knotsAmt, map, tailSet) => (knots => input.forEach(([dir, amt]) => [[0, 1].forEach(i => knots[0][i] += map[dir][i] * amt), Array.from({ length: amt }).forEach((_, i) => Array.from({ length: knotsAmt - 1 }).find((_, k) => ((head, tail) => (delta => (Math.abs(delta[0]) <= 1 && Math.abs(delta[1]) <= 1) || ([tail[0] += Math.sign(delta[0]), tail[1] += Math.sign(delta[1]), k === knotsAmt - 2 ? tailSet.add(tail.join('|')) : 0] && 0))([head[0] - tail[0], head[1] - tail[1]]))(knots[k], knots[k + 1])))]) || tailSet.size)(Array.from({ length: knotsAmt }).map(() => [0, 0])))(10, { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] }, new Set(['0|0']));
	return [ans1, ans2];
};
