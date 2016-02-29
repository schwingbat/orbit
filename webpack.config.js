var path = require("path");

module.exports = {
  entry: {
    app: ["./js/orbit.js"]
  },
  output: {
    path: './',
    filename: "bundle.js"
  }
};
