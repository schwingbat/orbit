var path = require("path");

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './orbit.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: "bundle.js"
  }
};
