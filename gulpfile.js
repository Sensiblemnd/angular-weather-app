var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');


gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(prefix('last 1 version'))
                .pipe(csso())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('css'))
                .pipe(bs.reload({stream: true}));

});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch("js/*.js").on('change', bs.reload);

});