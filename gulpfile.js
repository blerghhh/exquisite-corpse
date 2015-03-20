'use strict';

var gulp         = require('gulp'),
    del          = require('del'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;


gulp.task('clean', function() {
  del(['.tmp', 'public']);
});

gulp.task('sass', function () {
  return gulp.src('app/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function () {
  return gulp.src('app/**/*.js')
    .pipe(gulp.dest('public'));
});

gulp.task('views', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts', 'views');
});

gulp.task('serve', ['default'], function() {
    browserSync({
        server: "./"
    });
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/**/*.html', ['views']);
    gulp.watch(['public/**']).on('change', reload);
});
