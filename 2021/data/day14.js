exports.runs = 10;

exports.solve = function (input) {
	let [base, rules] = input.split('\n\n');
	rules = rules.split('\n').map(line => line.split(' -> '));
	const subs = {};
	rules.forEach(rule => subs[rule[0]] = rule[1]);
	/*
	let polymer = base;
	function polymerize (polymer) {
		let out = '';
		for (let i = 0; i < polymer.length - 1; i++) {
			const sub = subs[polymer.charAt(i) + polymer.charAt(i + 1)];
			out += polymer.charAt(i);
			if (sub) out += sub;
		}
		out += polymer.charAt(polymer.length - 1);
		console.log(out.length);
		// console.log(`${polymer}->${out}`);
		return out;
	}
	for (let i = 0; i < 10; i++) polymer = polymerize(polymer);
	const polymer1 = polymer.split('');
	let ans1f = {};
	polymer1.forEach(e => {
		if (!ans1f.hasOwnProperty(e)) ans1f[e] = 0;
		ans1f[e]++;
	});
	const sorted1 = Object.entries(ans1f).sort(([e1, a1], [e2, a2]) => a1 - a2);
	const ans1 = sorted1.at(-1)[1] - sorted1[0][1];
	for (let i = 10; i < 40; i++) {
		console.log(i);
		polymer = polymerize(polymer);
	}
	const polymer2 = polymer.split('');
	let ans2f = {};
	polymer2.forEach(e => {
		if (!ans2f.hasOwnProperty(e)) ans2f[e] = 0;
		ans2f[e]++;
	});
	const sorted2 = Object.entries(ans2f).sort(([e1, a1], [e2, a2]) => a1 - a2);
	const ans2 = sorted2.at(-1)[1] - sorted2[0][1];
	*/

	// New approach!
	// Polymer is now defined as { pairs: amount }
	function polymerize (polymer) {
		const out = {};
		Object.keys(polymer).forEach(pair => {
			const sub = subs[pair];
			let newPairs = [pair[0] + sub, sub + pair[1]];
			newPairs.forEach(newPair => {
				if (!out[newPair]) out[newPair] = 0;
				out[newPair] += polymer[pair];
			});
		});
		return out;
	}
	function count (polymer, full) {
		const out = {};
		Object.entries(polymer).forEach(([k, v]) => k.split('').forEach(e => {
			if (!out[e]) out[e] = 0;
			out[e] += v;
		}));
		out[base[0]]++;
		out[base[base.length - 1]]++;
		Object.keys(out).forEach(e => out[e] /= 2);
		if (full) console.log(out);
		const sorted = Object.entries(out).sort(([e1, a1], [e2, a2]) => a1 - a2);
		return sorted.at(-1)[1] - sorted[0][1];
	}
	let polymer = {};
	for (let i = 1; i < base.length; i++) {
		const pair = base.slice(i - 1, i + 1);
		if (!polymer[pair]) polymer[pair] = 0;
		polymer[pair]++;
	}
	for (let i = 0; i < 10; i++) polymer = polymerize(polymer);
	const ans1 = count(polymer);
	for (let i = 10; i < 40; i++) polymer = polymerize(polymer);
	return [ans1, count(polymer)];
}