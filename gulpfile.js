var browserSync = require('browser-sync').create();
var gulp =  require("gulp");
var config = require("./fileConfig");
var sass = require("gulp-sass");

// Watch Files
var allSCSS = "./src/scss/**/*.scss";

// Create Web Server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

// Compile scss into css and pipe to /dist
gulp.task("compileSass", function() {
  return  gulp
    .src(config.source.sass)
    .pipe( sass() )
    .pipe(gulp.dest(config.dest.sass))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Watch fo changes
gulp.task("watch", ['browserSync'],function() {
  gulp.watch( allSCSS , ['compileSass']);
});