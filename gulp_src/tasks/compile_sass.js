var gulp = require('gulp'),
	config = require('../config.js'),
    sass = require('gulp-sass');

function compileSass () {
	return gulp.src(config.source.sass)
		.pipe(sass()) 
	    .pipe(gulp.dest(config.dest.sass));
};

module.exports = compileSass;