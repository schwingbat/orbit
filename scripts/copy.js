const fs = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");
const buildDir = path.join(__dirname, "..", "build");

fs.ensureDirSync(buildDir);

fs.copySync(path.join(srcDir, "img"), path.join(buildDir, "img"));
fs.copySync(path.join(srcDir, "index.html"), path.join(buildDir, "index.html"));
fs.copySync(
  path.join(srcDir, "manifest.json"),
  path.join(buildDir, "manifest.json")
);
