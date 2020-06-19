const fs = require("fs-extra");
const path = require("path");
const sass = require("node-sass");

const srcDir = path.join(__dirname, "..", "src");
const buildDir = path.join(__dirname, "..", "build");

const result = sass.renderSync({
  file: path.join(srcDir, "sass", "orbit.scss"),
});

fs.ensureDirSync(path.join(buildDir, "css"));
fs.writeFileSync(
  path.join(buildDir, "css", "orbit.css"),
  result.css.toString()
);
