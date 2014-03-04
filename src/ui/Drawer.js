;(function(xin) {
    "use strict";

    var Drawer = xin.ui.Outlet.extend({

        initialize: function(options)  {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.$el.addClass('xin-drawer').css('-webkit-transform', 'translateX(-100%)');
            this.$el.on('click', 'a', _.bind(this.clicked, this));
            $(document).on('mouseup', _.bind(this.mouseUp, this));
        },

        show: function() {
            this.$el.css('-webkit-transform', '');
        },

        hide: function() {
            this.$el.css('-webkit-transform', 'translateX(-100%)');
        },

        mouseUp: function(e) {
            var container = $('[data-layout=drawer]');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                this.hide();
            }
        },

        clicked: function() {
            // console.log('xxx');
            this.hide();
        }
    });

    xin.set('xin.ui.Drawer', Drawer);
})(window.xin);
