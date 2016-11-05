'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var webpack = require('webpack-stream')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var gulpUtil = require('gulp-util')
var clean = require('del')

gulp.task('clean', function() {
    return clean(['./build/**/*'])
})

gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./build/css'))
})

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
})

gulp.task('bundle', function() {
    gulp.src('./src/orbit.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
})

gulp.task('copy', function() {
    gulp.src('./src/index.html').pipe(gulp.dest('./build'))
    gulp.src('./src/img/**/*').pipe(gulp.dest('./build/img'))
})

gulp.task('build', ['clean','sass','bundle', 'copy'], function() {
    console.log('Orbit was built in /build')
})
