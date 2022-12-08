exports.runs = 2;

exports.solve = function (inp) {
	/*let data = input.split('\n').map(line => [Number(line.charAt(1) === 'n'), line.split(',').map(set => set.split('=')[1].split('..').map(n => parseInt(n)))]);
	console.log(data);
	const store = {};
	for (let i = -50; i <= 50; i++) {
		store[i] = {}
		for (let j = -50; j <= 50; j++) {
			store[i][j] = {};
			for (let k = -50; k<= 50; k++) store[i][j][k] = 0;
		}
	}
	data.forEach(line => {
		if (Math.max(Math.abs(line[1][0][0]), Math.abs(line[1][1][0]), Math.abs(line[1][2][0])) > 50) return;
		const coords = line[1];
		for (let i = coords[0][0]; i <= coords[0][1]; i++) {
			for (let j = coords[1][0]; j <= coords[1][1]; j++) {
				for (let k = coords[2][0]; k <= coords[2][1]; k++) {
					// console.log(i, j, k);
					store[i][j][k] = line[0];
				}
			}
		}
	});
	for (let i = 0; i < data.length; i++) for (let j = i + 1; j < data.length; j++) {
		//
	}
	// console.log(store);
	console.log(Object.values(store).reduce((a, b) => a + Object.values(b).reduce((c, d) => c + Object.values(d).reduce((e, f) => e + f, 0), 0), 0));
	*/

	const parseInput = (rawInput) => rawInput.trim().split`\n`.map(l => {
	  const [on, coords] = l.split` `
	  const numbers = coords.match(/-?\d+/g).map(x=>+x)
	  const ranges = []
	  for (let i = 0; i < numbers.length; i+=2)
	    ranges.push([numbers[i], numbers[i+1]])
	  return {
	    on: on === "on",
	    ranges
	  }
	})

	function volume(c) {
	  return c.reduce((acc, [min, max]) => acc *= max + 1 - min, 1)
	}

	function intersect2d(a, b) {
	  const newMin = Math.max(a[0], b[0]), newMax = Math.min(a[1], b[1])
	  return newMin > newMax ? null : [newMin, newMax]
	}

	function overwrittenVolume(a, cuboids) {
	  return cuboids.map((b, i) => {
	    const intersection = a.map((aRange, j) => intersect2d(aRange, b.ranges[j]))
	    if (intersection.includes(null)) return 0 // no overlapping volume
	    return volume(intersection) - overwrittenVolume(intersection, cuboids.slice(1 + i))
	  }).reduce((acc, cur) => acc + cur, 0)
	}

	function countOn(cuboids) {
	  let total = 0
	  for (let i = 0; i < cuboids.length; i++) if (cuboids[i].on)
	    total += volume(cuboids[i].ranges) - overwrittenVolume(cuboids[i].ranges, cuboids.slice(i+1))
	  return total
	}

	const part1 = (rawInput) => {
	  const input = parseInput(rawInput)
	  return countOn(input.slice(0,20))
	}

	const part2 = (rawInput) => {
	  const input = parseInput(rawInput)
	  return countOn(input)
	}
	console.log(part2(inp));
	// part2(input);


}