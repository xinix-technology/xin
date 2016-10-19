module.exports = {
  // "verbose": true,
  'suites': ['test/runner.html'],
  'plugins': {
    'local': {
      'browsers': ['chrome'],
    },
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '**/*.js',
      ],
      exclude: [
        'bower_components/**/*.js',
      ],
    },
  },
};
