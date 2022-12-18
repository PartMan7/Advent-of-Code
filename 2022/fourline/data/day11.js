exports.runs = 10;

exports.solve = function (fileString) {
	const input = (getOp = (line => line[2] === 'old' ? ((line[1] === '+') ? (num => num + num) : (num => num * num)): (other => (line[1] === '+') ? (num => num + other) : (num => num * other))(~~line[2]))) => fileString.trim().split('\n\n').map(monkey => ((lines, out) => ![lines.shift(), out.items = lines.shift().substr(18).split(', ').map(num => ~~num), out.operation = getOp(lines.shift().substr(19).split(' ')), out.mod = ~~(lines.shift().substr(21)), out.decision = lines.map(line => ~~line.split(':')[1].substr(17))] || out)(monkey.split('\n'), { count: 0 }));
	const ans1 = (monkeys => Array.from({ length: 20 }).forEach(() => monkeys.forEach(monkey => monkey.items.forEach(worry => (newWorry => monkeys[monkey.decision[+!!(newWorry % monkey.mod)]].items.push(newWorry))(Math.floor(monkey.operation(worry) / 3))) || ((monkey.count += monkey.items.length) && (monkey.items = [])))) || monkeys)(input()).map(monkey => monkey.count).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
	const ans2 = (monkeys => (globalMod => Array.from({ length: 10000 }).forEach(() => monkeys.forEach(monkey => monkey.items.forEach(worry => (newWorry => monkeys[monkey.decision[+!!(newWorry % monkey.mod)]].items.push(newWorry))(monkey.operation(worry) % globalMod)) || ((monkey.count += monkey.items.length) && (monkey.items = [])))) || monkeys)(monkeys.reduce((a, b) => a * b.mod, 1)))(input()).map(monkey => monkey.count).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);
	return [ans1, ans2];
};
