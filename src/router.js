/**
 * XIN SPA Framework
 *
 * MIT LICENSE
 *
 * Copyright (c) 2014 PT Sagara Xinix Solusitama
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @author      Ganesha <reekoheek@gmail.com>
 * @copyright   2014 PT Sagara Xinix Solusitama
 * @link        http://xinix.co.id/products/xin
 * @license     https://raw.github.com/reekoheek/xin/master/LICENSE
 * @package     xin
 *
 */

;(function(xin) {
    "use strict";

    /**
     * Default router class that extend Backbone.Router
     */
    var Router = function() {
        this.middlewares = [];
        Backbone.Router.apply(this, arguments);
    };

    _.extend(Router.prototype, Backbone.Router.prototype, {

        /**
         * Start router
         */
        start: function() {
            this.setDefaultRoute();

            Backbone.history.start();
        },

        setDefaultRoute: function() {
            Backbone.history.handlers.push({
                route: /^(.*?)$/,
                callback: _.bind((this.options && this.options.routeMissing) || this.routeMissing, this)
            });
        },

        registerView: function(uri, $el) {
            this.viewRoutes[uri] = $el;
            if (!this.viewDefaultRoute || $el.data('uri-default')) {
                this.viewDefaultRoute = uri;
            }
        },

        /**
         * Callback handler on route missing
         *
         * @param  String uri URI that missing
         */
        routeMissing: function(uri) {
            var that = this,
                args = arguments;


            // TODO reekoheek: why do we need this to be deferred?
            // _.defer(function() { });
            var $handler = that.viewRoutes[uri];
            if (!$handler && uri == '_') {
                $handler = xin.$('.xin-app .xin-view');
                that.viewDefaultRoute = '_';
                $handler.attr('data-uri', '_');
                this.registerView('_', $handler);
            }
            if (uri === '') {
                if (!that.viewDefaultRoute) {
                    $handler = xin.$('.xin-app .xin-view');
                    that.viewDefaultRoute = '_';
                    $handler.attr('data-uri', '_');
                    this.registerView('_', $handler);
                }
                location.hash = that.viewDefaultRoute;
            } else if ($handler) {
                xin.ui.show($handler.data('instance'));
            } else {
                xin.$.get(uri).done(function(data) {
                    data = data.trim();
                    if (data.indexOf('<body') >= 0) {
                        data = data.substr(data.indexOf('<body') + 1);
                        data = '<div>' + data.substr(data.indexOf('>') + 1) + '</div>';
                    } else if (data.indexOf('<BODY') >= 0) {
                        data = data.substr(data.indexOf('<BODY') + 1);
                        data = '<div>' + data.substr(data.indexOf('>') + 1) + '</div>';
                    } else {
                        data = '<div>' + data + '</div>';
                    }
                    var $data = xin.$(data);

                    if ($data.find('[data-role]').length > 0) {
                        $data = $data.find('[data-role]');
                    } else if ($data.find('body').length > 0) {
                        $data = $data.find('body');
                    }
                    data = $data.html() || '';
                    var $newView = xin.$('<div data-role="view" data-uri="' + uri + '">' + data + '</div>');
                    that.mainViewport.append($newView);
                    xin.when(that.app.directiveManager.scan()).done(function() {
                        that.routeMissing(uri);
                    });
                }).fail(function() {
                    console.error('Missing route for URI: "' + uri + '"');
                });
            }
        },

        /**
         * Show the view
         *
         * @param  Backbone.View view View to show
         */
        show: function(view) {
            if (view) {
                if (typeof view.show == 'function') {
                    view.show();
                } else {
                    view.$el.addClass('hz-show');
                }
            }
        },

        /**
         * Add route to router
         *
         * @param  Object route Route object
         */
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

        /**
         * Add middleware to use
         *
         * @param  Object middleware Middleware to use
         */
        use: function(middleware) {
            middleware.app = this.app;
            this.middlewares.push(middleware);
        },

        /**
         * Run middleware before routing to specific route
         *
         * @param  Object options
         * @return Promise
         */
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
                promise = xin.Deferred().resolve().promise();
            }

            return promise;
        }
    });

    xin.set('xin.Router', Router);
})(window.xin);
