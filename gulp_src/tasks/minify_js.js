var gulp = require('gulp'),
	config = require('../config.js'),
	uglify = require('gulp-uglify'),
	pump = require('pump');

function minifyJS () {
  pump([
      gulp.src(config.source.minifyJS),
      uglify(),
      gulp.dest(config.dest.js)
  ]);
};

module.exports = minifyJS;