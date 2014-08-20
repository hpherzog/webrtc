

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('client', function(){

    gulp
        .src('./app/client/index.js')
        .pipe(browserify())
        .pipe(rename('webrtc.js'))
        .pipe(gulp.dest('./public/js'));
});