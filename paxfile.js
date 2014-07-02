var spawn = require('child_process').spawn;

module.exports = function() {

    var Q = this.require('q'),
        that = this;

    this.task('bower', function(logger) {
        logger.head('Bower init');
        var bower = spawn('bower', ['install']),
            defer = Q.defer();

        bower.stdout.on('data', function(d) {
            logger.log(d.toString().trim());
        });

        bower.stderr.on('data', function(d) {
            logger.error(d.toString().trim());
        });

        bower.on('close', function (code) {
            defer.resolve();
        });

        return defer.promise;
    });

    this.task('gulp', function(logger) {
        logger.head('Gulp');

        var gulp = spawn('gulp'),
            defer = Q.defer();

        gulp.stdout.on('data', function(d) {
            logger.log(d.toString().trim());
        });

        gulp.stderr.on('data', function(d) {
            logger.error(d.toString().trim());
        });

        gulp.on('close', function (code) {
            defer.resolve();
        });

        return defer.promise;
    });

    this.task('init', function(logger) {
        return that.exec(['bower'], logger)
            .then(function() {
                return that.exec(['gulp'], logger);
            });
    });

    this.task('watch', function(logger) {
        logger.head('Watch');

        var gulp = spawn('gulp', ['watch']),
            defer = Q.defer();

        gulp.stdout.on('data', function(d) {
            logger.log(d.toString().trim());
        });

        gulp.stderr.on('data', function(d) {
            logger.error(d.toString().trim());
        });

        gulp.on('close', function (code) {
            defer.resolve();
        });

        return defer.promise;
    });

};