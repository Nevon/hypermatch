const webpack = require('webpack')
const path = require('path')
const package = require('./package.json')

const env = process.env.NODE_ENV
const config = {
  entry: './src/index.js',
  // target: 'node', // INIT-FIXME: set this for node environments, or leave out for web.
  externals: {
    lodash: true,
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  output: {
    libraryTarget: 'umd',
    filename: `dist/${package.name}${env === 'production' ? '.min' : ''}.js`,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production'){
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false
      },
      mangle: false,
    })
  )
}

module.exports = config
