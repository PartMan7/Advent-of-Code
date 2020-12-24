exports.runs = 10;

exports.solve = function (input) {
	let data = input.split('\n');
	let memory1 = {}, mask, memory2 = {};

	data.forEach(line => {			
		if (line.substr(0, 7) === 'mask = ') return mask = line.substr(7).split('');
		let address = parseInt(line.substr(4)), value = parseInt(line.split(' = ')[1]);
		let value1 = value.toString(2).split('');
		value1 = [...(Array.from({length: 36 - value1.length}).map(t => '0')), ...value1];
		let address2 = address.toString(2).split('');
		address2 = [...(Array.from({length: 36 - address2.length}).map(t => '0')), ...address2];
		for (let i = 0; i < 36; i++) switch (mask[i]) {
			case '0': value1[i] = mask[i]; break;
			case '1': value1[i] = mask[i]; address2[i] = '1'; break;
			case 'X': address2[i] = 'X';
		}
		function allAddr (address, val) {
			let index = address.indexOf('X');
			if (index === -1) return memory2[address] = val;
			allAddr(address.slice(0, index).concat('0', address.slice(index + 1, address.length)), val);
			allAddr(address.slice(0, index).concat('1', address.slice(index + 1, address.length)), val);
		}
		memory1[address] = parseInt(value1.join(''), 2);
		allAddr(address2, value);
	});

	return [Object.values(memory1).reduce((a, b) => a + b, 0), Object.values(memory2).reduce((a, b) => a + b, 0)];
}

// A non-recursive optimization has been thought of, but I'm too lazy to implement it now. 'o.o