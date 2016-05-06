/* eslint-env node */
'use strict';

var path              = require("path");
var webpack           = require("webpack");
const validate        = require("webpack-validator");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');
var StatsPlugin       = require('stats-webpack-plugin');

var env = process.env.NODE_ENV;
var production = env === 'production';

var devPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: 'app/index.tmpl.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new ExtractTextPlugin('[name].css'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new HtmlWebpackPlugin({
    template: 'app/index.tmpl.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new ExtractTextPlugin('[name]-[hash].min.css'),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new StatsPlugin('webpack.stats.json', {
    source: false,
    modules: false
  })
];

var prodEntry = [
  path.join(__dirname, 'app/main.js')
];

var devEntry = [
  'webpack-hot-middleware/client?reload=true',
  path.join(__dirname, 'app/main.js')
];

var config = {
  devtool: production ? 'cheap-module-source-map' : 'eval-source-map',
  // context: __dirname + '/app',
  entry: production ? prodEntry : devEntry,
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: production ? '[name]-[hash].min.js' : '[name].js',
    publicPath: '/'
  },
  plugins: production ? prodPlugins : devPlugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
        )
      }
    ]
  },
  postcss: function() {
    return [
      precss,
      autoprefixer({ browsers: 'last 2 version' })
    ];
  }
};

module.exports = validate(config);
