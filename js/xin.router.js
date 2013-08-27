(function() {
    "use strict";

    window.xin = window.xin || {};

    var Router = function() {
        this.middlewares = [];
        Backbone.Router.apply(this, arguments);
    };

    _.extend(Router.prototype, Backbone.Router.prototype, {
        start: function() {
            Backbone.history.handlers.push({
                route: /^(.*?)$/,
                callback: _.bind((this.options && this.options.routeMissing) || this.routeMissing, this)
            });

            Backbone.history.start();
        },

        routeMissing: function(uri) {
            console.error('Missing route for URI: "' + uri + '"');
        },

        show: function(view) {
            if (view) {
                if (typeof view.show == 'function') {
                    view.show();
                } else {
                    view.$el.addClass('hz-show');
                }
            }
        },

        route: function(route) {
            var callback,
                callbacks = [],
                router = this;

            if (arguments.length > 1) {
                for(var i = 1; i < arguments.length; i++) {
                    callbacks.push(callback = arguments[i]);
                }
            }

            Backbone.Router.prototype.route.call(this, route, function() {
                var args = arguments;

                router.runMiddleware.call(router, callback.options || {}).done(function() {
                    callback.apply(router, args);
                });
            });
        },

        use: function(middleware) {
            middleware.app = this.app;
            this.middlewares.push(middleware);
        },

        runMiddleware: function(options) {
            var app = this.app,
                promise = null;

            _.each(this.middlewares, function(middleware) {
                if (!promise) {
                    promise = middleware.call(options);
                } else {
                    promise = promise.then(function() {
                        return middleware.call(options);
                    });
                }
            });

            if (!promise) {
                promise = $.Deferred().resolve().promise();
            }

            return promise;
        }
    });

    xin.Router = Router;
})();