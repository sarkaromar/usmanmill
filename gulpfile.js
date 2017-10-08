var gulp = require('gulp');
var sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

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
    gulp.task('watch', ['browserSync'], function (){
      gulp.watch('app/sass/*.scss', ['sass']); 
    })
    gulp.task('watch:sass', function () {
      gulp.watch('app/sass/*.scss', ['sass']); 
    });

    gulp.task('default', ['sass', 'watch:sass', 'browserSync']);
