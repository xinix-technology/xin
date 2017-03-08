const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = function (env = {}) {
  let { port = 8080, minify = false } = env;
  console.error('env=', env);

  return {
    entry: getEntries(),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `[name]${minify ? '.min' : ''}.js`,
    },
    devtool: 'source-map',
    plugins: getPlugins(env),
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
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: port,
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

function getPlugins ({ minify = false } = {}) {
  let plugins = [];

  if (minify) {
    plugins.push(
      new BabiliPlugin()
    );
  }

  return plugins;
}

// FIXME please add component tests
function getEntries () {
  const entries = {
    'xin': './index.js',

    'test/xin.test': './test/xin.test.js',

    'examples/binding': './examples/binding.js',
  };

  return entries;
}
