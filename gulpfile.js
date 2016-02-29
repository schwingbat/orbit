'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var webpack = require('webpack-stream')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var gulpUtil = require('gulp-util')
var clean = require('del')


gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass'])
})

gulp.task('compress', function() {
    gulp.src('./bundle.js')
        //.pipe(webpack())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
})

gulp.task('clean', function() {
    return clean(['./build/**/*'])
})

gulp.task('build', ['clean','sass','compress'], function() {
    gulp.src('./index.html').pipe(gulp.dest('./build'))
    gulp.src('./img/**/*').pipe(gulp.dest('./build/img'))
    gulp.src('./css/**/*').pipe(gulp.dest('./build/css'))
})
