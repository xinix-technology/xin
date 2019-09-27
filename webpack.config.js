const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

module.exports = function (env = {}, { mode = 'development' }) {
  return {
    mode,
    context: __dirname,
    entry: { xin: './index.js' },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name]${env.esm ? '.esm' : ''}${mode === 'production' ? '.min' : ''}.js`,
      library: 'xin',
      libraryTarget: env.esm ? 'var' : 'umd2',
    },
    // devtool: 'cheap-source-map',
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
