import path from 'path';
import { identity } from 'lodash';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  BannerPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  optimize,
  ProvidePlugin,
} from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WriteManifestPlugin from './plugins/WriteManifestPlugin';


const hashType = (production) => {
  return production ? 'chunkhash' : 'hash';
};

const stylusLoader = ({ production, client }) => {
  const cssLoaderQuery = `importLoaders=2&modules&localIdentName=[path][name]--[local]--[${hashType(production)}:base64:5]`;
  if (client) {
    return production
      ? ExtractTextPlugin.extract(
        `css?${cssLoaderQuery}!postcss!stylus`
      ) : `style?singleton!css?${cssLoaderQuery}!postcss!stylus`;
  }
  return `css/locals?${cssLoaderQuery}!postcss!stylus`;
};

const cssLoader = ({ production, client }) => {
  if (client) {
    return production
      ? ExtractTextPlugin.extract(
        'css'
      ) : 'style?singleton!css';
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
          loaders: [!production && 'react-hot', 'babel'].filter(identity),
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
          loader: 'url?limit=5120&name=[name]-[hash:6].[ext]',
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
      client && production && new ExtractTextPlugin('[name]-[contenthash:6].css', {
        allChunks: true,
      }),
      !client && !production && new BannerPlugin('require("source-map-support").install();', {
        raw: true,
        entryOnly: false,
      }),
      production && new optimize.DedupePlugin(),
      production && new optimize.OccurenceOrderPlugin(),
      production && new optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      client && new WriteManifestPlugin({ client }),
    ].filter(identity),

    resolve: {
      alias: {
        root: path.resolve(__dirname, '..', '..', 'src'),
      },
      extensions: ['', '.json', '.js', '.styl'],
      modulesDirectories: [
        'src',
        'node_modules',
      ],
    },
  };
}
