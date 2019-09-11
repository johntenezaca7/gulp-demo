var gulp = require('gulp'),
	config = require('../config.js'),
	scsslint = require('gulp-scss-lint');

function scssLint () {
  return gulp.src(config.source.sass)
    .pipe(scsslint({
        'config': './gulp_src/scss_lint.yml',
        'maxBuffer': 1072000
      }
    ));
};

module.exports = scssLint;