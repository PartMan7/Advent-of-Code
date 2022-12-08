exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('').map(c => ({ "0": "0000", "1": "0001", "2": "0010", "3": "0011", "4": "0100", "5": "0101", "6": "0110", "7": "0111", "8": "1000", "9": "1001", "A": "1010", "B": "1011", "C": "1100", "D": "1101", "E": "1110", "F": "1111" })[c]).join('');
	let versions = 0;
	function operate (type, vals) {
		switch (type) {
			case 0: return vals.reduce((a, b) => a + b, 0);
			case 1: return vals.reduce((a, b) => a * b, 1);
			case 2: return Math.min(...vals);
			case 3: return Math.max(...vals);
			case 5: return Number(vals[0] > vals[1]);
			case 6: return Number(vals[0] < vals[1]);
			case 7: return Number(vals[0] === vals[1]);
		}
	}
	function readPacket (str) {
		if (!str.length) return null;
		if (parseInt(str, 2) === 0) return null;
		const ver = parseInt(str.substr(0, 3), 2);
		versions += ver;
		const typeID = parseInt(str.substr(3, 3), 2);
		str = str.substr(6);
		if (typeID === 4) {
			let literal = '';
			while (str.startsWith('1')) {
				literal += str.substr(1, 4);
				str = str.substr(5);
			}
			literal += str.substr(1, 4);
			str = str.substr(5);
			return ({ str, val: parseInt(literal, 2) });
		} else {
			const lengthID = ~~str[0];
			str = str.substr(1);
			if (lengthID === 0) {
				const length = parseInt(str.substr(0, 15), 2);
				str = str.substr(15);
				let substr = str.substr(0, length);
				str = str.substr(length);
				const val = [];
				while (true) {
					const packet = readPacket(substr);
					if (packet) {
						substr = packet.str;
						val.push(packet.val);
					} else break;
				}
				return ({ str, val: operate(typeID, val) });
			} else {
				const length = parseInt(str.substr(0, 11), 2);
				str = str.substr(11);
				const val = [];
				for (let i = 0; i < length; i++) {
					const packet = readPacket(str);
					str = packet.str;
					val.push(packet.val);
				}
				return ({ str, val: operate(typeID, val) });
			}
		}
	}
	const out = readPacket(data);
	return [versions, out.val];
}