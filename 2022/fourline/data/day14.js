exports.runs = 1000;

exports.solve = function (fileString) {
	const input = { lines: fileString.trim().split('\n').map(line => line.split(' -> ').map(coords => coords.split(',').map(num => ~~num))), count: 0, loop: Array.from({ length: 50000 }), cave: {}, placeBlock: (eternal, sand = [input.source, 0]) => Array.from({ length: input.maxDepth }).find(() => (!input.cave[[sand[0], sand[1] + 1].join(',')]) ? ![sand[1]++] : (!input.cave[[sand[0] - 1, sand[1] + 1].join(',')]) ? ![sand[0]--, sand[1]++] : (!input.cave[[sand[0] + 1, sand[1] + 1].join(',')]) ? ![sand[0]++, sand[1]++] : input.cave[[sand[0], sand[1]].join(',')] = 'O') || (sand[1] === input.maxDepth && !eternal) || ![input.cave[[[sand[0]], sand[1]].join(',')] = 'O', input.count++] };
	const ans1 = ![input.maxDepth = Math.max(...input.lines.flat().map(c => c[1])) + 1, input.minStart = Math.min(...input.lines.flat().map(c => c[0])) - 1, input.lines.flat().forEach(c => c[0] -= input.minStart), input.source = 500 - input.minStart, input.lines.forEach(path => path.slice(1).forEach((to, i) => ((from, cur, delta) => Array.from({ length: Math.abs(to[0] - from[0] + to[1] - from[1]) }).forEach(() => [input.cave[[cur[0], cur[1]].join(',')] = '#', cur[0] += delta[0], cur[1] += delta[1]]) || (input.cave[[cur[0], cur[1]].join(',')] = '#'))(path[i], path[i].slice(), [to[0] - path[i][0], to[1] - path[i][1]].map(Math.sign))))] || [input.loop.find(() => input.placeBlock()), input.count][1];
	const ans2 = [input.loop.find(() => input.cave[[input.source, 0].join(',')] || input.placeBlock(true)), input.count][1];
	return [ans1, ans2];
};
