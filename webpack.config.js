module.exports = function (_, { mode = 'production' }) {
  return {
    mode,
    entry: {
      xin: './dist-src/xin.js',
    },
    output: {
      filename: `./[name]${mode === 'production' ? '.min' : ''}.js`,
    },
    devtool: 'sourcemap',
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
