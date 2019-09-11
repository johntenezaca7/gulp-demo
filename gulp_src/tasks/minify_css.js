var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  config = require('../config.js');

function minifyCSS() {
  return gulp.src(config.source.minifyCSS)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.dest.css));
}

module.exports = minifyCSS;