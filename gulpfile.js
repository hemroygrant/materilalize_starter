const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & inject into browser
gulp.task('sass', () => {
    return gulp.src(['node_modules/materialize-css/sass/materialize.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
})

// Move Js files to src/js
gulp.task('js', () => {
    return gulp.src(['node_modules/materialize-css/dist/js/materialize.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
})

// Watch Sass & Serve
gulp.task('serve', gulp.series('sass', () => {
    browserSync.init({
        server: "./src"
    })
    gulp.watch(['node_modules/materialize-css/sass/materialize.scss', 'src/scss/*.scss'], gulp.series(['sass']))
    gulp.watch("src/*.html").on('change', browserSync.reload)
}))

// Move font folder to source
gulp.task('fonts', () => {
    return gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('src/fonts'))
})

// Move font-awesome css to src/css
gulp.task('fa', () => {
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest('src/css'))
})

gulp.task('default', gulp.series(['js', 'fa', 'fonts', 'serve']))
