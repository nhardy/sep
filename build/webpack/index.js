import gulp from 'gulp';
import gutil from 'gulp-util';
import nodemon from 'nodemon';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../../config';
import webpackFactory from './factory';


gulp.task('webpack-prod', (done) => {
  webpack([
    webpackFactory({ production: true, client: false }),
    webpackFactory({ production: true, client: true }),
  ], (error, stats) => {
    if (error) throw new gutil.PluginError('webpack-prod', error);

    gutil.log('[webpack-prod]', stats.toString({
      colors: true,
      chunkModules: false,
    }));

    done();
  });
});

gulp.task('webpack-client-dev', (done) => {
  const webpackConfig = webpackFactory({ production: false, client: true });

  let alreadyRunning = false;

  webpackConfig.writeStatsPluginCallback = () => {
    if (!alreadyRunning) {
      alreadyRunning = true;
      done();
    }
  };

  const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': `http://localhost:${config.port + 1}/`,
    },
    staticOptions: {},
    quiet: false,
    noInfo: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    publicPath: '/dist/',
    stats: {
      colors: true,
      chunkModules: false,
    },
  });

  server.listen(config.port, '0.0.0.0', error => {
    if (error) throw new gutil.PluginError('webpack-dev-server', error);
    gutil.log('[webpack-dev-server]', 'Webpack Dev Server is now up');
  });
});

gulp.task('webpack-server-dev', (done) => {
  let alreadyRunning = false;

  const compiler = webpack(
    webpackFactory({ production: false, client: false })
  );

  compiler.watch({
    aggregateTimeout: 300,
    poll: true,
  }, (error, stats) => {
    if (error) throw new gutil.PluginError('webpack-client-dev', error);

    gutil.log('[webpack-client-dev]', stats.toString({
      colors: true,
      chunkModules: false,
    }));

    nodemon.restart();

    if (!alreadyRunning) {
      alreadyRunning = true;
      done();
    }
  });
});
