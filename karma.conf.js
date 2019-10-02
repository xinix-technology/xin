// Karma configuration
// Generated on Wed Apr 04 2018 09:55:19 GMT+0700 (WIB)
const path = require('path');

// process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) { // eslint-disable-line max-lines-per-function
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      config.grep ? config.grep : 'test/**/*.test.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: (() => {
      const result = {};
      result[config.grep ? config.grep : 'test/**/*.test.js'] = ['webpack'];
      return result;
    })(),

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
    // browsers: [ 'Safari', 'FirefoxDeveloper', 'ChromeHeadless', 'ChromeCanary' ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 3, // Infinity,

    coverageReporter: {
      dir: 'coverage/',
      includeAllSources: true,
      reporters: [
        { type: 'html' },
        // { type: 'text' },
        // { type: 'text-summary' },
      ],
    },

    webpack: {
      // webpack configuration
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true },
            },
            exclude: /node_modules|\.test\.js|test\/init.js$/,
          },
        ],
      },
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
      require('karma-safari-launcher'),
      require('karma-firefox-launcher'),
      require('karma-spec-reporter'),
    ],

    customLaunchers: {
      ChromeDebugging: {
        base: 'ChromeCanary',
        flags: [
          '--remote-debugging-port=9333',
          '--auto-open-devtools-for-tabs',
          '--user-data-dir=' + path.resolve(__dirname, './.chrome'),
        ],
      },
    },
  });
};
