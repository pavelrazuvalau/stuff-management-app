var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    server     = require('gulp-webserver');

var config = {
  appConfig:  'public/app/config.js',
  appCore:    'public/app/core.js',
  appModules: 'public/app/**/*.client.module.js',
  appSource:  'public/app/**/*.js',
  dest:       'app.js',
  destDir:    'public/js'
};

gulp.task('app', function(){
  return gulp.src([config.appConfig, config.appCore, config.appModules, config.appSource])
    .pipe(sourcemaps.init())
      .pipe(concat(config.dest))
      .pipe(ngAnnotate())
      .pipe(uglify())
     .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.destDir));
});

gulp.task('watch', function(){
  gulp.watch(config.appSource, ['app']);
});

gulp.task('server', function(){
  gulp.src('public')
      .pipe(server({
        livereload: true,
        directoryListing: false,
        open: false
      }));
})

gulp.task('default', ['app', 'watch', 'server']);
