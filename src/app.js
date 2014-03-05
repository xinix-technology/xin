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

(function(xin, _, Backbone) {
    "use strict";

    /**
     * xin.App
     *
     * Default application context for xin application
     *
     */
    var App = function() {
        this.initialize.apply(this, arguments);
    };

    _.extend(App.prototype, Backbone.Events, {

        /**
         * Initialize the application context
         * @param  Object options Options parameter to initialize application context
         */
        initialize: function(options) {
            var that = this;

            this.options = options = options || {};

            this.container = new xin.IoC();
            this.container.app = this;
            this.router = options.router || new xin.Router();
            this.router.app = this;

            if (options.middlewares) {
                _.each(options.middlewares, function(middleware) {
                    that.use(middleware);
                });
            }

            this.directiveManager = new xin.DirectiveManager(this);
            if (options.directives) {
                xin.$.each(options.directives, function(key, directive) {
                    that.directiveManager.put(key, directive);
                });
            }

            this.$el = xin.$(options.el);
            this.$el.addClass('xin-app').attr('data-role', 'app');

            this.providerRepository = new xin.ProviderRepository(this);

            xin.app = xin.app || this;
        },

        /**
         * Remove the application context
         */
        remove: function() {
            this.$el.removeClass('xin-app').removeAttr('data-role');
        },

        /**
         * Start the application context
         */
        start: function() {
            var that = this,
                deferred = xin.Deferred();

            this.baseURL = location.href.split('#')[0];

            this.catchAllHref();

            xin.when(this.providerRepository.initialize()).
                then(function() {
                    return that.directiveManager.scan();
                }).
                done(function() {
                    // xin.$('body').show();
                    if (typeof that.router.start === 'function') {
                        that.router.start();
                    } else {
                        Backbone.history.start();
                    }

                    deferred.resolve();
                });

            return deferred.promise();
        },

        catchAllHref: function() {
            var that = this;
            this.$el.on('click', 'a', function(evt) {
                var $form = xin.$(this);

                if ($form.data('rel') === 'external') {
                    return;
                }

                var href = $form.attr('href');

                if (href[0] === '#') {
                    return;
                } else if (href[0] === '/') {
                    href = location.origin + href;
                }
                evt.preventDefault();

                href = that.simplifyURL(href);

                var hash = (href.split('#')[0] === location.href.split('#')[0]) ? '#_' : '#' + href;

                location.hash = hash;
            });

            this.$el.on('submit', 'form', function(evt) {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                var $form = xin.$(this),
                    onSubmit = $form.data('submit');

                if ($form.data('rel') === 'external') {
                    return;
                }

                if (onSubmit) {
                    onSubmit = that.get(onSubmit);
                }

                evt.preventDefault();
                xin.$.ajax({
                    url: $form.attr('action'),
                    method: $form.attr('method'),
                    data: $form.serialize(),
                }).done(function(data, info, xhr) {
                    if (onSubmit) onSubmit(null, data, xhr);
                    Backbone.trigger('form-success', $form, data, info, xhr);
                }).fail(function(xhr, err, message) {
                    if (onSubmit) onSubmit(err, message, xhr);
                    Backbone.trigger('form-error', $form, xhr, err, message);
                });
            });
        },

        simplifyURL: function(url) {
            if (url.indexOf(this.baseURL) === 0) {
                url = url.substr(this.baseURL.length);
            }
            return url;
        },

        siteURL: function(uri) {
            if (uri[0] === '/') {
                uri = uri.substr(1);
            }
            return this.baseURL + uri;
        },

        /**
         * Set data into IoC inside the application context
         */
        set: function() {
            this.container.set.apply(this.container, arguments);
        },

        /**
         * Get plain (as-is) data from Ioc inside the application context
         * @return mixed Found data
         */
        get: function() {
            return this.container.get.apply(this.container, arguments);
        },

        /**
         * Resolve data from IoC inside the application context
         *
         * The difference between get and resolve is resolve will try to resolve
         * the true entity to get instead of returning the plain (as-is) data.
         *
         * @return Promise Promise to get resolved data
         */
        resolve: function() {
            return this.container.resolve.apply(this.container, arguments);
        },

        use: function(middleware) {
            if (typeof(middleware) === 'string') {
                middleware = this.get(middleware);
            }

            if (typeof(middleware) === 'function') {
                var Middleware = middleware;
                middleware = new Middleware();
            }

            if (!middleware) {
                throw new Error('Middleware not found or instantiated!');
            }

            this.router.use(middleware);
        }
    });

    xin.set('xin.App', App);

})(window.xin, window._, window.Backbone);
