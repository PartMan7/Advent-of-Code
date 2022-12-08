exports.runs = 500;

exports.solve = function (input) {
	let data = input.split('\n').map(l => l.split('-'));
	const connections = {};
	data.forEach(([a, b]) => {
		if (!connections[a]) connections[a] = new Set();
		if (!connections[b]) connections[b] = new Set();
		connections[a].add(b);
		connections[b].add(a);
	});
	function recurse1 (current, smalls) {
		if (current === 'end') return [1];
		const ns = [...connections[current]].filter(cave => !smalls.has(cave));
		if (!ns.length) return [];
		return ns.map(cave => {
			const nSmalls = new Set(smalls);
			if (cave === cave.toLowerCase()) nSmalls.add(cave);
			return recurse1(cave, nSmalls);
		}).flat();
	}
	function recurse2 (current, smalls, spec) {
		if (current === 'end') return [1];
		const ns = [...connections[current]].filter(cave => !smalls.has(cave));
		const pres = (() => {
			if (!ns.length) return [];
			return ns.map(cave => {
				const nSmalls = new Set(smalls);
				if (cave === cave.toLowerCase()) nSmalls.add(cave);
				return recurse2(cave, nSmalls, spec);
			}).flat();
		})();
		if (spec) return pres;
		[...connections[current]].filter(cave => smalls.has(cave) && cave !== 'start').forEach(cave => {
			pres.push(...recurse2(cave, smalls, cave));
		});
		return pres;
	}
	const out1 = recurse1('start', new Set(['start']));
	const out2 = recurse2('start', new Set(['start']));
	return [out1.length, out2.length];
}