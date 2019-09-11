var gulp = require('gulp'),
  	config = require('../config.js'),
	concat = require('gulp-concat');

function concatJS (cb) {
	return gulp.src(config.source.js)
    	.pipe(concat(config.filename.js))
    	.pipe(gulp.dest(config.dest.js));
  	cb(err);
};

module.exports = concatJS;