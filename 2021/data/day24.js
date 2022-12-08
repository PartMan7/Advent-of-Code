exports.runs = 2;

exports.solve = function (input) {
	let lines = input.split('\n').map(line => line.split(' '));
	function generate () {
		/*const ops = { w: [0], x: [0], y: [0], z: [0] };
		function deepClone (obj) {
			if (typeof obj !== 'object') return obj;
			return obj.map(deepClone);
		}
		const get = v => deepClone(ops[v]?.map?.(r => r.slice?.() || r) ?? ~~v);
		let i = 1;
		lines.forEach(([op, inp, out], index) => {
			console.log(index);
			switch (op) {
				case 'inp': return ops[inp].push(['IN', i++]);
				case 'add': return ops[inp].push(['+', get(out), out]);
				case 'mul': {
					if (out === '1') return;
					if (out === '0') return ops[inp] = [0];
					console.log(ops.y);
					return ops[inp].push(['*', get(out), out]);
				}
				case 'div': {
					if (out === '1') return;
					return ops[inp].push(['/', get(out), out]);
				}
				case 'mod': return ops[inp].push(['%', get(out), out]);
				case 'eql': return ops[inp].push(['===', get(out)], out);
			}
		});
		return ops;*/
		const ops = {
			w: '0',
			x: '0',
			y: '0',
			z: '0'
		};
		let i = 1;
		lines.forEach(([op, inp, operand], index) => {
			(() => {
				const brackets = str => /[=%\*\/\+]/.test(str);
				const nV = ops[operand] || operand;
				switch (op) {
					case 'inp': return ops[inp] = 'I' + i++;
					case 'add': {
						if (nV === '0') return;
						if (ops[inp] === '0') return ops[inp] = ops[operand] || operand;
						return ops[inp] = `${brackets(ops[inp]) ? '(' : ''}${ops[inp]}${brackets(ops[inp]) ? ')' : ''}+${brackets(nV) ? '(' : ''}${nV}${brackets(nV) ? ')' : ''}`;
					}
					case 'mul': {
						if (nV === '1') return;
						if (nV === '0') return ops[inp] = '0';
						return ops[inp] = `${brackets(ops[inp]) ? '(' : ''}${ops[inp]}${brackets(ops[inp]) ? ')' : ''}*${brackets(nV) ? '(' : ''}${nV}${brackets(nV) ? ')' : ''}`;
					}
					case 'div': {
						if (nV === '1') return;
						return ops[inp] = `~~(${brackets(ops[inp]) ? '(' : ''}${ops[inp]}${brackets(ops[inp]) ? ')' : ''}/${brackets(nV) ? '(' : ''}${nV}${brackets(nV) ? ')' : ''})`;
					}
					case 'mod': return ops[inp] = `${brackets(ops[inp]) ? '(' : ''}${ops[inp]}${brackets(ops[inp]) ? ')' : ''}%${brackets(nV) ? '(' : ''}${nV}${brackets(nV) ? ')' : ''}`;
					case 'eql': {
						if (/^I\d+/.test(nV) && ~~ops[inp] > 9) return ops[inp] = '0';
						return ops[inp] = `Number(${brackets(ops[inp]) ? '(' : ''}${ops[inp]}${brackets(ops[inp]) ? ')' : ''}==${brackets(nV) ? '(' : ''}${nV}${brackets(nV) ? ')' : ''})`;
					}
				}
			})();
			// console.log(1, ops[inp]);
			if (!ops[inp].includes('I')) {
				console.log(ops[inp]);
				ops[inp] = String(eval(ops[inp]));
			}
		});
		return ops;
	}
	function validate (inputs) {
		const vars = { w: 0, x: 0, y: 0, z: 0 };
		const get = v => vars[v] ?? ~~v;
		lines.forEach(([op, inp, out]) => {
			// console.log([op, inp, out], vars)
			switch (op) {
				case 'inp': return vars[inp] = inputs.shift();
				case 'add': return vars[inp] += get(out);
				case 'mul': return vars[inp] *= get(out);
				case 'div': return vars[inp] = Math.floor(vars[inp] / get(out));
				case 'mod': return vars[inp] %= get(out);
				case 'eql': return vars[inp] = Number(vars[inp] === get(out));
			}
		});
		// console.log(vars);
		return vars.z === 0;
	}
	let ans1;
	const generated = generate();
	// console.log(require('util').inspect(generated, { colors: true, depth: 3 }));
	// console.log(generated.z);
	require('fs').writeFileSync('./AAAA24.txt', generated.z);
	return [ans1];
}