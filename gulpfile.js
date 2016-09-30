var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve('MakingCollaboration/MakingCollaboration'));

gulp.task('default', ['serve']);
