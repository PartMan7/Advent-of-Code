exports.runs = 1;

exports.solve = function (input) {
	class queue {
		// JS Priority Queue implementation, written by PartMan7
		constructor (init) {
			this.key = 'weight';
			this.id = 'id';
			this._values = [...(init || [])];
			this._IDs = new Set(this._values.map(val => val[this.id]));
			this.length = this._values.length;
		}
		add (node) {
			if (node[this.id] == null) throw new Error(`Missing valid ID on node [${node}]`);
			if (this._IDs.has(node[this.id])) {
				let found = this._values.find(val => val[this.id] === node[this.id]);
				if (found[this.key] > node[this.key]) {
					found.parent = node.parent;
					found[this.key] = node[this.key];
					return true;
				}
				return false;
			}
			this._IDs.add(node[this.id]);
			let key = node[this.key], i, flag = true;
			loop: for (i = 0; i < this.length; i++) if (this._values[i][this.key] >= key) {
				flag = false;
				break loop;
			}
			if (flag) this._values.push(node);
			else this._values.splice(i, 0, node);
			this.length++;
			return true;
		}
		remove (...nodes) {
			nodes.forEach(node => {
				if (!this._IDs.has(node)) throw new Error(`Element with ID [${node}] not present`);
			});
			if (!this.length) return false;
			looper: while (nodes.length) {
				for (let i = 0; i < this.length; i++) if (nodes.includes(this._values[i][this.id])) {
					nodes.splice(nodes.indexOf(this._values[i][this.id]), 1);
					this._IDs.delete(this._values[i][this.id]);
					this._values.splice(i, 1);
					this.length--;
					continue looper;
				}
				return false;
			}
			return true;
		}
		has (node) {
			return this._IDs.has(node);
		}
		at (index) {
			return this._values.at(index)
		}
		shift () {
			if (!this.length) return undefined;
			this.length--;
			this._IDs.delete(this._values[0][this.id]);
			return this._values.shift();
		}
		pop () {
			if (!this.length) return undefined;
			this.length--;
			this._IDs.delete(this._values[this.length - 1][this.id]);
			return this._values.pop();
		}
	}

	let data = input.split('\n').map(line => line.split('').map(n => ~~n));
	const original = data.map(line => line.slice());

	function inc (num, by) {
		return num + by > 9 ? (num + by - 9) : (num + by);
	}
	data.forEach(line => {
		const slice = line.slice();
		for (let i = 1; i <= 4; i++) line.push(...slice.map(n => inc(n, i)));
	});
	const clone = data.map(line => line.slice());
	for (let i = 1; i <= 4; i++) data.push(...clone.map(line => line.map(n => inc(n, i))));
	function find (data) {
		function expand (num) {
			return [parseInt(num / data[0].length), num % data[0].length];
		}
		function compress ([x, y]) {
			return x * data[0].length + y;
		}
		function extract (num, y = false) {
			let x;
			if (y === false) [x, y] = expand(num);
			else x = num;
			return [x, y];
		}
		function getRisk (...args) {
			const pos = extract(...args);
			return data[pos[0]][pos[1]];
		}
		function heur (...args) {
			const pos = extract(args)
			return (data.length - pos[0]) + (data[0].length) - pos[1];
		}
		function neighbors (...args) {
			const pos = extract(...args);
			const out = [];
			if (pos[0] > 0) out.push(compress([pos[0] - 1, pos[1]]));
			if (pos[1] > 0) out.push(compress([pos[0], pos[1] - 1]));
			if (pos[0] < data.length - 1) out.push(compress([pos[0] + 1, pos[1]]));
			if (pos[1] < data[0].length - 1) out.push(compress([pos[0], pos[1] + 1]));
			return out;
		}
		function minIndex (arr) {
			let min = Infinity, index;
			arr.forEach((val, i) => {
				if (val < min) [min, index] = [val, i];
			});
			return index;
		}
		const weights = Array.from({ length: data.length * data[0].length }).fill(Infinity);
		weights[0] = 0;
		const visited = weights.map(() => false);
		const visitable = new queue();
		neighbors(0).forEach(neighbor => {
			const wt = getRisk(neighbor);
			const newWeight = weights[0] + wt;
			visitable.add({ id: neighbor, weight: newWeight });
			if (newWeight < weights[neighbor]) weights[neighbor] = newWeight;
		});
		let ans;
		while (true) {
			const nextNode = visitable.shift().id;
			visited[nextNode] = true;
			if (nextNode === data.length * data[0].length - 1) {
				ans = weights[nextNode];
				break;
			}
			neighbors(nextNode).forEach(neighbor => {
				if (visited[neighbor]) return;
				const wt = getRisk(neighbor);
				const newWeight = weights[nextNode] + wt;
				visitable.add({ id: neighbor, weight: newWeight });
				if (weights[neighbor] > newWeight) weights[neighbor] = newWeight;
			});
		}
		return ans;
	}
	return [find(original), find(data)];
}