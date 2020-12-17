exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n').map(term => parseInt(term));
	let target, maxIndex, depth = 25;
	for (let i = depth; i < data.length; i++) {
		let terms = data.slice(i - depth, i).sort((a, b) => a - b);
		if (!(() => {
			for (let j = 0; j < depth - 1; j++) {
				for (let k = j + 1; k < depth; k++) {
					if (terms[j] + terms[k] === data[i]) return true;
					if (terms[j] + terms[k] > data[i]) break;
				}
			}
		})()) {
			target = data[i];
			maxIndex = i;
			break;
		}
	}
	for (let i = 0; i < maxIndex - 1; i++) {
		for (let j = 2; j < maxIndex - i; j++) {
			let view = data.slice(i, i + j);
			let sum = 0, min = view[0], max = 0;
			view.forEach(term => {
				sum += term;
				if (term < min) min = term;
				else if (term > max) max = term;
			});
			if (sum > target) break;
			if (sum === target) return [target, min + max];
		}
	}
}