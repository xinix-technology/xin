(function() {
  'use strict';
  if (!HTMLTemplateElement.decorate) {
    return;
  }

  console.log('fix webcomponents-lite template polyfill');

  var original = document.importNode;
  document.importNode = function(node, deep) {
    if (node instanceof DocumentFragment) {
      var populatedTemplates = node.querySelectorAll('template');

      var n = original.apply(this, arguments);
      Array.prototype.forEach.call(n.querySelectorAll('template'), function(t, index) {
        t.content = document.importNode(populatedTemplates[index].content, deep);
      });
      return n;
    } else {
      return original.apply(this, arguments);
    }
  };
})();
