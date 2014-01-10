;(function(xin) {
    "use strict";

    var Outlet = Backbone.View.extend({
        initialize: function(options) {
            this.options = options;
            this.template = options.template || null;
        },

        render: function() {
            if (this.template) {
                this.$el.html(this.template(this));
            }
            return this;
        },
    });

    xin.set('xin.ui.Outlet', Outlet);

    _.extend(xin.ui, {
        show: function(view) {
            _.defer(function() {
                if (view.parent && view.parent.showChild) {
                    view.parent.showChild(view).done(function() {
                        view.$el[0].scrollTop = 0;
                        view.$el.addClass('xin-show');
                    });
                } else {
                   view.$el.addClass('xin-show');
                }
            });
        }
    });
})(window.xin);