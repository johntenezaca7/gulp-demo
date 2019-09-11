var gulp = require('gulp'),
  	config = require('../config.js'),
  	postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

function postCSS () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']}),
    ];
    return gulp.src(config.source.css)
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.dest.css));
}

module.exports = postCSS