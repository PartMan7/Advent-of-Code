exports.runs = 200;

exports.solve = function (input) {
	let data = input.split('\n');
	let ans1 = 0, ans2 = 0;
	for (let line of data) {
		let min = String(parseInt(line)), max = String(parseInt(line.substr(min.length + 1))), char = line[min.length + max.length + 2], password = line.substr(min.length + max.length + 5);
		let freq = 0;
		for (let i = 0; i < password.length; i++) if (password[i] === char) freq++;
		if (freq >= min && freq <= max) ans1++;
		let f1 = password[min - 1] === char, f2 = password[max - 1] === char;
		if ((f1 && !f2) || (!f1 && f2)) ans2++;
	}
	return [ans1, ans2];
}