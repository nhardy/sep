import path from 'path';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import zip from 'gulp-zip';
import Application from 'azur';


gulp.task('compile', (done) => {
  runSequence('clean', 'webpack-prod', done);
});

gulp.task('package', ['compile'], () => {
  return gulp.src(['dist/**/*', 'server.js', 'iisnode.yml', 'package.json', 'npm-shrinkwrap.json', 'README.md'], { base: '.' })
    .pipe(zip('app.zip'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('deploy', ['package'], () => {
  const app = new Application({
    appName: process.env.AZURE_APP_NAME,
    username: process.env.AZURE_GIT_USERNAME,
    password: process.env.AZURE_GIT_PASSWORD,
    gitName: 'Automated Deployments',
    gitEmail: 'noreply@nhardy.id.au',
  });

  return app.deploy({
    archiveFilePath: path.resolve(__dirname, '..', '.tmp/app.zip'),
  });
});
