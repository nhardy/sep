import path from 'path';
import { identity } from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  BannerPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  optimize,
} from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WriteManifestPlugin from './plugins/WriteManifestPlugin';


const hashType = config => {
  return config.optimise ? 'chunkhash' : 'hash';
};

const stylusLoader = config => {
  const cssLoaderQuery = 'modules&localIdentName=[path][name]--[local]--[hash:base64:5]';
  if (config.type === 'server') {
    return `css/locals?${cssLoaderQuery}!stylus`;
  }
  return config.hotReload
    ? `style?singleton!css?${cssLoaderQuery}!stylus`
    : ExtractTextPlugin.extract(
      `css?${cssLoaderQuery}!stylus`
    );
};

const cssLoader = config => {
  if (config.type === 'server') {
    return 'css';
  }
  return config.hotReload
    ? 'style?singleton!css'
    : ExtractTextPlugin.extract(
      'css'
    );
};

export default function webpackFactory(config, appConfig) {
  return {
    stats: {
      children: false,
    },

    entry: {
      client: {
        bundle: [
          config.hotReload && 'webpack-dev-server/client?/',
          config.hotReload && 'webpack/hot/only-dev-server',
          'babel-polyfill',
          path.resolve(__dirname, '..', '..', 'src', 'client', 'index.js'),
        ].filter(identity),
      },
      server: {
        server: [
          'babel-polyfill',
          path.resolve(__dirname, '..', '..', 'src', 'server', 'index.js'),
        ],
      },
    }[config.type],

    output: {
      filename: config.type === 'server'
        ? '[name].js'
        : `[name]-[${hashType(config)}:6].js`,
      path: path.resolve(__dirname, '..', '..', 'dist'),
      publicPath: `http://localhost:${appConfig.port}/dist/`,
    },

    target: { client: 'web', server: 'node' }[config.type],

    externals: [config.type === 'server' && nodeExternals({
      whitelist: [], // Include 3rd party css imports here
    })].filter(identity),

    devtool: config.debug || config.type === 'server' ? 'cheap-module-inline-source-map' : 'hidden-source-map',

    debug: true,

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [config.hotReload && 'react-hot', 'babel'].filter(identity),
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.styl$/,
          loader: stylusLoader(config),
        },
        {
          test: /\.css$/,
          loader: cssLoader(config),
        },
        {
          test: /\.(?:png|svg|woff2?|eot|ttf)$/,
          loader: 'url?limit=5120&name=[name]-[hash:6].[ext]',
        },
      ],
    },

    plugins: [
      new DefinePlugin({
        __CLIENT__: config.type === 'client',
        __DEVELOPMENT__: config.debug,
        __SERVER__: config.type === 'server',
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new NoErrorsPlugin(),
      config.hotReload && new HotModuleReplacementPlugin(),
      config.type === 'client' && !config.hotReload && new ExtractTextPlugin('[name]-[contenthash:6].css', {
        allChunks: true,
      }),
      config.type === 'server' && config.debug && new BannerPlugin('require("source-map-support").install();', {
        raw: true,
        entryOnly: false,
      }),
      config.optimise && new optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      config.type === 'client' && new WriteManifestPlugin(config),
    ].filter(identity),

    resolve: {
      alias: {
        root: path.resolve(__dirname, '..', '..', 'src'),
      },
      extensions: ['', '.json', '.js'],
      modulesDirectories: [
        'src',
        'node_modules',
      ],
    },
  };
}
