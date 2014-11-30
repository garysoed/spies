var gulp = require('gulp');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

var yuimd = require('yuimd');

gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
      .pipe(jshint({
        esnext: true
      }))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('traceur', ['jshint'], function() {
  return gulp.src('./src/main.js')
      .pipe(shell([
        'traceur --out <%= out %> <%= file.path %> --source-maps=file --symbols=true --modules=inline'
      ],
      {
        templateData: {
          out: 'main.js'
        }
      }));
});

gulp.task('test', ['traceur'], function() {
  return gulp.src('karma.conf.js')
    .pipe(shell(['karma start <%= file.path %> --single-run']))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('doc', function() {
  return gulp.src('gulpfile.js')
      .pipe(yuimd({
        'projectName': 'Spies',
        '$home': 'doc-theme/Home.theme',
        '$class': '../spies/doc-theme/class.theme',
        'src': './src/'
      }))
      .pipe(gulp.dest('doc'));
});

gulp.task('push', ['test', 'doc'], shell.task('git push'));

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.html'], ['test']);
});
