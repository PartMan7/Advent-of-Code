exports.runs = 1000;

exports.solve = function (fileString) {
	const input = (input => ![input.lines2 = input.lines1.map(r => r.slice()), input.lines2.forEach(m => [(m[0] === 'root') && ([m[0], m[1], m[2], m[3]] = [m[3], m[1], '+', 0]), (m[0] === 'humn') && (m[0] = 'human')]), [input.lines1, input.lines2].forEach(lines => ((toRep, While) => While(() => toRep.length, (next = []) => [toRep.forEach(n => lines.filter(m => m[2]).forEach(m => (m.filter((v, i) => v === n[0] ? [m[i] = n[1]] : null).length) && (() => (typeof m[1] === 'number' && typeof m[3] === 'number') ? [m[1] = ((o, b, c) => ({ '+': () => b + c, '-': () => b - c, '*': () => b * c, '/': () => b / c })[o]())(m[2], m[1], m[3]), m.length = 2, next.push(m)] : (typeof m[0] === 'number' && typeof m[1] === 'number') ? [[m[0], m[1]] = [m[3], ((o, a, b) => ({ '+': () => a - b, '-': () => b - a, '*': () => a / b, '/': () => b / a })[o]())(m[2], m[0], m[1])], m.length = 2, next.push(m)] : (typeof m[0] === 'number' && typeof m[3] === 'number') ? [[m[0], m[1]] = [m[1], ((o, a, c) => ({ '+': () => a - c, '-': () => a + c, '*': () => a / c, '/': () => a * c })[o]())(m[2], m[0], m[3])], m.length = 2, next.push(m)] : null)())), toRep = next]))(lines.filter(m => !m[2]), ((While => While = (cond, code) => !cond() || [code(), While(cond, code)])())))] || input)({ lines1: fileString.trim().split('\n').map(line => line.split(': ').map(part => part.split(' ').map(p => ~~p || p)).flat()) });
	const ans1 = input.lines1.find(r => r[0] === 'root')?.[1];
	const ans2 = input.lines2.find(r => r[0] === 'humn')?.[1];
	return [ans1, ans2];
};
