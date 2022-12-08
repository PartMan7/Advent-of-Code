exports.runs = 10;

exports.solve = function (input) {
	let data = input.split('\n');
	// return data.map(line => line.split(' ').filter(s => [2, 3, 4, 7].includes(s.length)).length).reduce((a, b) => a + b) - data.length * 4;
	let ans1, ans2;
	const truth = {
		'0': ['A', 'B', 'C', 'E', 'F', 'G'],
		'1': ['C', 'F'],
		'2': ['A', 'C', 'D', 'E', 'G'],
		'3': ['A', 'C', 'D', 'F', 'G'],
		'4': ['B', 'C', 'D', 'F'],
		'5': ['A', 'B', 'D', 'F', 'G'],
		'6': ['A', 'B', 'D', 'E', 'F', 'G'],
		'7': ['A', 'C', 'F'],
		'8': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
		'9': ['A', 'B', 'C', 'D', 'F', 'G']
	};
	const outmap = {};
	Object.entries(truth).forEach(([k, v]) => outmap[v.join('').toLowerCase()] = ~~k);
	function extract (line) {
		let [bases, out] = line.split(' | ');
		bases = bases.split(' ');
		const objs = bases.map(base => {
			let mapped = {};
			'abcdefg'.split('').forEach(c => mapped[c] = base.includes(c));
			return mapped;
		});
		const outed = [];
		const keymap = { A: false, B: false, C: false, D: false, E: false, F: false, G: false };
		outed[4] = bases.findIndex(base => base.length === 4);
		outed[7] = bases.findIndex(base => base.length === 3);
		outed[1] = bases.findIndex(base => base.length === 2);
		keymap['A'] = bases[outed[7]].split('').find(c => !bases[outed[1]].includes(c));
		const sixes = bases.filter(base => base.length === 6);
		const slets = 'abcdefg'.split('').filter(c => sixes.filter(six => six.includes(c)).length === 2);
		keymap['C'] = slets.find(c => bases[outed[1]].includes(c));
		keymap['F'] = bases[outed[1]].split('').find(c => keymap['C'] !== c);
		keymap['E'] = slets.find(c => !bases[outed[4]].includes(c));
		keymap['B'] = bases[outed[4]].split('').find(c => keymap['F'] !== c && !slets.includes(c));
		keymap['D'] = slets.find(c => keymap['C'] !== c && keymap['E'] !== c);
		const vs = Object.values(keymap);
		keymap['G'] = bases.find(base => base.length === 7).split('').find(c => !vs.includes(c));
		const extractor = {};
		'abcdefg'.split('').forEach(c => extractor[c] = false);
		Object.entries(keymap).forEach(([k, v]) => extractor[v] = k);
		const output = out.split(' ').map(digit => digit.split('').map(c => extractor[c].toLowerCase()).sort().join('')).map(num => outmap[num]);
		return output;
	}
	const fmap = data.map(extract);
	ans1 = fmap.reduce((a, b) => a + b.filter(num => [1, 4, 7, 8].includes(num)).length, 0);
	ans2 = fmap.reduce((a, b) => a + ~~(b.join('')), 0)
	return [ans1, ans2];
}