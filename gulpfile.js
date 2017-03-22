"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const gulpUtil = require("gulp-util");
const clean = require("del");

gulp.task("clean", () => {
    return clean(["./build/**/*"]);
});

gulp.task("sass", () => {
    gulp.src("./src/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 5 versions"],
            cascade: true
        }))
        .pipe(gulp.dest("./build/css"));
});

gulp.task("sass:watch", () => {
    gulp.watch("./src/sass/**/*.scss", ["sass"]);
});

gulp.task("bundle", () => {
    gulp.src("./src/orbit.js")
        .pipe(webpack( require("./webpack.config.js") ))
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", () => {
    gulp.src("./src/index.html").pipe(gulp.dest("./build"));
    gulp.src("./src/img/**/*").pipe(gulp.dest("./build/img"));
});

gulp.task("build", ["clean","sass","bundle", "copy"], () => {
    console.log("Orbit was built in /build");
});
