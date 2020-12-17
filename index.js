const options = {
	'once-each': false,
	'test': false
}

const fs = require('fs'), files = fs.readdirSync('./data'), days = {}, data = {}, solutions = {}, times = {}, runs = {}, puzzles = [{}], initTime = process.uptime();

let i;

for (i = 1; files.includes(`day${i}.js`); i++) {
	days[i] = require(`./data/day${i}.js`);
	data[i] = fs.readFileSync(`./data/data${i}.txt`, 'utf8');
}

if (options.test) {
	if (Array.isArray(options.test)) options.test.forEach(n => {
		let startTime = process.uptime();
		console.log(days[n].solve(data[n]));
		console.log(`Puzzle #${n} completed in ${(process.uptime() - startTime) * 1000}ms.`);
	});
	else {
		let n = options.test;
		let startTime = process.uptime();
		console.log(days[n].solve(data[n]));
		console.log(`Puzzle #${n} completed in ${(process.uptime() - startTime) * 1000}ms.`);
	}
	return;
}
else for (let j = 1; j < i; j++) {
	runs[j] = options['once-each'] ? 1 : days[j].runs;
	let runAmt = runs[j];
	let solve = days[j].solve;
	let startTime = process.uptime();
	solutions[j] = solve(data[j]);
	for (let z = 1; z < runAmt; z++) solve(data[j]);
	let endTime = process.uptime();
	times[j] = (endTime - startTime) * 1000;
}

for (let j = 1; j < i; j++) {
	const puzzle = {};
	puzzle["Part 1"] = solutions[j][0];
	puzzle["Part 2"] = solutions[j][1];
	puzzle["Avg Runtime"] = Math.round(times[j] * 1000) / (1000 * runs[j]) + 'ms';
	puzzle["Runs"] = runs[j];
	puzzle["Total Runtime"] = Math.round(times[j] * 1000) / 1000 + 'ms';
	puzzles.push(puzzle);
}

console.table(puzzles);

console.log(`Process completed in ${(process.uptime() - initTime) * 1000}ms.`);