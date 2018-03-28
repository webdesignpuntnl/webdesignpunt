var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var paths = {
    scss: './_source/scss/*.scss'
};

// Uglifies JS
gulp.task('scripts', function(){
    gulp.src('_source/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({
        mangle: false,
        compress: false,
        output: { beautify: true }
       }))
    .on('error', console.error.bind(console)) // outputs error and keeps gulp running
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/js'));
});


// sass
gulp.task('sass', function(){
    gulp.src('_source/scss/webdesignpuntnl-styles.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(gulp.dest('www/css'));
});
gulp.task('browser-sync', function(){
    browserSync.init(["www/css/*.css", "www/js/*.js", "www/*.html", "www/pages/*.html"], {
        server: {
            baseDir: "www"
        }
    })
});

gulp.task('default', ['sass', 'browser-sync', 'scripts'], function(){
    gulp.watch(["_source/scss/*.scss", "www/*.html", "www/pages/*.html"], ['sass'], ['scripts']);
});