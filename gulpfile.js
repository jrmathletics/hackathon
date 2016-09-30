var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve('web'));

gulp.task('default', ['serve']);
