var gulp = require('gulp');
var cssminify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var webserver = require('gulp-webserver');
var browsersync = require('browser-sync').create();

var app = {
    src: 'app',
    css: 'app/css/*.css',
    js: 'app/scripts/**/*.js',
    dist: 'dist',
    scss: 'app/scss/**/*.scss',
    html: 'app/*.html',
    images: 'app/images/*.*'
}

// 監看異動的task
gulp.task('watch', function () {

    gulp.watch("app/css/*.css", ['css']); //有異動就執行task
    gulp.watch("app/scripts/*.js", ['js']);
    gulp.watch("app/images/*.*", ['images']);
    gulp.watch("app/*.html", ['html']).on('change', browsersync.reload);

});

gulp.task('run', ['build'], function () {
    console.log('runing....');
    gulp.start('server');
});

gulp.task('server', ['watch'], function () {

    gulp
        .src('./dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            directoryListing: {
                enable: true,
                path: 'dist'
            },
            open: true,
            port: 8080
        }));

});

gulp.task('images', function () {
    gulp
        .src(app.images)
        .pipe(gulp.dest(app.dist + '/images'))
    //.pipe(connect.reload());
});

gulp.task('html', function () {
    gulp
        .src(app.html)
        .pipe(gulp.dest(app.dist))
    //.pipe(connect.reload());
});

gulp.task('scss', function () {
    gulp.src(app.scss) // 指定要處理的 Scss 檔案目錄
        .pipe(sass()) // 編譯 Scss
        .pipe(gulp.dest(app.css)); // 指定編譯後的 css 檔案目錄
});

gulp.task('css', function () {
    return gulp
        .src(app.css)
        .pipe(cssminify())
        .pipe(gulp.dest(app.dist + '/css'));
});

gulp.task('js', function (cb) {
    pump([
        gulp.src(app.js),
        uglify(),
        gulp.dest(app.dist + '/scripts')
    ], cb);
});

// gulp.task('clean-css', function () {     var clean_path = app.dist + '/css';
//  return gulp         .src(clean_path, {read: false}) .pipe(clean()); });
// gulp.task('clean-scripts', function () {     var clean_path = app.dist +
// '/scripts';     return gulp         .src(clean_path, {read: false})
// .pipe(clean()); });

gulp.task('build', ['clean'], function () {
    console.log('building....');
    gulp.start('dist');
});

gulp.task('dist', ['css', 'js', 'html', 'images'], function () {
    console.log('created dist....');
});

//清除dist資料
gulp.task('clean', function () {

    var js = app.dist + '/scripts';
    var css = app.dist + '/css';
    var html = app.dist + '/*.html';
    var images = app.dist + '/images';
    return gulp.src([js, css, html, images], {
        read: true
    }).pipe(clean());

    //console.log('cleaned....');

});