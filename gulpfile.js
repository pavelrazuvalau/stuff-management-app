var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    server     = require('gulp-webserver'),
    rename     = require('gulp-rename'),
    clean      = require('gulp-clean');

gulp.task('app', function(){
  return gulp.src(['client/config.js', 'client/core.js', 'client/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
     .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'));
});

gulp.task('views', function(){
  return gulp.src('client/**/views/*.html')
  .pipe(rename({dirname:''}))
  .pipe(gulp.dest('public/views'));
});

gulp.task('watch', function(){
  gulp.watch('client/**/*.js', ['app']);
  gulp.watch('client/**/views/*.html', ['views']);
});

gulp.task('server', function(){
  gulp.src('public')
      .pipe(server({
        livereload: true,
        directoryListing: false,
        open: false
      }));
})

gulp.task('default', ['app', 'views', 'watch', 'server']);
