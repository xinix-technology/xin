const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (_, { mode = 'development' }) {
  return {
    mode,
    context: path.join(__dirname, 'src/docs'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'docs'),
      filename: 'lib/[name].js',
    },
    // devtool: 'sourcemap',
    resolve: {
      alias: {
        '@xinix/xin': __dirname,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'html-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
    ],
  };
};
