;(function(xin) {
    "use strict";

    var ViewFactory = function(options) {
        var $el = xin.$(options.el);
        delete options.el;

        if (!options.template) {
            var content = $el.html().replace(/&lt;%/g, '<%').replace(/%&gt;/g, '%>');
            options.template = _.template(content);
        }

        if (!options.view) {
            this.View = Outlet;
        } else {
            this.View = options.app.get(options.view);
        }

        this.options = options;

        this.attrs = {};
        var attrs = $el[0].attributes;
        for(var i = 0; i < attrs.length; i++) {
            this.attrs[attrs[i].nodeName] = attrs[i].nodeValue;
        }

        this.$roleParent = $el.parents('.xin-role').eq(0);
        this.$parent = $el.parent();
        $el.remove();

        this.initialize.apply(this, arguments);
    };

    _.extend(ViewFactory.prototype, {

        initialize: function(options) {},

        newInstance: function(options) {
            options = _.defaults(options || {}, this.options);

            var view = new this.View(options);

            view.$el.data('instance', view);

            _.each(this.attrs, function(value, name) {
                view.$el.attr(name, value);
            });

            if (options.model) {
                view.$el.attr('data-cid', options.model.cid);
            }

            view.render();
            return view;
        }

    });

    ViewFactory.extend = Backbone.View.extend;

    xin.set('xin.ui.ViewFactory', ViewFactory);
})(window.xin);