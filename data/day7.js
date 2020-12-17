exports.runs = 5;

exports.solve = function (input) {
	let data = input.split('\n');
	let info = {};
	data.forEach(rule => {
		let parent = rule.slice(0, rule.indexOf(' bags'));
		rule = rule.substr(parent.length + 14);
		let kids = [];
		rule.split(', ').forEach(sub => {
			sub = sub.split(' bag')[0];
			let amt = parseInt(sub);
			let colour = sub.slice((amt + ' ').length);
			for (let i = 0; i < amt; i++) kids.push(colour);
		});
		if (kids.length) info[parent] = kids;
		else info[parent] = 1;
	});
	function getParents (node) {
		let parents = [];
		Object.keys(info).forEach(key => {
			if (Array.isArray(info[key]) && info[key].includes(node)) parents.push(key);
		});
		if (parents.length) return parents.concat(...parents.map(getParents));
		else return [];
	}
	function getChildren (node) {
		if (info[node] === 1) return 1;
		return 1 + info[node].reduce((acc, term) => acc + getChildren(term), 0);
	}
	let duped = getParents('shiny gold'), ans1 = 0;
	duped.forEach((term, index) => {
		if (duped.indexOf(term) === index) ans1++;
	});
	return [ans1, getChildren('shiny gold') - 1];
}