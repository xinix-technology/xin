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
  // registerHooks: function(wct) {
  //   wct.hook('prepare', function(done) {
  //     // var proxy = require('express-http-proxy');
  //     // app.use('/api',
  //     //   proxy('pas.dev', {
  //     //     forwardPath: function(req, res) {
  //     //       return require('url').parse(req.url).path;
  //     //     }
  //     //   })
  //     // );
  //     done();
  //   });
  // },
};
