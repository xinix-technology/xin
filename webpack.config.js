const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (_, { mode = 'development' }) {
  return {
    mode,
    context: __dirname,
    entry: { xin: './index.js' },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name]${mode === 'production' ? '.min' : ''}.js`,
      library: 'xin',
      libraryTarget: 'umd',
    },
    // devtool: 'cheap-source-map',
    optimization: {
      minimizer: [
        new TerserPlugin(),
      ],
    },
  };
};
