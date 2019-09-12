var browserSync = require('browser-sync').create();
var gulp =  require("gulp");
var config = require("./fileConfig");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

// Watch Files
var allSCSS = "./src/scss/**/*.scss";
var allJS = "./src/js/**/*.js";

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

// Bundle and Compile JS
gulp.task("JS", function() {
  return gulp
    .src([
      "./src/js/modules/*.js",
      "./src/js/script.js"
    ])
    .pipe( concat("index.js") )
    .pipe( uglify() )
    .pipe( gulp.dest(config.dest.js))
    .pipe(browserSync.reload({
      stream: true
    }));
    
});

// Watch fo changes
gulp.task("watch", ["browserSync"],function() {
  gulp.watch( allSCSS , ["compileSass"]);
  gulp.watch( allJS, ["JS"]);
});