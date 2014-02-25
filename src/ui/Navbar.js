;(function(xin) {
    "use strict";

    var Navbar = xin.ui.Outlet.extend({
        initialize: function() {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.$el.addClass('xin-navbar');
        }
    });

    xin.set('xin.ui.Navbar', Navbar);
})(window.xin);