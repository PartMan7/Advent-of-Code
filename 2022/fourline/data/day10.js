exports.runs = 1000;

exports.solve = function (fileString) {
	const input = { lines: fileString.trim().split('\n').map(line => line.split(' ')).map(([first, ...rest]) => [first, ...rest.map(num => ~~num)]), screen: Array.from({ length: 240 }).fill('.'), letters: [] };
	const ans1 = ((toFind, out, x, cycles) => (nextCycle => input.lines.forEach(([cmd, val]) => [nextCycle(), (cmd === 'addx') && [nextCycle(), x += val]]) || out.reduce((a, b) => a + b, 0))(() => [cycles++, (cycles === toFind[0]) && out.push(toFind.shift() * x), (Math.abs(x - ((cycles - 1) % 40)) <= 1) && (input.screen[cycles - 1] = '#')]))([20, 60, 100, 140, 180, 220], [], 1, 0);
	const ans2 = Array.from({ length: 6}).forEach((_, i) => input.letters.push(input.screen.slice(40 * i, 40 * (i + 1)).join(''))) || ((letters, letterList) => Array.from({ length: 8 }).map((_, i) => letterList[letters.indexOf(input.letters.map(line => line.substr(i * 5, 4)).join('\n'))]))((lines => Array.from({ length: lines[0].length / 5 }).map((_, i) => lines.map(line => line.substr(i * 5, 4)).join('\n')))(`.##..###...##..###..####.####..##..#..#...##.#..#.#....###..###..#..#.####.\n#..#.#..#.#..#.#..#.#....#....#..#.#..#....#.#.#..#....#..#.#..#.#..#....#.\n#..#.###..#....#..#.###..###..#....####....#.##...#....#..#.#..#.#..#...#..\n####.#..#.#....#..#.#....#....#.##.#..#....#.#.#..#....###..###..#..#..#...\n#..#.#..#.#..#.#..#.#....#....#..#.#..#.#..#.#.#..#....#....#.#..#..#.#....\n#..#.###...##..###..####.#.....###.#..#..##..#..#.####.#....#..#..##..####.`.split('\n')), 'ABCDEFGHJKLPRUZ'.split('')).join('');
	return [ans1, ans2];
};

/*


.##..###...##..###..####.####..##..#..#...##.#..#.#....###..###..#..#.####.
#..#.#..#.#..#.#..#.#....#....#..#.#..#....#.#.#..#....#..#.#..#.#..#....#.
#..#.###..#....#..#.###..###..#....####....#.##...#....#..#.#..#.#..#...#..
####.#..#.#....#..#.#....#....#.##.#..#....#.#.#..#....###..###..#..#..#...
#..#.#..#.#..#.#..#.#....#....#..#.#..#.#..#.#.#..#....#....#.#..#..#.#....
#..#.###...##..###..####.#.....###.#..#..##..#..#.####.#....#..#..##..####.


*/
