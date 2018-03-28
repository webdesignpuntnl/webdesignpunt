// call Gulp and Packages
var gulp =  require('gulp'),
        uglify = require('gulp-uglify'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
     //   imagemin = require('gulp-imagemin'),
        prefix = require('gulp-autoprefixer'),
        livereload = require('gulp-livereload'); // live reload in the browser
        
// script task
// Uglifies JS
gulp.task('scripts', function(){
    gulp.src('_source/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({
        mangle: false,
        compress: false,
        output: { beautify: true }
       }))
    .on('error', console.error.bind(console)) // outputs error and keerps gulp running
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/js'))
    .pipe(livereload()); 
});

// styles task
// converting Sass to css
gulp.task('styles', function(){
gulp.src('_source/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        style: 'expanded', // nested, compact, expanded, compressed
    }))
    //     compass: 'true'
    // }))

    .on('error', console.error.bind(console))
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/css'))
    .pipe(livereload()); 
    });

    // image task
    // compressing
    // gulp.task('image', function(){
    // gulp.src('_source/images/*')
    //     .pipe(imagemin())
    //     .pipe(gulp.dest('www/images'));
    // });

    // watch html
 gulp.task('html', function() {
    gulp.src('www/*.html')
      .pipe(livereload());
  });

// watch task
// watches JS and Sass
gulp.task('watch', function() {

    livereload.listen();

    gulp.watch('_source/js/*.js', ['scripts']);  // watch JS
    gulp.watch('_source/sass/*.scss', ['styles']); // watch sass
    gulp.watch('www/*.html', ['html']);
    gulp.watch('www/pages/**/**/*.html', ['html']);
});

// gulp default tasks
gulp.task( 'default' , ['scripts', 'styles', 'watch']);
