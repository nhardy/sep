import gulp from 'gulp';
import gutil from 'gulp-util';
import nodemon from 'nodemon';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../../config';
import webpackFactory from './factory';


gulp.task('webpack-prod', (done) => {
  webpack(
    [
      webpackFactory(
        require('./config/prod.server').default,
        require('../../config').default
      ),
      webpackFactory(
        require('./config/prod.client').default,
        require('../../config').default
      ),
    ],
    (error, stats) => {
      if (error) throw new gutil.PluginError('webpack-prod', error);

      gutil.log('[webpack-prod]', stats.toString({
        colors: true,
        chunkModules: false,
      }));

      done();
    });
});

gulp.task('webpack-client-dev', (done) => {
  const webpackConfig = webpackFactory(
    require('./config/dev.client').default,
    require('../../config').default
  );

  let loadedOnce = false;

  webpackConfig.writeStatsPluginCallback = () => {
    if (!loadedOnce) {
      loadedOnce = true;
      done();
    }
  };

  const server = new WebpackDevServer(
    webpack(webpackConfig),
    {
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

  server.listen(config.port, 'localhost', error => {
    if (error) throw new gutil.PluginError('webpack-dev-server', error);
    gutil.log('[webpack-dev-server]', 'Webpack Dev Server is now up');
  });
});

gulp.task('webpack-server-dev', (done) => {
  let loadedOnce = false;

  const compiler = webpack(
    webpackFactory(
      require('./config/dev.server').default,
      require('../../config').default
    )
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

    if (!loadedOnce) {
      done();
      loadedOnce = true;
    }
  });
});
