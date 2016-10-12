import gulp from 'gulp';
import runSequence from 'run-sequence';

import './clean';
import './database';
import './serve';
import './webpack';
import './deploy';


gulp.task('dev', (done) => {
  runSequence('clean', 'webpack-client-dev', 'webpack-server-dev', 'serve', done);
});

gulp.task('prod', (done) => {
  runSequence('clean', 'webpack-prod', 'serve', done);
});

gulp.task('default', () => {
  console.log('Run `npm run dev` for the dev task'); // eslint-disable-line no-console
});
