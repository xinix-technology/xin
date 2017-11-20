const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = function ({ mode = 'release', port = 8080, minify = false } = {}) {
  let env = { mode, port, minify };
  console.error('env=', env);

  return {
    context: getContext(env),
    entry: getEntry(env),
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
  ];

  let presets = [
    [
      require.resolve('babel-preset-env'), {
        'targets': {
          'browsers': ['>= 5%'],
        },
      },
    ],
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

  if (mode === 'release') {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      minChunks: Infinity,
    }));
  }

  if (minify) {
    plugins.push(
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      })
    );
  }

  return plugins;
}

function getContext ({ mode }) {
  return mode === 'release' ? __dirname : path.join(__dirname, mode);
}

function getEntry ({ mode }) {
  let entry = {
    'index': './index.js',
  };

  if (mode === 'release') {
    fs.readdirSync('./components').forEach(file => {
      let token = path.basename(file, '.js');
      if (token === 'index') {
        return;
      }

      entry[`components/${token}`] = `./components/${token}`;
    });

    fs.readdirSync('./middlewares').forEach(file => {
      let token = path.basename(file, '.js');
      if (token === 'index') {
        return;
      }

      entry[`middlewares/${token}`] = `./middlewares/${token}`;
    });
  }

  return entry;
}

function getBasePath ({ mode }) {
  return path.join(__dirname, 'dist', mode);
}
