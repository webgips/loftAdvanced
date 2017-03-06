'use strict';

module.exports = function() {
  $.gulp.task('browserify', function() {
    return $.browserify($.path.app)
		.bundle()
		.pipe(source('app.min.js'))
		.pipe($.gulp.dest($.config.root + '/assets/js'))
});
 