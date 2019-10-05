const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');

const DEFAULT_CONFIG = {
  mode: 'production',
  context: __dirname,
  entry: { xin: './index.js' },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'xin',
    libraryTarget: 'umd',
  },
  plugins: [],
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  },
};

if (process.env.NODE_ENV === 'analyze') {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  module.exports = {
    ...DEFAULT_CONFIG,
    name: 'analyze',
    mode: 'development',
    plugins: [
      ...DEFAULT_CONFIG.plugins,
      new BundleAnalyzerPlugin(),
    ],
  };

  return;
}

module.exports = [
  {
    ...DEFAULT_CONFIG,
    name: 'dev-umd',
    mode: 'development',
    devtool: 'source-map',
  },
  {
    ...DEFAULT_CONFIG,
    name: 'prod-umd',
    mode: 'production',
    output: {
      ...DEFAULT_CONFIG.output,
      filename: '[name].min.js',
    },
  },
  {
    ...DEFAULT_CONFIG,
    name: 'dev-esm',
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...DEFAULT_CONFIG.output,
      filename: '[name].esm.js',
      libraryTarget: 'var',
    },
    plugins: [
      ...DEFAULT_CONFIG.plugins,
      new EsmWebpackPlugin(),
    ],
  },
  {
    ...DEFAULT_CONFIG,
    name: 'prod-esm',
    mode: 'production',
    output: {
      ...DEFAULT_CONFIG.output,
      filename: '[name].esm.min.js',
      libraryTarget: 'var',
    },
    plugins: [
      ...DEFAULT_CONFIG.plugins,
      new EsmWebpackPlugin(),
    ],
  },
];
