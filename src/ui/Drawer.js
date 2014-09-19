;(function(xin) {
    "use strict";

    var Drawer = xin.ui.Outlet.extend({

        initialize: function(options)  {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.$el.addClass('xin-drawer'); //.css('-webkit-transform', 'translateX(-100%)');
            this.$el.on('click', 'a', _.bind(this.clicked, this));
            $(document).on('mouseup', _.bind(this.mouseUp, this));
        },

        show: function() {

            if(this.$el.css('-webkit-transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
                var $siblings = this.$el.siblings();
                $siblings.css('-webkit-transition', 'all .3s');
                $siblings.css('-webkit-transform', 'translateX(256px)');
                this.$el.css('-webkit-transform', '');
            } else {
                this.hide();
            }

        },

        hide: function() {
            var $siblings = this.$el.siblings();
            $siblings.css('-webkit-transition', 'all .3s');
            $siblings.css('-webkit-transform', 'translateX(0)');
            this.$el.css('-webkit-transform', 'translate3D(-20%,0,0)');
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
