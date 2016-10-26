const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

console.info('ENV', process.env.NODE_ENV);

function getEntry () {
  let entry = {
    'xin': ['./src/index.js'],
  };

  let result = fs.readdirSync('./components').reduce((result, file) => {
    if (path.extname(file) === '.js') {
      result['components/' + path.basename(file, '.js')] = './components/' + file;
    }
    return result;
  }, entry);

  return result;
}

function getPlugins () {
  let plugins = [];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
  }

  plugins.push(new webpack.optimize.CommonsChunkPlugin(
    'xin',
    process.env.NODE_ENV === 'production' ? 'xin.min.js' : 'xin.js'
  ));

  return plugins;
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
  },
  devtool: 'source-map',
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['babel-preset-es2015', 'babel-preset-es2016', 'babel-preset-es2017', 'babel-preset-stage-0'].map(require.resolve),
        },
      },
    ],
  },
};
