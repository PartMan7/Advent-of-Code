exports.runs = 2;

exports.solve = function (input) {
	let data = input.split('\n');
	let hexes = {};
	data.forEach(line => {
		let steps = [], old = false, len = line.length, coords = [0, 0];
		for (let i = 0; i < len; i++) {
			let char = line.charAt(i);
			if (char === 'n' || char === 's') {
				old = char;
				continue;
			}
			let step = char;
			if (old) step = old + step;
			old = false;
			switch (step) {
				case 'e': coords[0] += 1; break;
				case 'w': coords[0] -= 1; break;
				case 'se': coords[0] += 0.5; coords[1] -= 1; break;
				case 'sw': coords[0] -= 0.5; coords[1] -= 1; break;
				case 'ne': coords[0] += 0.5; coords[1] += 1; break;
				case 'nw': coords[0] -= 0.5; coords[1] += 1; break;
			}
		}
		let str = coords[0] + '|' + coords[1];
		hexes[str] = !hexes[str];
	});
	Object.keys(hexes).forEach(hex => {
		if (!hexes[hex]) delete hexes[hex];
	});
	let ans1 = Object.values(hexes).length;
	function burst (coords) {
		return [[1, 0], [-1, 0], [0.5, -1], [-0.5, -1], [0.5, 1], [-0.5, 1]].map(term => [coords[0] + term[0], coords[1] + term[1]]);
	}
	function nextDay () {
		let next = {};
		Object.keys(hexes).forEach(pos => {
			let coords = pos.split('|').map(t => -(-t));
			burst(coords).forEach(pos => {
				let str = pos.join('|');
				if (!next[str]) next[str] = 0;
				next[str]++;
			});
		});
		Object.keys(next).forEach(pos => {
			if (hexes[pos]) {
				if (next[pos] === 0 || next[pos] > 2) return delete next[pos];
			}
			else if (next[pos] !== 2) delete next[pos];
		});
		hexes = next;
	}
	for (let i = 0; i < 100; i++) nextDay();
	return [ans1, Object.keys(hexes).length];
}