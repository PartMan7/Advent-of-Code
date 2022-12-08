exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split('\n');
	let init = ~~data[0], buses = data[1].split(',').map(num => parseInt(num) || 0), minTime = init * 2, minID = null, mains = [], rems = [], prod = 1n, outx = 0n;
	function modInverse (a, m) {
		let m0 = m, y = 0n, x = 1n;
		while (a > 1n) {
			let q = (a / m), t = m;
			[m, a, t, y] = [a % m, t, y, x - q * y];
			x = t;
		}
		return x < 0n ? x + m0 : x;
	}
	buses.forEach((term, index) => {
		if (!term) return;
		let nextTime = init + term - (init % term);
		mains.push(BigInt(term));
		rems.push(BigInt(index));
		prod *= BigInt(term);
		if (nextTime < minTime) [minTime, minID] = [nextTime, term];
	});
	for (let i = 0; i < mains.length; i++) outx -= rems[i] * prod * modInverse(prod / mains[i], mains[i]) / mains[i]; // Thank you, Chinese Remainder Theorem
	return [(minTime - init) * minID, Number(outx % prod + prod)];
}