const gulp = require('gulp');
const concat =  require('gulp-concat');
const pump = require('pump');

const entry = 'source/*.js';
const name = 'lineemotes.plugin.js';
const betterdiscord = process.env.appdata + '/BetterDiscord/plugins/';
const build = 'dist';

const deploy = true; // copy built plugin directly into BetterDiscord


gulp.task('build', function (callback) {
    if (deploy) {
        pump([
            gulp.src(entry),
            concat(name),
            gulp.dest(build),
            gulp.dest(betterdiscord)
        ], callback);
    } else {
        pump([
            gulp.src(entry),
            concat(name),
            gulp.dest(build)
        ], callback);
    } 
});

gulp.task('build:watch', function () {
    gulp.watch(entry, ['build']);
});
