exports.runs = 1000;

exports.solve = function (input) {
	const solution = [0, 0];
	const nums = input.split('\n').map(num => ~~num);
	const len = nums.length - 1, len2 = nums.length - 3;
	for (let i = 0; i < len; i++) if (nums[i + 1] > nums[i]) solution[0]++;
	for (let i = 0; i < len2; i++) if (nums[i + 3] > nums[i]) solution[1]++;
	return solution;
}