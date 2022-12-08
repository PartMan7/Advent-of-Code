exports.runs = 1000;

exports.solve = function (input) {
	let lines = input.split('\n');
	const illegal = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137
	}, cmpl = {
		")": 1,
		"]": 2,
		"}": 3,
		">": 4
	};
	function open (char) {
		return "<{[(".includes(char);
	}
	function close (char) {
		return ({ "(": ")", "[": "]", "{": "}", "<": ">" })[char];
	}
	let corp = 0;
	const incmp = [];
	lines.forEach(line => {
		let comp = 0;
		const met = [];
		for (let char of line.split('')) {
			if (open(char)) met.push(char);
			else {
				const shouldbe = close(met.at(-1));
				if (shouldbe !== char) {
					return corp += illegal[char];
				} else met.pop();
			}
		}
		met.reverse().map(close).forEach(char => {
			comp *= 5;
			comp += cmpl[char];
		});
		incmp.push(comp);
	});
	return [corp, incmp.sort((a, b) => a - b)[(incmp.length - 1) / 2]];
}