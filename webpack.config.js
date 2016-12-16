const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const UglifyJsPlugin = require('./dev/webpack/UglifyJsPlugin');

module.exports = (env) => {
  env = env || 'development';

  console.error(`env=${env}`);

  return {
    entry: (() => {
      let entry = {
        'xin': './index.js',
      };

      let result = fs.readdirSync('./components').reduce((result, file) => {
        if (path.extname(file) === '.js') {
          result[`components/${path.basename(file, '.js')}`] = `./components/${file}`;
        }
        return result;
      }, entry);

      return result;
    })(),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: env === 'production' ? '[name].min.js' : '[name].js',
    },
    devtool: 'source-map',
    plugins: (() => {
      let plugins = [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'xin',
          filename: env === 'production' ? 'xin.min.js' : 'xin.js',
        }),
      ];

      if (env === 'production') {
        plugins.push(
          new UglifyJsPlugin({ compress: { warnings: true } })
        );
      }

      return plugins;
    })(),
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
          exclude: /(node_modules|bower_components)/,
          loader: require.resolve('babel-loader'),
          query: {
            plugins: [
              require.resolve('babel-plugin-transform-async-to-generator'),
            ],
            // presets: ['es2015', 'stage-3'],
            cacheDirectory: true,
          },
        },
        {
          test: /\.js$/,
          include: /(node_modules\/template-binding)/,
          loader: require.resolve('babel-loader'),
          query: {
            plugins: [
              require.resolve('babel-plugin-transform-async-to-generator'),
            ],
            // presets: ['es2015', 'stage-3'],
            cacheDirectory: true,
          },
        },
      ],
    },
  };
};
