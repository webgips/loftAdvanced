'use strict';

module.exports = function() {
  $.gulp.task('build', $.gulp.series(
  	'clean',
    $.gulp.parallel(
	    'sass',
	    'pug',
	    'js:foundation',
	    'js:process',
	    'copy:image',
	    'copy:fonts',
	    'css:foundation',
	    'sprite:svg',
	    'sprite:png'
  	)
  	));	
};
