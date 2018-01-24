"use strict";

const gulp = require("gulp");

gulp.task('styles', function () {
  var nib = require('nib');
  const stylus = require('gulp-stylus');

  gulp.src('src/**/*.styl')
    .pipe(stylus({use: nib(), compress: false}))
    .pipe(gulp.dest('src'));
});
