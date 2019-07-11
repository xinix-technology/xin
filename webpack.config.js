const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (_, { mode = 'development' }) {
  return {
    mode,
    context: path.join(__dirname, 'src'),
    entry: {
      xin: './xin.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name]${mode === 'production' ? '.min' : ''}.js`,
    },
    // devtool: 'sourcemap',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name]${mode === 'production' ? '.min' : ''}.css`,
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin(),
        // new UglifyJsPlugin({
        //   cache: true,
        //   parallel: true,
        //   sourceMap: true, // set to true if you want JS source maps
        // }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  };
};
