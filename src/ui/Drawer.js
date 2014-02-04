;(function(xin) {
    "use strict";

    var Drawer = xin.ui.Outlet.extend({

        initialize: function(options)  {
            if (options.layout) {
                xin.ui.Layout.get(app, options.layout).apply(this.$el);
            }

            // this.$el.html('<div class="xin-drawer-placeholder">' + this.$el.html() + '</div>');
            this.$el.addClass('xin-drawer').css('-webkit-transform', 'translateX(-100%)');
            this.$el.on('click', 'a', _.bind(this.clicked, this));
        },

        show: function() {
            this.$el.css('-webkit-transform', '');
        },

        hide: function() {
            this.$el.css('-webkit-transform', 'translateX(-100%)');
        },

        clicked: function() {
            // console.log('xxx');
            this.hide();
        }
    });

    xin.set('xin.ui.Drawer', Drawer);
})(window.xin);