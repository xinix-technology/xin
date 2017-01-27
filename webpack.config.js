module.exports = function ({ PORT = 8080 } = {}) {
  console.error('env=', { PORT });

  return {
    entry: getEntries(),
    output: {
      filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.test.js$/,
          exclude: /node_modules/,
          use: 'mocha-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: getBabelLoader(),
        },
        {
          test: /\.js$/,
          include: /node_modules\/template-binding/,
          use: getBabelLoader(),
        },
      ],
    },
    devServer: {
      // historyApiFallback: false,
      // inline: false,
      // hot: false,
      // host: '0.0.0.0',
      port: PORT,
    },
  };
};

function getBabelLoader () {
  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      // plugins: [
      //   'babel-plugin-syntax-dynamic-import',
      //   'babel-plugin-transform-async-to-generator',
      // ],
      // presets: [
      //   'babel-preset-es2015',
      //   'babel-preset-stage-3',
      // ],
      cacheDirectory: true,
    },
  };
}

// FIXME please add component tests
function getEntries () {
  const entries = {
    'dist/test/xin.test': './test/xin.test.js',

    'dist/examples/binding': './examples/binding.js',
  };

  return entries;
}
