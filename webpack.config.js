const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const ENV = process.env.NODE_ENV || 'development';
const ANALYZE = process.env.ANALYZE || false;

console.info(`
  ENV     ${ENV}
  ANALYZE ${ANALYZE}
`);

function getEntry () {
  let entry = {
    'xin': [ './src/index.js' ],
  };

  let result = fs.readdirSync('./components').reduce((result, file) => {
    if (path.extname(file) === '.js') {
      result[`components/${path.basename(file, '.js')}`] = `./components/${file}`;
    }
    return result;
  }, entry);

  return result;
}

function getPlugins () {
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin('xin', ENV === 'production' ? 'xin.min.js' : 'xin.js'),
  ];

  if (ENV === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.optimize.DedupePlugin()
    );
  }

  return plugins;
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: ENV === 'production' ? '[name].min.js' : '[name].js',
  },
  devtool: 'source-map',
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css',
      },
      {
        test: /\.js$/,
        include: /(src|components|node_modules\/template-binding)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
};
