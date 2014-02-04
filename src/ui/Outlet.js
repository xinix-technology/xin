;(function(xin) {
    "use strict";

    var Outlet = Backbone.View.extend({
        initialize: function(options) {
            var app = options.app;

            this.template = options.template || null;

            if (options.layout) {
                xin.ui.Layout.get(app, options.layout).apply(this.$el);
            }
        },

        render: function() {
            if (this.template) {
                this.$el.html(this.template(this));
            }
            return this;
        },
    });

    xin.set('xin.ui.Outlet', Outlet);

})(window.xin);