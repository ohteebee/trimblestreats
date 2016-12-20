var gulp = require('gulp'),
  sass = require('gulp-sass');

var paths = {
  'sassRoot': 'src/styles.scss',
  'sass': 'src/**/*.scss',
  'destination': 'src'
};

gulp.task('sass', function() {
  return gulp.src(paths.sassRoot)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  // gulp.watch(paths.ts, ['compile']);
});
