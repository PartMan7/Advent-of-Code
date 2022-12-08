exports.runs = 100;

exports.solve = function (input) {
	let data = input.split('\n');
	let allergens = {}, ingredients = [];
	data.forEach(line => {
		let stuff = line.split(' (contains ');
		let ings = stuff[0].split(' ');
		let alls = stuff[1].slice(0, -1).split(', ');
		alls.forEach(allergy => {
			if (allergens[allergy]) allergens[allergy] = allergens[allergy].filter(ing => ings.includes(ing));
			else allergens[allergy] = ings.slice();
		});
		ings.forEach(ing => ingredients.push(ing));
	});
	let ans1 = ingredients.slice();
	Object.values(allergens).forEach(alls => alls.forEach(ing => {
		let index;
		while (index = ans1.indexOf(ing) !== -1) ans1.splice(index, 1);
	}));
	let ans2 = {};
	loop: while (true) {
		let arr = Object.keys(allergens), len = arr.length;
		for (let i = 0; i < len; ++i) if (allergens[arr[i]].length === 1) {
			let term = allergens[arr[i]][0], index;
			for (let j = 0; j < len; ++j) if ((index = allergens[arr[j]].indexOf(term)) !== -1) allergens[arr[j]].splice(index, 1);
			ans2[arr[i]] = term;
			continue loop;
		}
		break;
	}
	return [ans1.length, Object.keys(ans2).sort().map(key => ans2[key]).join(',')];
}