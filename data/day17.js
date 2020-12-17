exports.runs = 200;

exports.solve = function (input) {
	let data = input.split('\n');
	function threeD () {
		let world = {};
		let cDep = 0;
		for (let i = 0; i < 1; i++) {
			let nest1 = {};
			for (let j = 0; j < data.length; j++) {
				let nest2 = {};
				for (let k = 0; k < data[0].length; k++) nest2[k] = data[j][k];
				nest1[j] = nest2;
			}
			world[i] = nest1;
		}
		function iterate () {
			let newWorld = {};
			cDep++;
			for (let i = -cDep; i < 1 + cDep; i++) {
				let nest1 = {};
				for (let j = -cDep; j < data.length + cDep; j++) {
					let nest2 = {};
					for (let k = -cDep; k < data[0].length + cDep; k++) nest2[k] = world[i] && world[i][j] && world[i][j][k] ? world[i][j][k] : '.';
					nest1[j] = nest2;
				}
				newWorld[i] = nest1;
			}
			for (let x = -cDep; x < 1 + cDep; x++) {
				for (let y = -cDep; y < data.length + cDep; y++) {
					for (let z = -cDep; z < data[0].length + cDep; z++) {
						let n = 0;
						for (let i = -1; i <= 1; i++) {
							for (let j = -1; j <= 1; j++) {
								for (let k = -1; k <= 1; k++) {
									if (!i && !j && !k) continue;
									if (world[x + i] && world[x + i][y + j] && world[x + i][y + j][z + k] === '#') n++;
								}
							}
						}
						if (!(world[x] && world[x][y] && world[x][y][z] === '#') && n === 3) newWorld[x][y][z] = '#';
						else if (!(world[x] && world[x][y] && world[x][y][z] === '.') && !(n === 2 || n === 3)) newWorld[x][y][z] = '.';
					}
				}
			}
			return newWorld;
		}
		for (let i = 0; i < 6; i++) world = iterate();
		return Object.values(world).reduce((acc, cur) => acc + Object.values(cur).reduce((ac, cu) => ac + Object.values(cu).reduce((a, c) => a + (c === '#'), 0), 0), 0);
	}
	function fourD () {
		let world = {};
		let cDep = 0;
		for (let l = 0; l < 1; l++) {
			let nest1 = {};
			for (let i = 0; i < 1; i++) {
				let nest2 = {};
				for (let j = 0; j < data.length; j++) {
					let nest3 = {};
					for (let k = 0; k < data[0].length; k++) nest3[k] = data[j][k];
					nest2[j] = nest3;
				}
				nest1[i] = nest2;
			}
			world[l] = nest1;
		}
		function iterate () {
			let newWorld = {};
			cDep++;
			for (let l = -cDep; l < 1 + cDep; l++) {
				let nest1 = {};
				for (let i = -cDep; i < 1 + cDep; i++) {
					let nest2 = {};
					for (let j = -cDep; j < data.length + cDep; j++) {
						let nest3 = {};
						for (let k = -cDep; k < data[0].length + cDep; k++) nest3[k] = world[l] && world[l][i] && world[l][i][j] && world[l][i][j][k] ? world[l][i][j][k] : '.';
						nest2[j] = nest3;
					}
					nest1[i] = nest2;
				}
				newWorld[l] = nest1;
			}
			for (let w = -cDep; w < 1 + cDep; w++) {
				for (let x = -cDep; x < 1 + cDep; x++) {
					for (let y = -cDep; y < data.length + cDep; y++) {
						for (let z = -cDep; z < data[0].length + cDep; z++) {
							let n = 0;
							for (let i = -1; i <= 1; i++) {
								for (let j = -1; j <= 1; j++) {
									for (let k = -1; k <= 1; k++) {
										for (let l = -1; l <= 1; l++) {
											if (!i && !j && !k && !l) continue;
											if (world[w + l] && world[w + l][x + i] && world[w + l][x + i][y + j] && world[w + l][x + i][y + j][z + k] === '#') n++;
										}
									}
								}
							}
							if (!(world[w] && world[w][x] && world[w][x][y] && world[w][x][y][z] === '#') && n === 3) newWorld[w][x][y][z] = '#';
							else if (!(world[w] && world[w][x] && world[w][x][y] && world[w][x][y][z] === '.') && !(n === 2 || n === 3)) newWorld[w][x][y][z] = '.';
						}
					}
				}
			}
			return newWorld;
		}
		for (let i = 0; i < 6; i++) world = iterate();
		return Object.values(world).reduce((accu, curr) => accu + Object.values(curr).reduce((acc, cur) => acc + Object.values(cur).reduce((ac, cu) => ac + Object.values(cu).reduce((a, c) => a + (c === '#'), 0), 0), 0), 0);
	}
	return [threeD(), fourD()]
}