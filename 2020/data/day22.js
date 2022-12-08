exports.runs = 2;

exports.solve = function (input) {
	let players = input.split('\n\n');
	let p1 = players[0].split('\n').map(term => ~~term), p2 = players[1].split('\n').map(term => ~~term);
	p1.shift(), p2.shift();
	let q1 = p1.slice(), q2 = p2.slice();
	function round () {
		let tops = [p1.shift(), p2.shift()];
		if (tops[0] > tops[1]) p1.push(tops[0], tops[1]);
		else p2.push(tops[1], tops[0]);
	}
	while (p1.length && p2.length) round();
	let winner = p1.length ? p1 : p2, len = winner.length;
	let ans1 = 0;
	winner.forEach((term, index) => ans1 += term * (len - index));
	class game {
		constructor (p1, p2) {
			this.p1 = p1.slice();
			this.p2 = p2.slice();
			this.logs = new Set();
		}
		round () {
			let str = `${this.p1.join(',')}|${this.p2.join(',')}`;
			if (this.logs.has(str)) return 'p1';
			this.logs.add(str);
			let tops = [this.p1.shift(), this.p2.shift()];
			let winner;
			if (this.p1.length >= tops[0] && this.p2.length >= tops[1]) winner = new game(this.p1.slice(0, tops[0]), this.p2.slice(0, tops[1])).play().winner;
			else winner = tops[0] > tops[1] ? 'p1' : 'p2';
			if (winner === 'p1') this.p1.push(tops[0], tops[1]);
			else this.p2.push(tops[1], tops[0]);
		}
		play () {
			let winner;
			while (this.p1.length && this.p2.length) if (winner = this.round()) break;
			if (!winner) winner = this.p1.length ? 'p1' : 'p2';
			return {
				winner: winner,
				cards: this[winner]
			}
		}
	}
	let mainGame = new game(q1, q2);
	let cards = mainGame.play().cards;
	len = cards.length;
	return [ans1, cards.reduce((acc, term, index) => acc + term * (len - index), 0)];
}