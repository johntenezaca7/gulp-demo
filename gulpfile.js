var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var jsoncombine = require("gulp-jsoncombine");
var gulp =  require("gulp");
var data = require('gulp-data');
var config = require("./fileConfig");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

var JSONDATA = require("./views/data/data.json");

// Watch Files
var allSCSS = "./src/scss/**/*.scss";
var allJS = "./src/js/**/*.js";
var allNJK = "./views/**/*.+(html|njk)";
var allJSON = "./views/data/**/*.json";

// Create Web Server

function browserInit() {
	browserSync.init({
		// proxy: "us.local.msasafety.com:9001",
    // browser: ['google-chrome'],
    server: {
      baseDir: "dist"
    },
	})
}

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: "dist"
//     },
//   })
// })

// Compile scss into css and pipe to /dist
gulp.task("build-SCSS", function() {
  return  gulp
    .src(config.source.sass)
    .pipe( sass() )
    .pipe(gulp.dest(config.dest.sass))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Bundle and Compile JS
gulp.task("build-JS", function() {
  return gulp
    .src([
      "./src/js/modules/*.js",
      "./src/js/init.js"
    ])
    .pipe( concat("index.js") )
    .pipe( uglify() )
    .pipe( gulp.dest(config.dest.js))
    .pipe(browserSync.reload({
      stream: true
    }));
    
});

// Compile JSON 
gulp.task("build-JSON", function() {
  return gulp
    .src("./views/data/modules/*.json")
    .pipe(jsoncombine("data.json",function(data){
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest("./views/data"));
});

// Compule Nunjucks
gulp.task("build-NJK", function() {
  // Gets .html and .nunjucks files in pages
  return gulp
    .src(["./views/pages/**/*.+(html|njk)"])
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ["./views/templates"],
        data: JSONDATA
      }))
    // output files in app folder
    .pipe(gulp.dest("./dist"));
});

gulp.task("scss-dev", ["build-SCSS"], function () {
	browserSync.reload();
})

gulp.task("js-dev", ["build-JS"], function() {
  browserSync.reload();
});

gulp.task("json-dev", ["build-JSON"], function() {
  browserSync.reload();
});

gulp.task("njk-dev", ["build-NJK"], function(done) {
  browserSync.reload();
});

gulp.task("watch",function() {
  browserInit();

  gulp.watch( allSCSS , ["scss-dev"]);
  gulp.watch( allJS, ["js-dev"]);
  // Compile JSON First!
  gulp.watch( allJSON, ['json-dev']);
  gulp.watch( allNJK, ["njk-dev"]);
});

gulp.task("gulp",["watch"]);

module.exports = gulp;
