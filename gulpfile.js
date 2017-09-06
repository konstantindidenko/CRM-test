var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed'
    },
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create()

// sass task
gulp.task('sass', function() {
    // compile sass
    return gulp.src(['./src/sass/*.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass(sassOptions).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// pug task
gulp.task('html', function buildHTML() {
	return gulp.src('./src/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
});

// watch task
gulp.task('watch', function() {
    gulp.watch(['./src/sass/*.scss'], ['sass']);
    gulp.watch('./src/**/*.pug', ['html']);
    /*gulp.watch(['./src/js/!*.js'], ['js']);*/
});

// serve task
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'html', 'watch', 'serve']);
