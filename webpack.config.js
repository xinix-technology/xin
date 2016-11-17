const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const ENV = process.env.NODE_ENV || 'development';

console.error(`
  ENV     ${ENV}
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'xin',
      filename: ENV === 'production' ? 'xin.min.js' : 'xin.js',
    }),
  ];

  if (ENV === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
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
        loader: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
      {
        test: /\.js$/,
        include: /(src|components|node_modules\/template-binding)/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['es2015', 'stage-3'],
          cacheDirectory: true,
        },
      },
    ],
  },
};
