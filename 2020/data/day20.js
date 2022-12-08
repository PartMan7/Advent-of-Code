exports.runs = 5;

exports.solve = function (input) {
	let storage = [{id: 0, edge: '#'}];
	let tiles = {}, nodes = {}, dim = 0;
	input.split('\n\n').forEach(tile => {
		dim++;
		tile = tile.split('\n');
		let edges = ['', '', '', '', '', '', '', ''];
		let id = tile.shift().substr(5).slice(0, -1);
		for (let i = 0; i < 10; ++i) {
			edges[0] += tile[0][i];
			edges[1] += tile[0][9 - i];
			edges[2] += tile[9][i];
			edges[3] += tile[9][9 - i];
			edges[4] += tile[i][0];
			edges[5] += tile[9 - i][0];
			edges[6] += tile[i][9];
			edges[7] += tile[9 - i][9];
		}
		nodes[id] = tile;
		edges.forEach((edge, i) => {
			let len = storage.length, pushed = false;
			for (let index = 0; index < len; index++) {
				if (storage[index].edge > edge) {
					pushed = true;
					storage.splice(index, 0, {id: id, edge: edge, index: i});
					break;
				}
			}
			if (!pushed) storage.push({id: id, edge: edge, index: i});
		});
	});
	dim = dim ** 0.5;
	let len = storage.length, uniques = {}, connections = {}, map = Array.from({length: dim}).map(term => Array.from({length: dim})), edges = {};
	for (let i = 1; i < len; i++) {
		let edge = storage[i].edge;
		if (storage[i - 1].edge !== edge && (i === len - 1 || storage[i + 1].edge !== edge)) {
			if (!uniques[storage[i].id]) uniques[storage[i].id] = 0;
			uniques[storage[i].id]++
		}
		if (edge === storage[i - 1].edge) {
			let id1 = storage[i - 1].id, id2 = storage[i].id;
			if (!connections[id1]) connections[id1] = new Set();
			if (!connections[id2]) connections[id2] = new Set();
			connections[id1].add(id2);
			connections[id2].add(id1);
		}
		if (!edges[edge]) edges[edge] = [];
		edges[edge].push(storage[i].id);
	}
	let ans1 = Object.keys(uniques).filter(key => uniques[key] === 4);
	function rotate (dt, by, size) {
		if (!by) return dt;
		if (!size) size = dt.length;
		let outArr = Array.from({length: size}).map(_blank => Array.from({length: size}));
		switch (by) {
			case 1: for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) outArr[j][size - 1 - i] = dt[i][j]; break;
			case 2: for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) outArr[size - 1 - i][size - 1 - j] = dt[i][j]; break;
			case 3: for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) outArr[size - 1 - j][i] = dt[i][j]; break;
		}
		return outArr.map(term => term.join(''));
	}
	function flip (dt, vert, size) {
		if (!size) size = dt.length;
		let outArr = Array.from({length: size}).map(_blank => Array.from({length: size}));
		if (vert) for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) outArr[size - 1 - i][j] = dt[i][j];
		else for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) outArr[i][size - 1 - j] = dt[i][j];
		return outArr.map(term => term.join(''));
	}
	map[0][0] = ans1[0];
	(() => {
		let node = nodes[ans1[0]];
		let x = edges[node[9]].length, y = edges[node.map(t => t.charAt(9)).join('')].length;
		if (x === 2 && y === 2) return;
		if (x === 2) return nodes[ans1[0]] = flip(node);
		if (y === 2) return nodes[ans1[0]] = flip(node, true);
		return nodes[ans1[0]] = rotate(node, 2);
	})();
	for (let i = 0; i < dim; i++) {
		for (let j = 0; j < dim; j++) {
			if (!i && !j) continue;
			let current;
			if (j) {
				let last = nodes[map[i][j - 1]], sharedEdge = '';
				for (let i = 0; i < 10; i++) sharedEdge += last[i][9];
				current = edges[sharedEdge].find(id => id !== map[i][j - 1]);
				let oriented = storage.find(term => term.edge === sharedEdge && term.id === current);
				switch (oriented.index) {
					case 0: nodes[current] = rotate(flip(nodes[current], true), 1); break;
					case 1: nodes[current] = rotate(nodes[current], 3); break;
					case 2: nodes[current] = rotate(nodes[current], 1); break;
					case 3: nodes[current] = rotate(flip(nodes[current], true), 3); break;
					case 4:	break;
					case 5: nodes[current] = flip(nodes[current], true); break;
					case 6: nodes[current] = flip(nodes[current]); break;
					case 7: nodes[current] = rotate(nodes[current], 2); break;
				}
			}
			else if (i) {
				let last = nodes[map[i - 1][j]], sharedEdge = last[9];
				current = edges[sharedEdge].find(id => id !== map[i - 1][j]);
				let oriented = storage.find(term => term.edge === sharedEdge && term.id === current);
				switch (oriented.index) {
					case 0: break;
					case 1: nodes[current] = flip(nodes[current]); break;
					case 2: nodes[current] = flip(nodes[current], true); break;
					case 3: nodes[current] = rotate(nodes[current], 2); break;
					case 4: nodes[current] = rotate(flip(nodes[current]), 3); break;
					case 5: nodes[current] = rotate(nodes[current], 1); break;
					case 6: nodes[current] = rotate(nodes[current], 3); break;
					case 7: nodes[current] = rotate(flip(nodes[current]), 1); break;
				}
			}
			else return console.log("WHAT");
			map[i][j] = current;
		}
	}
	let image = [];
	for (let i = 0; i < 10 * dim; i++) {
		let pare = i % 10;
		if (pare === 0 || pare === 9) continue;
		let str = '';
		for (let j = 0; j < dim; j++) str += nodes[map[Math.floor(i / 10)][j]][pare].slice(1, -1);
		image.push(str);
	}
	let dragon = [];
	`                  # \n#    ##    ##    ###\n #  #  #  #  #  #   `.split('\n').forEach((line, i) => {
		for (let j = 0; j < 20; j++) if (line.charAt(j) === '#') dragon.push([i, j]);
	});
	let hits = dragon.length;
	let width = 8 * dim;
	function dragons (text) {
		let amt = 0, trophs = new Set();
		for (let x = 0; x < width - 3; x++) {
			frame: for (let y = 0; y < width - 20; y++) {
				for (let z = 0; z < hits; z++) {
					let [i, j] = dragon[z];
					if (text[x + i].charAt(y + j) !== '#') continue frame;
				}
				amt++;
				dragon.forEach(hit => trophs.add((x + hit[0]) + ', ' + (y + hit[1])));
			}
		}
		if (!amt) return 0;
		let chars = 0;
		for (let i = 0; i < width; i++) for (let j = 0; j < width; j++) if (text[i].charAt(j) === '#') chars++;
		return chars - trophs.size;
	}
	ans1 = ans1.reduce((a, b) => a * b, 1);
	let ds;
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	image = flip(image);
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	image = rotate(image, 1);
	if (ds = dragons(image)) return [ans1, ds];
	return [ans1, null];
}