'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  merge: require('merge-stream'),
  browserSync: require('browser-sync').create(),  
  gp: require('gulp-load-plugins')({
      rename: {
          'gulp-css-unit': 'cssunit'
      }
  }),
  source: require('vinyl-source-stream'),
  browserify: require('browserify'),
  watchify: require('watchify'),
  nodemon: require('nodemon')
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:fonts',
    'css:foundation',
    'sprite:svg'
  ),
  $.gulp.parallel(
    'nodemon'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
