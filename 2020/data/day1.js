exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split('\n').map(num => ~~num).sort((a, b) => a - b);
	let l = data.length;
	let info = {}, solution = [];
	for (let i = 0; i < l; i++) info[data[i]] = true;
	for (let i = 0; i < l; i++) if (info[2020 - data[i]]) {
		solution.push(data[i] * (2020 - data[i]));
		break;
	}
	(() => {
		for (let i = 0; i < l; i++) {
			for (let j = i + 1; j < l; j++) {
				if (data[i] + data[j] + data[0] > 2020) break;
				if (info[2020 - data[i] - data[j]]) return solution.push(data[i] * data[j] * (2020 - data[i] - data[j]));
			}
		}
	})();
	return solution;
}