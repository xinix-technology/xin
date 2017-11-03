const path = require('path');
// const BabiliPlugin = require('babili-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function ({ mode = 'dist', target = 'latest', port = 8080, minify = false } = {}) {
  let env = { mode, port, minify };
  console.error('env=', env);

  return {
    context: getContext(env),
    entry: {
      'index': './index.js',
    },
    output: {
      path: getBasePath(env),
      filename: `[name]${minify ? '.min' : ''}.js`,
    },
    devtool: 'source-map',
    plugins: getPlugins(env),
    resolve: {
      alias: {
        '@xinix/xin': __dirname,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'html-loader',
        },
        {
          test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
          exclude: /icons/,
          use: getUrlLoader('./img/[name].[ext]'),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: getBabelLoader(env),
        },
      ],
    },
    devServer: {
      contentBase: getBasePath(env),
      compress: true,
      port: port,
      hot: false,
    },
  };
};

function getBabelLoader ({ mode }) {
  let plugins = [
    require.resolve('babel-plugin-syntax-dynamic-import'),
    // require.resolve('babel-plugin-transform-async-to-generator'),
    // [ require.resolve('babel-plugin-__coverage__'), { 'ignore': 'node_modules' } ],
  ];

  let presets = [
    // require.resolve('babel-preset-es2015'),
    // require.resolve('babel-preset-stage-3'),
  ];

  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      plugins,
      presets,
      cacheDirectory: true,
    },
  };
}

function getUrlLoader (name = '[name].[ext]') {
  return {
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: name,
    },
  };
}

function getPlugins ({ mode, minify }) {
  let plugins = [];

  if (mode === 'example') {
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }));
  }

  // if (minify) {
  //   plugins.push(
  //     new BabiliPlugin()
  //   );
  // }

  return plugins;
}

function getContext ({ mode }) {
  if (mode === 'example') {
    return path.join(__dirname, mode);
  }

  return __dirname;
}

function getBasePath ({ mode }) {
  return path.join(__dirname, 'dist', mode);
}
