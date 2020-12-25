exports.runs = 1000;

exports.solve = function (input) {
	let data = input.split('\n').map(num => ~~num);
	data.sort((a, b) => a - b);
	data.unshift(0);
	data.push(data[data.length - 1] + 3);
	let inf = [0, 0, 0, 0];
	for (let i = 1; i < data.length; i++) inf[data[i] - data[i - 1]]++;
	let info = {};
	info[data[data.length - 1]] = 1;
	for (let i = data.length - 2; i >= 0; i--) info[data[i]] = (info[data[i] + 1] || 0) + (info[data[i] + 2] || 0) + (info[data[i] + 3] || 0);
	return [inf[1] * inf[3], info[0]];
}