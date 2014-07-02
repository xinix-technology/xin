var path = require('path'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

gulp.task('js', function() {
    var scripts = [
        "./src/global.js",
        "./src/detect.js",
        "./src/app.js",
        "./src/ioc.js",
        "./src/router.js",
        "./src/directive.js",
        "./src/provider.js",
        "./src/fx.js",
        "./src/ui.js",
        "./src/directive/AppDirective.js",
        "./src/directive/RoleDirective.js",
        "./src/directive/URIDirective.js",
        "./src/directive/BindDirective.js",
        "./src/ui/Layout.js",
        "./src/ui/Outlet.js",
        "./src/ui/Pane.js",
        "./src/ui/List.js",
        "./src/ui/Drawer.js",
        "./src/ui/Navbar.js"
    ];

    gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('xin.js'))
        .pipe(gulp.dest('./js'));

    gulp.src(scripts)
        .pipe(concat('xin.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));

});

gulp.task('lib', function() {
    gulp.src('./bower_components/backbone/backbone-min.js')
        .pipe(gulp.dest('./vendor'));

    gulp.src('./bower_components/underscore/underscore-min.js')
        .pipe(gulp.dest('./vendor'));

    gulp.src('./bower_components/jquery/index.js')
        .pipe(rename({
            basename: 'jquery.min'
        }))
        .pipe(gulp.dest('./vendor'));
});

gulp.task('css', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(compass({
            css: 'css',
            sass: 'scss',
            image: 'img',
        }))
        .pipe(gulp.dest('css'));

    gulp.src('./scss/**/*.scss')
        .pipe(compass({
            css: 'css',
            sass: 'scss',
            image: 'img',
        }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('scss/**/*.scss', ['css']);
});