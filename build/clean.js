import path from 'path';

import del from 'del';
import gulp from 'gulp';


gulp.task('clean', (done) => {
  del.sync(path.resolve(__dirname, '..', 'dist', '*'));
  done();
});
