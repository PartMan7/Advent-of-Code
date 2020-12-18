exports.runs = 100;

exports.solve = function (input) {
	let data = input.split(' ').join('').split('\n');
	function evaluate1 (expression) {
		if (expression.indexOf('(') === -1) {
			let current = parseInt(expression);
			let operation;
			expression = expression.substr(String(current).length);
			while (expression.length) {
				switch (expression.charAt(0)) {
					case '+': case '*': {
						operation = expression.charAt(0);
						expression = expression.substr(1);
						break;
					}
					default: {
						let num = parseInt(expression);
						expression = expression.substr(String(num).length);
						if (operation === '+') current += num;
						else if (operation === '*') current *= num;
						break;
					}
				}
			}
			return current;
		}
		else return evaluate1(expression.replace(/\([\d+*]*\)/g, match => evaluate1(match.substr(1, match.length - 2))));
	}
	function evaluate2 (expression) {
		if (expression.indexOf('(') === -1) return expression.split('*').reduce((A, B) => A * B.split('+').reduce((a, b) => a + BigInt(b), 0n), 1n);
		else return evaluate2(expression.replace(/\([\d+*]*\)/g, match => evaluate2(match.substr(1, match.length - 2))));
	}
	return [data.map(evaluate1).reduce((a, b) => a + b, 0), Number(data.map(evaluate2).reduce((a, b) => a + b, 0n))];
}