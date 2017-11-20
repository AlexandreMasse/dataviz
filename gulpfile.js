const gulp      = require('gulp'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber');

// Tache watch

gulp.task('default', function(){
    gulp.watch('styles/**/*.scss', ['sass']);
});

// Tache de compilation des fichiers Sass

gulp.task('sass', function() {
    return gulp.src('styles/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('styles'));
});