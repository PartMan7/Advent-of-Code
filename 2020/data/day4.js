exports.runs = 100;

exports.solve = function (input) {
	let data = input.split('\n\n');
	let ans1 = 0, ans2 = 0;
	data.forEach(batch => {
		let card = {};
		batch.match(/(byr|iyr|eyr|hgt|hcl|ecl|pid):[^ \n]+/g).forEach(match => {
			let [key, val] = match.split(':');
			switch (key) {
				case 'byr': case 'eyr': case 'iyr': card[key] = ~~val; break;
				default: card[key] = val;
			}
		});
		if (Object.keys(card).length !== 7) return;
		ans1++;
		if (card.byr < 1920 || card.byr > 2002) return;
		if (card.iyr < 2010 || card.iyr > 2020) return;
		if (card.eyr < 2020 || card.eyr > 2030) return;
		switch (card.hgt.slice(-2)) {
			case 'cm': {
				let val = parseInt(card.hgt);
				if (val < 150 || val > 193) return;
				break;
			}
			case 'in': {
				let val = parseInt(card.hgt);
				if (val < 59 || val > 76) return;
				break;
			}
			default: return;
		}
		if (!/^#[0-9a-f]{6}$/.test(card.hcl)) return;
		if (![`amb`, `blu`, `brn`, `gry`, `grn`, `hzl`, `oth`].includes(card.ecl)) return;
		if (!/^\d{9}$/.test(card.pid)) return;
		ans2++;
	});
	return [ans1, ans2];
}