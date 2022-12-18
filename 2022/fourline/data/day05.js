exports.runs = 1000;

exports.solve = function (fileString) {
	// And henceforth the chaos began
	const input = fileString.trimEnd().split('\n\n').map((v, i) => i ? v.split('\n') : v.split('\n').slice(0, -1));
	const ans1 = ((stacks = (row => input[0].slice().reverse().forEach(line => line.split('').filter((_, i) => i % 4 === 1).forEach((char, i) => char !== ' ' ? row[i].push(char) : 0)) || row)(Array.from({ length: (input[0].at(-1).length + 1) / 4 }).map(() => []))) => input[1].forEach(m => m.split(' ').filter(word => ~~word).forEach((_, i, [amt, from, to]) => i ? 0 : stacks[to - 1].push(...stacks[from - 1].splice(-amt).reverse()))) || stacks.map(stack => stack.pop()).join(''))();
	const ans2 = ((stacks = (row => input[0].slice().reverse().forEach(line => line.split('').filter((_, i) => i % 4 === 1).forEach((char, i) => char !== ' ' ? row[i].push(char) : 0)) || row)(Array.from({ length: (input[0].at(-1).length + 1) / 4 }).map(() => []))) => input[1].forEach(m => m.split(' ').filter(word => ~~word).forEach((_, i, [amt, from, to]) => i ? 0 : stacks[to - 1].push(...stacks[from - 1].splice(-amt)))) || stacks.map(stack => stack.pop()).join(''))();
	return [ans1, ans2];
};
