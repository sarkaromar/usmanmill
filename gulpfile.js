// main require var
var gulp = require('gulp');
// others require plugins
var sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if');

    var paths = {
      html: "src/**/*.html",
      css: "src/**/*.css"
    };

    // task start

    gulp.task('browserSync', function() {
      browserSync.init({
        server: {
          baseDir: 'app'
        },
      })
    });

    gulp.task('sass', function(){
      return gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
    });

    gulp.task('watch:sass', function () {
      gulp.watch('app/sass/*.scss', ['sass']); 
    });

    gulp.task('useref', function(){
      return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('app/**/*.js', uglify()))
        .pipe(gulp.dest('dist'))
    });

// default task
gulp.task('default', ['sass', 'watch:sass', 'useref', 'browserSync']);
