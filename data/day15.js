exports.runs = 1;

exports.solve = function (input) {
	let data = input.split(',').map(num => ~~num);
	let store = new Map(), len = data.length;
	for (let index = 0; index < len - 1; index++) store.set(data[index], index);
	let val = data.length - 1, key = data[val];
	for (let i = len; i < 2020; i++) {
		let index = store.get(key);
		let term = index + 1 ? i - index - 1 : 0;
		store.set(key, val);
		val = i;
		key = term;
	}
	let ans1 = key;
	for (let i = 2020; i < 30000000; i++) {
		let index = store.get(key);
		let term = index + 1 ? i - index - 1 : 0;
		store.set(key, val);
		val = i;
		key = term;
	}
	return [ans1, key];
}