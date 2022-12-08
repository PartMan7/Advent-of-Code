exports.runs = 5;

exports.solve = function (input) {
	const [encoder, original] = input.split('\n\n');
	let image = original.split('\n').map(r => r.split(''));
	function enhance (img, odd) {
		const clone = img.map(r => r.slice());
		const char = odd ? '.' : '#';
		clone.unshift(Array.from({ length: img[0].length }).fill(char));
		clone.push(Array.from({ length: img[0].length }).fill(char));
		clone.forEach(line => {
			line.unshift(char);
			line.push(char);
		});
		const out = Array.from({ length: clone.length }).map(() => Array.from({ length: clone[0].length }));
		// console.log(display(clone));
		clone.forEach((line, i) => {
			line.forEach((_, j) => {
				let outStr = '';
				if (clone[i - 1]) {
					outStr += clone[i - 1][j - 1] || char;
					outStr += clone[i - 1][j];
					outStr += clone[i - 1][j + 1] || char;
				} else outStr += char.repeat(3);
				outStr += clone[i][j - 1] || char;
				outStr += clone[i][j];
				outStr += clone[i][j + 1] || char;
				if (clone[i + 1]) {
					outStr += clone[i + 1][j - 1] || char;
					outStr += clone[i + 1][j];
					outStr += clone[i + 1][j + 1] || char;
				} else outStr += char.repeat(3);
				out[i][j] = encoder[parseInt(outStr.replace(/\./g, '0').replace(/#/g, '1'), 2)];
			});
		});
		return out;
	}
	function display (img) {
		return img.map(r => r.join('')).join('\n');
	}
	let ans1;
	for (let i = 0; i < 50; i++) {
		image = enhance(image, encoder[0] === '.' ? true : !(i % 2));
		if (i === 1) ans1 = image.reduce((a, b) => a + b.reduce((c, d) => c + (d === '.' ? 0 : 1), 0), 0);
	}
	const ans2 = image.reduce((a, b) => a + b.reduce((c, d) => c + (d === '.' ? 0 : 1), 0), 0);
	return [ans1, ans2];
}