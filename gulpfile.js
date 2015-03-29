var gulp = require('gulp');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var yuidoc = require('gulp-yuidoc');

var yuimd = require('yuimd');

var handleError = function(error) {
  console.log(error.toString());
  this.emit('end');
};

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

gulp.task('test-dev', ['traceur'], function() {
  return gulp.src('karma.conf.js')
      .pipe(shell(['karma start <%= file.path %>']))
      .on('error', handleError);
});

gulp.task('doc-gen', shell.task('yuidoc --config yuidoc.json --extension .js --no-code --helpers ./node_modules/doctheme/helpers.js'));
gulp.task('doc', ['doc-gen'], function() {
  return gulp.src(['doc/**'])
      .pipe(gulp.dest('../spies-doc'));
});

gulp.task('yuidoc', shell.task('yuidoc --config yuidoc.json'));

gulp.task('push', ['test', 'doc'], shell.task('git push'));

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.html'], ['traceur']);
});
