const path = require('path');

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
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ],
        },
      ],
    },
  };
};
