const path = require("path");

module.exports = {
	context: path.join(__dirname, "src"),
	entry: "./orbit.js",
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	loaders: [{
		test: /.js$/,
		loaders: "buble",
		include: path.join(__dirname, "src"),
		query: {
			objectAssign: "Object.assign",
		}
	}],
};
