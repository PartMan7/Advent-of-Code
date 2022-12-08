exports.runs = 500;

exports.solve = function (input) {
	let data = input.split('\n');
	function orient (coords, distance) {
		let offset = [0, 0];
		switch (coords[2] % 360) {
			case 0: offset = [1, 0]; break;
			case 90: offset = [0, 1]; break;
			case 180: offset = [-1, 0]; break;
			case 270: offset = [0, -1]; break;
		}
		coords[0] += distance * offset[0];
		coords[1] += distance * offset[1];
		return coords;
	}
	let status1 = [0, 0, 7200], status2 = [0, 0], waypoint = [10, 1];
	data.forEach(line => {
		switch (line[0]) {
			case 'N': {
				let num = ~~line.substr(1);
				status1[1] += num;
				waypoint[1] += num;
				break;
			}
			case 'S': {
				let num = ~~line.substr(1);
				status1[1] -= num;
				waypoint[1] -= num;
				break;
			}
			case 'E': {
				let num = ~~line.substr(1);
				status1[0] += num;
				waypoint[0] += num;
				break;
			}
			case 'W': {
				let num = ~~line.substr(1);
				status1[0] -= num;
				waypoint[0] -= num;
				break;
			}
			case 'F': {
				let num = ~~line.substr(1);
				orient(status1, num);
				status2[0] += waypoint[0] * num;
				status2[1] += waypoint[1] * num;
				break;
			}
			case 'L': {
				let num = ~~line.substr(1);
				status1[2] += num;
				for (let i = 0; i < num / 90; i++) waypoint = [-waypoint[1], waypoint[0]];
				break;
			}
			case 'R': {
				let num = ~~line.substr(1);
				status1[2] -= num;
				for (let i = 0; i < num / 90; i++) waypoint = [waypoint[1], -waypoint[0]];
				break;
			}
		}
	});
	return [Math.abs(status1[0]) + Math.abs(status1[1]), Math.abs(status2[0]) + Math.abs(status2[1])];
}