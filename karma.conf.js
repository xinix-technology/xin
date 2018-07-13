// Karma configuration
// Generated on Wed Apr 04 2018 09:55:19 GMT+0700 (WIB)

const path = require('path');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'test/**/*.test.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.test.js': ['webpack'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeCanary'],
    // browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        // { type: 'text' },
        // { type: 'text-summary' },
      ],
    },

    webpack: {
      // webpack configuration
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true },
            },
            exclude: /node_modules|\.test\.js$/,
          },
          {
            test: /\.s?css$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ],
          },
          {
            test: /\.html$/,
            use: [ 'html-loader' ],
          },
        ],
      },
      resolve: {
        alias: {
          '@xinix/xin': path.resolve('./'),
        },
      },
      // module: {
      //   loaders: [
      //     {test: /\.css$/, loader: 'style!css'},
      //     {test: /\.less$/, loader: 'style!css!less'},
      //   ],
      //   postLoaders: [{
      //     test: /\.js/,
      //     exclude: /(test|node_modules|bower_components)/,
      //     loader: 'istanbul-instrumenter',
      //   }],
      // },
      // resolve: {
      //   modulesDirectories: [
      //     '',
      //     'src',
      //     'node_modules',
      //   ],
      // },
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true,
    },

    plugins: [
      require('karma-webpack'),
      require('istanbul-instrumenter-loader'),
      require('karma-mocha'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
    ],
  });
};
