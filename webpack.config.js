const path = require('path');
const glob = require('glob');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = function ({ mode = 'dist', target = 'latest', port = 8080, minify = false } = {}) {
  let env = { mode, port, minify };
  console.error('env=', env);

  return {
    entry: getEntries(env),
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
          exclude: /node_modules/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.css$/,
          include: /node_modules\/prismjs/,
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
        {
          test: /\.js$/,
          include: /node_modules\/template-binding/,
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
    require.resolve('babel-plugin-transform-async-to-generator'),
    // [ require.resolve('babel-plugin-__coverage__'), { 'ignore': 'node_modules' } ],
    // require.resolve('babel-plugin-syntax-dynamic-import'),
  ];

  if (mode !== 'docs') {
    plugins.push(require.resolve('babel-plugin-istanbul'));
  }

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

  // if (mode === 'docs') {
  //   plugins.push(function () {
  //     this.plugin('emit', (x, callback) => {
  //       let files = glob.sync('./_docs/pages/**/*.md');
  //       files.forEach(file => {
  //         fs.copySync(file, path.join(__dirname, 'docs', file.split('_docs/')[1]));
  //       });
  //       callback();
  //     });
  //   });
  // }

  if (minify) {
    plugins.push(
      new BabiliPlugin()
    );
  }

  return plugins;
}

function getBasePath ({ mode }) {
  if (mode === 'docs') {
    return path.join(__dirname, 'docs');
  }

  return path.join(__dirname, 'dist');
}

function getEntries ({ mode }) {
  const entries = {};

  switch (mode) {
    case 'docs':
      glob.sync('./_docs/*.js').forEach(file => (entries[file.match(/\/_docs\/(.*).js$/)[1]] = file));
      glob.sync('./_docs/demo/**/*.js').forEach(file => (entries[file.match(/\/_docs\/(.*).js$/)[1]] = file));
      break;
    case 'test':
      glob.sync('./test/**/*-test.js').forEach(file => (entries[file.match(/\/(test\/.*).js$/)[1]] = file));
      break;
    default:
      entries['xin'] = './index.js';
  }

  return entries;
}
