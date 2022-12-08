exports.runs = 1000;

exports.solve = function (fileString) {
	const input = ((cmds, tree, path) => cmds.map(([cmd, ...output]) => [cmd, ...output.map(line => line[0] === 'dir' ? [line[1]] : [line[1], ~~line[0]])]).forEach(([cmd, ...output]) => cmd[0] === 'cd' ? cmd[1] === '..' ? path.pop() : (cmd[1] === '/' ? path.length = 1 : path.push(cmd[1])) : ((size => ((parent => parent.files[path.at(-1)] = ({ files: Object.fromEntries(output), size }))(path.slice(0, -1).reduce((a, b) => a.files[b], tree)) && path.forEach((_, i) => path.slice(0, i).reduce((a, b) => a.files[b], tree).size += size)))(output.filter(line => line.length === 2).map(line => line[1]).reduce((a, b) => a + b, 0)))) || tree)(fileString.trim().split(/\n(?=\$)/).map(cmd => cmd.substr(2).split('\n').map(line => line.split(' '))), { files: { '/': {} } }, ['/']);
	const ans1 = ((recurse = node => (node.size <= 100000 && node.size) + Object.values(node.files || {}).reduce((a, b) => a + (b instanceof Number || recurse(b)), 0)) => recurse(input.files['/'], 0))();
	const ans2 = Math.min(...((root, sizes, recurse = node => Object.entries(node.files || {}).forEach(([key, val]) => [(val.size >= input.files['/'].size - 40000000) && sizes.push(val.size), recurse(val)])) => recurse(root) || sizes)(input.files['/'], []));
	return [ans1, ans2];
};
