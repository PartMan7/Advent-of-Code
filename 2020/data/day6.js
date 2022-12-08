exports.runs = 100;

exports.solve = function (input) {
	let data = input.split('\n\n'), chars = "qwertyuiopasdfghjklzxcvbnm".split('');
	let ans1 = 0, ans2 = 0;
	data.forEach(batch => {
		chars.forEach(char => {
			if (batch.indexOf(char) > -1) ans1++;
		});
		let anses = batch.split('\n');
		anses[0].split('').forEach(char => {
			for (let i = 1; i < anses.length; i++) if (anses[i].indexOf(char) === -1) return;
			ans2++;
		});
	});
	return [ans1, ans2];
}