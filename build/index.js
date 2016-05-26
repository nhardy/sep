import gulp from 'gulp';
import runSequence from 'run-sequence';

import './clean';
import './serve';
import './webpack';


gulp.task('dev', () => {
  runSequence('clean', 'webpack-client-dev', 'webpack-server-dev', 'serve');
});

gulp.task('prod', () => {
  runSequence('clean', 'webpack-prod', 'serve');
});

gulp.task('default', () => {
  console.log('Run `npm run dev` for the dev task'); // eslint-disable-line no-console
});
