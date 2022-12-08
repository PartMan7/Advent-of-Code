exports.runs = 10;

exports.solve = function (input) {
		let data = input.split('\n');
		function runStuff (info, alt) {
			let runs = [], acc = 0, current = 0;
			while (!runs.includes(current)) {
				if (!info[current]) return acc;
				runs.push(current);
				switch (info[current].slice(0, 3)) {
					case 'nop': {
						current++;
						break;
					}
					case 'acc': {
						acc += parseInt(info[current].slice(3));
						current++;
						break;
					}
					case 'jmp': {
						current += parseInt(info[current].slice(3));
						break;
					}
				}
			}
			return alt ? false : acc;
		}
		let ans1 = runStuff(data);
		for (let i = 0; i < data.length; i++) {
			if (data[i].slice(0, 3) === 'acc') continue;
			let other = data[i].slice(0, 3) === 'jmp' ? 'nop' : 'jmp';
			let nData = [...data.slice(0, i), (other + data[i].substr(3)), ...data.slice(i + 1)];
			let run = runStuff(nData, true);
			if (run) return [ans1, run];
		}
}