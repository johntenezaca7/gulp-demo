var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var JSONDATA = require("./views/data/data.json");
var browserSync = require("browser-sync").create();
var jsoncombine = require("gulp-jsoncombine");
var nunjucksRender = require("gulp-nunjucks-render");

var config = {
  source: {
    sass: "./src/scss/index.scss",
    js: {
      init: "./src/js/init.js",
      all: "./src/js/modules/*.js"
    },
    json: "./views/data/modules/*json",
    njk: "./views/pages/*.html"
  },
  dest: {
    sass: "./public/css/",
    js: "./public/js/",
    json: "./views/data/"
  },
  watch: {
    js: "./src/js/**/*.js",
    scss: "./src/scss/**/*.scss",
    json: "./views/data/**/*.json",
    njk: {
      shared: "./views/shared/*.html",
      layout: "./views/layout/*.html",
      pages: "./views/pages/*.html"
    }
  }
};

// Create Web Server
function browserInit() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: "public"
    }
  });
}

// SCSS
gulp.task("scss", function() {
  return gulp
    .src(config.source.sass)
    .pipe(sass())
    .pipe(gulp.dest(config.dest.sass))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("build-scss", ["scss"], function() {
  browserSync.reload();
});
// SCSS

// Javascript
gulp.task("js", function() {
  return gulp
    .src([config.source.js.all, config.source.js.init])
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest.js))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("build-js", ["js"], function() {
  browserSync.reload();
});
// Javascript

// JSON
gulp.task("json", function() {
  return gulp
    .src(config.source.json)
    .pipe(
      jsoncombine("data.json", function(data) {
        return new Buffer(JSON.stringify(data));
      })
    )
    .pipe(gulp.dest(config.dest.json))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("build-json", ["json"], function() {
  browserSync.reload();
});
// JSON

// NJK
gulp.task("njk", function() {
  gulp
    .src(config.source.njk)
    .pipe(
      nunjucksRender({
        path: ["./views/layout", "./views/shared"],
        data: JSONDATA
      })
    )
    .pipe(gulp.dest("./public"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("build-njk", ["njk"], function() {
  browserSync.reload();
});
// NJK

gulp.task(
  "default",
  ["build-scss", "build-js", "build-json", "build-njk"],
  function() {
    browserSync.reload();
  }
);

gulp.task("watch", function() {
  browserInit();

  gulp.watch(config.watch.scss, ["default"]);
  gulp.watch(config.watch.js, ["default"]);
  gulp.watch(config.watch.json, ["default"]);
  gulp.watch(
    [config.watch.njk.shared, config.watch.njk.layout, config.watch.njk.pages],
    ["default"]
  );
});
