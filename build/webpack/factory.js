import path from 'path';

import { identity } from 'lodash';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
import nodeExternals from 'webpack-node-externals';

// @see https://github.com/benmosher/eslint-plugin-import/issues/488
/* eslint-disable */
import {
  BannerPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  optimize,
  ProvidePlugin,
} from 'webpack';
/* eslint-enable */

import WriteManifestPlugin from './plugins/WriteManifestPlugin';


const hashType = (production) => {
  return production ? 'chunkhash' : 'hash';
};

const stylusLoader = ({ production, client }) => {
  const query = {
    importLoaders: 2,
    modules: true,
    localIdentName: `[path][name]--[local]--[${hashType(production)}:base64:5]`,
  };
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        loader: combineLoaders([
          {
            loader: 'css',
            query,
          },
          {
            loader: 'postcss',
          },
          {
            loader: 'stylus',
          },
        ]),
      }) : combineLoaders([
        { loader: 'style', query: { singleton: true } },
        { loader: 'css', query },
        { loader: 'postcss' },
        { loader: 'stylus' },
      ]);
  }
  return combineLoaders([
    {
      loader: 'css/locals',
      query,
    },
    {
      loader: 'postcss',
    },
    {
      loader: 'stylus',
    },
  ]);
};

const cssLoader = ({ production, client }) => {
  if (client) {
    return production
      ? ExtractTextPlugin.extract({
        loader: 'css',
      }) : combineLoaders([{ loader: 'style', query: { singleton: true } }, { loader: 'css' }]);
  }
  return 'css/locals';
};

export default function webpackFactory({ production = false, client = false }) {
  return {
    stats: {
      children: false,
    },

    entry: client ? {
      bundle: [
        !production && 'webpack-dev-server/client?/',
        !production && 'webpack/hot/only-dev-server',
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'src', 'client', 'index.js'),
      ].filter(identity),
    } : {
      server: [
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'src', 'server', 'index.js'),
      ],
    },

    output: {
      filename: client
        ? '[name]-[hash:6].js'
        : '[name].js',
      path: path.resolve(__dirname, '..', '..', 'dist'),
      publicPath: '/dist/',
    },

    target: client ? 'web' : 'node',

    externals: [!client && nodeExternals({
      whitelist: [
        'font-awesome/css/font-awesome.min.css',
        'gemini-scrollbar/gemini-scrollbar.css',
      ],
    })].filter(identity),

    devtool: !production || !client
      ? 'cheap-module-inline-source-map'
      : 'hidden-source-map',

    debug: true,

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            !production && {
              loader: 'react-hot-loader',
            },
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  // UglifyJS cannot currently work with the level of ES6 webpack2 can
                  production ? ['es2015', { modules: false }] : 'modern/webpack2',
                  // Safari9 support in dev mode
                  !production && 'modern/safari9',
                  'stage-0',
                  'react',
                ].filter(identity),
                plugins: [
                  [
                    'transform-async-to-module-method',
                    {
                      module: 'bluebird',
                      method: 'coroutine',
                    },
                  ],
                  'transform-decorators-legacy',
                ],
              },
            },
          ].filter(identity),
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.styl$/,
          loader: stylusLoader({ production, client }),
        },
        {
          test: /\.css$/,
          loader: cssLoader({ production, client }),
        },
        {
          test: /\.(?:jpe?g|png|svg|woff2?|eot|ttf)(?:\?.*$|$)/,
          loader: 'url',
          query: {
            limit: 5120,
            name: '[name]-[hash:6].[ext]',
          },
        },
      ],
    },

    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

    plugins: [
      new DefinePlugin({
        __CLIENT__: client,
        __DEVELOPMENT__: !production,
        __SERVER__: !client,
        // 'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
      new NoErrorsPlugin(),
      !production && new HotModuleReplacementPlugin(),
      client && production && new ExtractTextPlugin({
        filename: '[name]-[contenthash:6].css',
        allChunks: true,
      }),
      !client && !production && new BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      production && new optimize.DedupePlugin(),
      production && new optimize.OccurrenceOrderPlugin(),
      client && production && new optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      client && new WriteManifestPlugin({ client }),
    ].filter(identity),

    resolve: {
      extensions: ['', '.json', '.js', '.styl'],
      modules: [
        'src',
        'node_modules',
      ],
    },
  };
}
