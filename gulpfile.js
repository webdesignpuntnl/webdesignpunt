const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const purifycss = require('gulp-purifycss');
const paths = {
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


// sass compiling
gulp.task('sass', function(){
    gulp.src('_source/scss/webdesignpuntnl-styles.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded', // nested, compact, expanded, compressed
            includePaths: ['scss']
        }))
        .on('error', console.error.bind(console))
        .pipe(prefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/css'));
});

// remove unused css
gulp.task('css', function() {
    return gulp.src('./www/css/webdesignpuntnl-styles.css')
      .pipe(purifycss(['./www/**/*.js', './www/**/*.html']))
      .pipe(gulp.dest('./www/css'));
});

// browser-sync
gulp.task('browser-sync', function(){
    browserSync.init(["www/css/*.css", "www/js/*.js", "www/*.html", "www/pages/*.html" , "www/media/images/*"], {
        server: {
            baseDir: "www"
        }
    })
});

// optimize images 
    gulp.task('image', function(){
    gulp.src('_source/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
	        imagemin.jpegtran({progressive: true}),
	        imagemin.optipng({optimizationLevel: 5}),
	        imagemin.svgo({
		        plugins: [
			        {removeViewBox: true},
			        {cleanupIDs: false}
		        ]
	        })
        ]))
        .pipe(gulp.dest('www/media/images'));
    });

gulp.task('default', ['sass', 'browser-sync', 'scripts', 'image', 'css'], function(){
    gulp.watch(["_source/scss/*.scss", "_source/js/*.js", "_source/images/*", "www/*.html", "www/pages/*.html", "www/js/*.js"], ['sass', 'scripts', 'image', 'css']);
});