exports.runs = 1000;

exports.solve = function (fileString) {
	const input = (input => ![input.elves = Object.keys(input.set).length] || input)(({ set: Object.fromEntries(fileString.trim().split('\n').map((r, i) => r.split('').map((c, j) => c === '#' ? [`${i},${j}`, true] : null)).flat().filter(t => t)), dirs: ['NE,N,NW', 'SW,S,SE', 'NW,W,SW', 'SE,E,NE', 'NE,N,NW', 'SW,S,SE', 'NW,W,SW'].map(t => t.split(',').map(d => [/[NS]/.test(d) ? (d.charAt(0) === 'N' ? -1 : 1) : 0, /[EW]/.test(d) ? (d.at(-1) === 'W' ? -1 : 1) : 0])), move: (count, proposed = {}, mapping = {}, output = {}, nonMoving = 0) => (mDirs => Object.keys(input.set).forEach(v => (([x, y]) => (pDel => [proposed[[x + pDel[0], y + pDel[1]].join(',')] = proposed[[x + pDel[0], y + pDel[1]].join(',')] ? true : 1, mapping[v] = [x + pDel[0], y + pDel[1]].join(',')])(([-1, 0, 1].every(i => [-1, 0, 1].every(j => !(i || j) || !input.set[`${x + i},${y + j}`]))) ? ![nonMoving++] || [0, 0] : mDirs.find((dels) => dels.every(([i, j]) => !input.set[`${x + i},${y + j}`]))?.[1] || [0, 0]))(v.split(',').map(n => ~~n))))(input.dirs.slice(count % 4, count % 4 + 4)) || ![Object.entries(mapping).forEach(([k, v]) => output[proposed[v] === true ? k : v] = true), input.set = output] || nonMoving === input.elves }));
	const ans1 = Array.from({ length: 10 }).forEach((_, i) => input.move(i)) || ((vals => [vals.map(n => n[0]), vals.map(n => n[1])].reduce((a, b) => a * (1 + Math.max(...b) - Math.min(...b)), 1))(Object.keys(input.set).map(v => v.split(',').map(n => ~~n)))) - input.elves;
	const ans2 = ((While, i, flag) => !While(() => !flag, () => ((res => flag = res)(input.move(i++)))) || i)((w => w = (cond, code) => cond() && [code(), w(cond, code)])(), 10, false);
	return [ans1, ans2];
};
