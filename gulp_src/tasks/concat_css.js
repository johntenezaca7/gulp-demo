var gulp = require('gulp'),
  concatCSS = require('gulp-concat-css'),
  config = require('../config.js');

function concatCss (cb) {
  return gulp.src(config.source.css)
    .pipe(concatCSS(config.filename.css))
    .pipe(gulp.dest(config.dest.css));
  cb(err);
};

module.exports = concatCss;