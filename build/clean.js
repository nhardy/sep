import del from 'del';
import gulp from 'gulp';
import path from 'path';


gulp.task('clean', (done) => {
  del.sync(path.resolve(__dirname, '..', 'dist', '*'));
  done();
});
