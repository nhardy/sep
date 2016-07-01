import gulp from 'gulp';
import nodemon from 'nodemon';


gulp.task('serve', (done) => {
  let alreadyRunning = false;
  const monitor = nodemon({
    script: 'server.js',
  }).on('start', () => {
    if (!alreadyRunning) {
      done();
      alreadyRunning = true;
    }
  });

  // https://github.com/JacksonGariety/gulp-nodemon/issues/77
  process.once('SIGINT', () => {
    monitor.once('exit', () => {
      process.exit();
    });
  });
});
