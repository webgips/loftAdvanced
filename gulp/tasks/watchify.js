'use strict';

module.exports = function() {
    var bun = $.browserify({
        entries: $.path.app,
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    });

    $.gulp.task('watchify', function() {
	var bundler = $.watchify(bun);
	bundler.on('update', rebundle);
	function rebundle() {
		return bundler.bundle()
		.pipe($.source('app.min.js'))
		.pipe($.gulp.dest($.config.root + '/assets/js'));
	}
	return rebundle();
	});
};