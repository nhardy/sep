import gulp from 'gulp';
import nodemon from 'nodemon';


gulp.task('serve', (cb) => {
  let started = false;
  const monitor = nodemon({
    script: 'server.js',
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });

  // https://github.com/JacksonGariety/gulp-nodemon/issues/77
  process.once('SIGINT', () => {
    monitor.once('exit', () => {
      process.exit();
    });
  });
});
