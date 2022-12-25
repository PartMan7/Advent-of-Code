exports.runs = 2;

exports.solve = function (inp) {

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
	});

	function volume (c) {
		return c.reduce((acc, [min, max]) => acc *= max + 1 - min, 1)
	}

	function intersect2d (a, b) {
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