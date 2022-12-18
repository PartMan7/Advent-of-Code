exports.runs = 1000;

exports.solve = function (fileString) {
	const input = { data: fileString.trim().split('\n\n').map(set => set.split('\n').map(r => JSON.parse(r))), compare: (A, B) => ((typeof A === 'number' && typeof B === 'number') ? -Math.sign(B - A) : null) ?? (typeof A === 'number' ? ((A = [A]) && null) : null) ?? (typeof B === 'number' ? ((B = [B]) && null) : null) ?? A.reduce((acc, a, i) => acc ?? (i === B.length ? 1 : (input.compare(a, B[i]) || null)), null) ?? ((A.length < B.length) ? -1 : null)};
	const ans1 = input.data.map(pair => input.compare(...pair)).reduce((acc, val, i) => acc + (val < 0 ? i + 1 : 0), 0);
	const ans2 = (dividers => (flat => dividers.reduce((acc, div) => acc * (flat.indexOf(div) + 1), 1))(input.data.flat().concat(dividers).sort(input.compare)))([[[2]], [[6]]]);
	return [ans1, ans2];
};
