exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n\n');
	let permit = new Set(), rules = data[0].split('\n'), own = data[1].split('\n')[1].split(','), near = data[2].split('\n').map(row => row.split(',').map(term => ~~term)), width = near[1].length, labels = Array.from({length: width}).map(blank => Array.from({length: width})), classes = {}, rate = 0, finals = Array.from({length: width}), ans2 = 1;

	near.shift();

	for (let i = 0; i < rules.length; i++) {
		let split = rules[i].split(': ');
		let nums = split[1].split(' or ');
		let [start1, end1] = nums[0].split('-').map(term => ~~term), [start2, end2] = nums[1].split('-').map(term => ~~term);
		for (let j = start1; j <= end1; j++) permit.add(j);
		for (let j = start2; j <= end2; j++) permit.add(j);
		for (let j = 0; j < width; j++) labels[j][i] = [start1, end1, start2, end2];
		classes[`${start1},${end1},${start2},${end2}`] = split[0];
	}

	for (let i = 0; i < near.length; i++) {
		let ticket = near[i];
		let flag = true;
		for (let j = 0; j < ticket.length; j++) if (!permit.has(ticket[j])) {
			rate += ticket[j];
			flag = false;
		}
		if (flag) {
			for (let j = 0; j < width; j++) {
				let label = labels[j], dur = label.length, remIndex = [];
				for (let k = 0; k < dur; k++) {
					let val = ticket[j];
					if (!(label[k][0] <= val && label[k][1] >= val) && !(label[k][2] <= val && label[k][3] >= val)) remIndex.push(k);
				}
				labels[j] = labels[j].filter((blank, index) => !remIndex.includes(index));
			}
		}
	}

	while (true) {
		let flag = true;
		for (let i = 0; i < labels.length; i++) if (labels[i].length === 1) {
			let temp = labels[i][0];
			finals[i] = classes[temp.join(',')];
			if (finals[i].startsWith('departure')) ans2 *= own[i];
			for (let j = 0; j < width; j++) labels[j] = labels[j].filter(term => {
				if (term[0] !== temp[0] || term[1] !== temp[1] || term[2] !== temp[2] || term[3] !== temp[3]) return true;
			});
			flag = false;
			break;
		}
		if (flag) break;
	}

	return [rate, ans2];
}