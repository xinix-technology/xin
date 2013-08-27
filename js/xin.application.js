(function() {

    "use strict";

    window.xin = window.xin || {};

    var Application = function() {
        this.initialize.apply(this, arguments);
    };

    _.extend(Application.prototype, Backbone.Events, {
        middlewares: [],
        initialize: function(options) {

            options = options || {};

            this.container = new xin.IoC();
            this.router = options.router || new xin.Router();
            this.router.app = this;

            this.directiveManager = new xin.DirectiveManager(this);

            this.$el = $(options.el);
            this.$el.addClass('xin-app').attr('data-role', 'app');

            this.providerRepository = new xin.ProviderRepository(this);

            xin.app = xin.app || this;
        },

        remove: function() {
            this.$el.removeClass('xin-app').removeAttr('data-role');
        },

        start: function() {
            var that = this;
            this.providerRepository.initialize().done(function() {
                if (typeof that.router.start === 'function') {
                    that.router.start();
                } else {
                    Backbone.history.start();
                }
            });
        },

        set: function() {
            this.container.set.apply(this.container, arguments);
        },

        get: function() {
            return this.container.get.apply(this.container, arguments);
        },

        resolve: function() {
            return this.container.resolve.apply(this.container, arguments);
        },

        use: function(middleware) {
            this.router.use(middleware);
        }
    });

    window.xin.Application = Application;

})();