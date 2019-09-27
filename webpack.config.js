const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

module.exports = function (env = {}, { mode = 'development' }) {
  return {
    mode,
    context: path.join(__dirname),
    entry: {
      xin: './index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name]${env.esm ? '.esm' : ''}${mode === 'production' ? '.min' : ''}.js`,
      library: 'xin',
      libraryTarget: env.esm ? 'var' : 'umd',
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
      minimizer: (() => {
        const plugins = [
          new TerserPlugin(),
        ];

        if (env.esm) {
          plugins.push(new EsmWebpackPlugin());
        }

        return plugins;
      })(),
    },
  };
};
