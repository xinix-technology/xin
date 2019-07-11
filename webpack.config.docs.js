const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (_, { mode = 'development' }) {
  return {
    mode,
    context: path.join(__dirname, 'src/docs'),
    entry: {
      index: [
        // '@webcomponents/custom-elements',
        './index.js',
      ],
    },
    output: {
      path: path.join(__dirname, 'docs'),
      filename: `js/[name]${mode === 'production' ? '.min' : ''}.js`,
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
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: `css/[name]${mode === 'production' ? '.min' : ''}.css`,
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin(),
        // new UglifyJsPlugin({
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true,
        // }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  };
};
