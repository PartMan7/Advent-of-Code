exports.runs = 10;

exports.solve = function (input) {
	let data = input.split('\n\n');
	let rules = data[0].split('\n'), cases = data[1].split('\n');
	let rulebox = {};
	rules.forEach(rule => {
		let split = rule.split(': ');
		if (rule.indexOf('"') === -1) rulebox[split[0]] = split[1].split(' | ').map(term => term.split(' '));
		else rulebox[split[0]] = split[1].charAt(1);
	});
	let ans1 = 0, ans2 = 0, exit = false, second = false;
	function validate (line, num, log) {
		if (exit && second) return false;
		let rule = rulebox[num];
		if (typeof rule === 'string') {
			if (line[0] === rule) {
				if (log && line.length === 1) exit = (ans2++ + 1);
				return 1;
			}
			else return false;
		}
		for (let i = 0; i < rule.length; i++) {
			let tRule = rule[i], temp = line;
			let valuate = tRule.reduce((acc, cur) => {
				if (acc === false) return false;
				let val = validate(temp, cur, log);
				if (typeof val === 'number') {
					temp = temp.substr(val);
					return acc + val;
				}
				return false;
			}, 0);
			if (typeof valuate === 'number') return valuate;
		}
		return false;
	}
	cases.forEach(line => {
		let val = validate(line, 0);
		if (line.length === val) ans1++;
	});
	rulebox[8] = [[42], [42, 8]];
	rulebox[11] = [[42, 31], [42, 11, 31]];
	cases.forEach(line => {
		exit = false;
		let val = validate(line, 0, line);
	});
	let a2 = ans2;
	[second, ans2] = [true, 0];
	cases.forEach(line => {
		exit = false;
		let val = validate(line, 0, line);
	});
	return [ans1, 2 * ans2 - a2];
}