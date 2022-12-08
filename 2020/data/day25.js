exports.runs = 10;

exports.solve = function (input) {
	data = input.split('\n').map(t => ~~t);
	function brute () {
		let loop = 0, current = 1;
		while (data[0] !== current && data[1] !== current) {
			loop++;
			current = (current * 7) % 20201227;
		}
		return [data[0] === current ? 1 : 0, loop];
	}
	let [other, loop] = brute(), s = 1;
	for (let i = 0; i < loop; i++) s = (s * data[other]) % 20201227;
	return [s, "Merry Christmas!"];
}