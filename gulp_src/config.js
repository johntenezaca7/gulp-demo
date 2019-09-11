
module.exports = {
  source: {
      js: 'precompiled/js/' + '**/*.js',
      sass: 'precompiled/scss/' + '**/*.scss',
      minifyCSS: '../_ui/msa/css/' + '**/*.css',
      minifyJS: '../js/' + '**/*.js'
  },
  dest: {
      css: '../_ui/msa/css/',
      js: '../js/',
      sass: 'precompiled/css/'
  },
  filename: {
      css: 'msa.css',
      js: 'msa.js'
  }
}
