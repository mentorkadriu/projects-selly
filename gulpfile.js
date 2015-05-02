var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  });
});


gulp.task('scss', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(sass({
          outputStyle: 'nested',   // Type: String Default: nested Values: nested, compressed
          precision: 3 // Type: Integer Default: 5
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

// Gulp default task for fonts

gulp.task('fonts', function(){
  return gulp.src('assets/fonts/**/*')
    .pipe( gulp.dest('dist/fonts/'));
});


// Gulp default task for javascript

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(plumber())
    .pipe( gulp.dest('dist/js/'));
});


// Gulp default task for images

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('dist/images/'));
})


// Gulp default task for templates

gulp.task('templates', function() {
  return gulp.src('assets/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') );
});



// Gulp default task

gulp.task('default',['browser-sync', 'scss','fonts','js','templates', 'images'], function () {
  
  gulp.watch('assets/scss/*.scss',['scss', reload]);

  gulp.watch('assets/fonts/**/*',['fonts', reload]);

  gulp.watch('assets/scripts/*.js',['js', reload]);

  gulp.watch('assets/images/**/*',['images', reload]);

  gulp.watch('assets/*.jade',['templates', reload]);

});
