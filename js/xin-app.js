(function(root) {
  'use strict';

  var xin = root.xin;

  xin.createComponent({
    is: 'xin-app',

    behaviors: ['xin.AppBehavior'],
  });
})(this);
