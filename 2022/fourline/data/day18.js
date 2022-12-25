exports.runs = 1000;

exports.solve = function (fileString) {
	const input = (input => input.cubes.forEach(cube => input.hashmap.set(cube.join(','), true)) || input)({ cubes: fileString.trim().split('\n').map(r => r.split(',').map(n => ~~n)), hashmap: new Map() });
	const ans1 = ((exposedFaces = 0) => input.cubes.forEach(cube => [0, 1, 2].forEach(x => [-1, 1].forEach(a => exposedFaces += +!input.hashmap.get(cube.map((v, i) => i === x ? v + a : v).join(','))))) || exposedFaces)();
	const ans2 = (exterior => (([minX, maxX], [minY, maxY], [minZ, maxZ]) => ((visited, toVisit) => Array.from({ length: 2 ** 20 }).find((_, i) => (toVisit.length) ? !(visit => (visited.has(visit.join(','))) || [visited.add(visit.join(',')), [0, 1, 2].forEach(x => [-1, 1].forEach(a => (next => (!(minX <= next[0] && next[0] <= maxX) || !(minY <= next[1] && next[1] <= maxY) || !(minZ <= next[2] && next[2] <= maxZ)) || ((input.hashmap.get(next.join(','))) ? exterior++ : toVisit.push(next)))(visit.map((v, i) => i === x ? v + a : v))))])(toVisit.shift()) : true))(new Set(), [[minX, minY, minZ]], 0))(...(range => [0, 1, 2].map(i => range(input.cubes.map(n => n[i]))))(vals => [Math.min(...vals) - 1, Math.max(...vals) + 1])) || exterior)(0);
	return [ans1, ans2];
};
