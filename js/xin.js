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

window.xin = (function() {
    "use strict";

    /**
     * xin global namespace
     * @type Object
     */
    var xin = {

        /**
         * Set object to xin namespace
         * @param String    ns         Namespace
         * @param mixed     object     Object to set to namespace
         *
         */
        set: function(ns, object) {
            var tokens,
                lastToken,
                nsObject = this;

            if (ns.substr(0, 4) !== 'xin.') {
                throw new Error('Namespace not accepted, should be prefixed with "xin."');
            }
            tokens = ns.substr(4).split('.');
            lastToken = tokens[tokens.length - 1];

            for(var i in tokens) {
                var token = tokens[i];

                if (token === lastToken) {
                    nsObject[token] = object;
                } else {
                    nsObject[token] = nsObject[token] || {};
                }

                nsObject = nsObject[token];
            }
        }

    };

    // If application using Zepto (you can also use jQuery to substitute Zepto)
    if (window.jQuery) {
        xin.when = jQuery.when;
        xin.Deferred = jQuery.Deferred;
        // TODO reekoheek: please copy references of Deferred<fn|con>,
        // when<fn>, etc to xin namespace object.
        xin.$ = jQuery;
    } else if (window.Zepto) {
        Deferred.installInto(xin);
        if (!Zepto.Deferred) {
            Deferred.installInto(Zepto);
        }
        xin.$ = Zepto;
    }

    // Add reference Zepto.fn.detach with Zepto.fn.remove
    if (window.Zepto) {
        xin.$.fn.detach = xin.$.fn.remove;
    }

    /**
     * Function to serializing form as object
     * @return object Object serialization of form
     */
    xin.$.fn.serializeObject = function() {
        var form = {};
        _.each(xin.$(this).serializeArray(), function(value) {
            form[value.name] = value.value;
        });
        return form;
    };

    return xin;

})();/**
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

    var page = document.body,
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
        // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        moz = 'mozRequestAnimationFrame' in window,
        webkit = 'webkitRequestAnimationFrame' in window,
        lastWidth = 0;

    /**
     * xin.detect
     *
     */
    xin.set('xin.detect', {
        ua: ua,
        iphone: iphone,
        ipad: ipad,
        ios: ios,
        fullscreen: fullscreen,
        android: android,
        moz: moz,
        webkit: webkit
    });

    var oldCss = xin.$.fn.css;
    xin.$.fn.css = function(key, val) {
        if (typeof(key) == 'string') {
            switch(key) {
                case 'transform':
                case 'transition':
                    if (xin.detect.moz) {
                        oldCss.call(this, '-moz-' + key, val);
                    }
                    if (xin.detect.webkit) {
                        oldCss.call(this, '-webkit-' + key, val);
                    }
                    break;
            }
        }
        return oldCss.apply(this, arguments);
    };

    // TODO reekoheek: move below lines to global or application init as single
    // function
    if (android) {
        // Android's browser adds the scroll position to the innerHeight, just to
        // make this really fucking difficult. Thus, once we are scrolled, the
        // page height value needs to be corrected in case the page is loaded
        // when already scrolled down. The pageYOffset is of no use, since it always
        // returns 0 while the address bar is displayed.
        window.onscroll = function() {
            page.style.height = window.innerHeight + 'px';
        };
    }


    var setupScroll = window.onload = function() {
    // Start out by adding the height of the location bar to the width, so that
    // we can scroll past it
    if (ios) {
        // iOS reliably returns the innerWindow size for documentElement.clientHeight
        // but window.innerHeight is sometimes the wrong value after rotating
        // the orientation
        var height = document.documentElement.clientHeight;
        // Only add extra padding to the height on iphone / ipod, since the ipad
        // browser doesn't scroll off the location bar.
        if (iphone && !fullscreen) height += 60;
            page.style.height = height + 'px';
        } else if (android) {
            // The stock Android browser has a location bar height of 56 pixels, but
            // this very likely could be broken in other Android browsers.
            page.style.height = (window.innerHeight + 56) + 'px';
        }
        // Scroll after a timeout, since iOS will scroll to the top of the page
        // after it fires the onload event
        setTimeout(scrollTo, 0, 0, 1);
    };
    window.onresize = function() {
        var pageWidth = page.offsetWidth;
        // Android doesn't support orientation change, so check for when the width
        // changes to figure out when the orientation changes
        if (lastWidth == pageWidth) return;
        lastWidth = pageWidth;
        setupScroll();
    };
    window.onresize();
})(window.xin);/**
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
            this.router = options.router || new xin.Router();
            this.router.app = this;

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
            var that = this;

            this.baseURL = location.href.split('#')[0];

            this.catchAllHref();

            xin.when(this.providerRepository.initialize()).
                then(function() {
                    return that.directiveManager.scan();
                }).
                done(function() {
                    xin.$('body').show();
                    if (typeof that.router.start === 'function') {
                        that.router.start();
                    } else {
                        Backbone.history.start();
                    }
                });
        },

        catchAllHref: function() {
            var that = this;
            this.$el.on('click', 'a', function(evt) {
                var href = xin.$(this).attr('href');
                if (href[0] === '#') {
                    return;
                } else if (href[0] === '/') {
                    href = location.origin + href;
                }
                evt.preventDefault();

                href = that.simplifyURL(href);

                location.hash = (href.split('#')[0] == location.href.split('#')[0]) ? '#_' : '#' + href;
            });

            this.$el.on('submit', 'form', function(evt) {
                evt.preventDefault();
                xin.$.ajax({
                    url: xin.$(this).attr('action'),
                    method: xin.$(this).attr('method'),
                    data: xin.$(this).serialize(),
                }).done(function(data, info, xhr) {
                    alert(info);
                }).fail(function(xhr, err, message) {
                    alert(message);
                });
            });
        },

        simplifyURL: function(url) {
            if (url.indexOf(this.baseURL) == 0) {
                url = url.substr(this.baseURL.length);
            }
            return url;
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
            this.router.use(middleware);
        }
    });

    xin.set('xin.App', App);

})(window.xin);/**
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

    var IoC = function() {
        this.initialize.apply(this, arguments);
    };

    _.extend(IoC.prototype, {
        context: {},
        fallbackContext: null,

        initialize: function(options) {
            options = options || {};
            this.fallbackContext = options.fallbackContext || window;

            this.aliases = {
                'app': 'xin.App',
                'view': 'xin.ui.Outlet',
                'layout': 'xin.ui.Layout',
                'header': 'xin.ui.Header',
                'pane': 'xin.ui.Pane',
                'list': 'xin.ui.List'
                // 'list-item': 'xin.ui.ListItem',
                // 'list-empty': 'xin.ui.ListEmpty'
            };
        },

        clear: function() {
            this.context = {};
            this.context.prototype = this.fallbackContext;
        },

        get: function(key) {
            var keys = key.split('.'),
                from = this.context,
                found;

            from = this.context;
            found = _.every(keys, function(k) {
                from = from[k] || undefined;
                return (from !== undefined);
            });

            if (found) return from;

            from = this.fallbackContext;
            found = _.every(keys, function(k) {
                from = from[k] || undefined;
                return (from !== undefined);
            });

            return (found) ? from : undefined;


        },

        set: function(key, value) {
            var keys = key.split('.'),
                to = this.context,
                index = 0;

            var found = _.each(keys, function(k) {
                index++;
                if (index == keys.length) {
                    to[k] = value;
                } else {
                    if (!to[k]) {
                        to[k] = {};
                    }
                    to = to[k];
                }
            });
        },

        createObject: function(Constructor) {
            var deferred = xin.Deferred(),
                object,
                args = [];
            for(var i in arguments) {
                args.push(arguments[i]);
            }
            args = args.slice(1);

            // TODO if there is any other technique that works cross browser
            // for construct new object based on dynamic length arguments
            switch (args.length) {
                case 0:
                    object = new Constructor();
                    break;
                case 1:
                    object = new Constructor(args[0]);
                    break;
                case 2:
                    object = new Constructor(args[0], args[1]);
                    break;
                case 3:
                    object = new Constructor(args[0], args[1], args[2]);
                    break;
                case 4:
                    object = new Constructor(args[0], args[1], args[2], args[3]);
                    break;
                case 5:
                    object = new Constructor(args[0], args[1], args[2], args[3], args[4]);
                    break;
            }

            deferred.resolve(object);
            return deferred.promise();
        },

        resolveAlias: function(key) {
            var found;
            do {
                found = false;
                if (this.aliases[key]) {
                    key = this.aliases[key];
                    found = true;
                }
            } while(found);
            return key;
        },

        resolve: function(key) {
            var index,
                resolver,
                type = '',
                deferred = xin.Deferred(),
                args = [],
                value;

            key = this.resolveAlias(key);

            if (!key) return deferred.reject(new Error('Key not found or cannot resolve!')).promise();

            for(var i in arguments) {
                args.push(arguments[i]);
            }


            if (typeof key == 'function') {

                // if type of key is function, we assume it as a Class constructor
                // so we will create object based on that Class constructor
                this.createObject.apply(this, args).then(deferred.resolve, deferred.reject);

            } else if (typeof key == 'string') {

                // if type of key is string, we parse it, is there any type of
                // resolver ?
                index = key.indexOf(':');
                if (index >= 0) {
                    type = key.substr(0, index);
                    key = key.substr(index + 1);
                }

                if (type) {
                    // if there is any type of resolver, try to resolve
                    try {
                        resolver = IoC.getResolver(type);
                        args[0] = key;
                        resolver.apply(this, args).then(deferred.resolve, deferred.reject);
                    } catch(e) {
                        deferred.resolve(key);
                    }
                } else {
                    // no type of resolver, then resolve the key as it is
                    value = this.get(key);

                    if (typeof value == 'function') {
                        var first = _.last(key.split('.'))[0];
                        if (first.toUpperCase() == first) {
                            args[0] = value;
                            this.createObject.apply(this, args).then(deferred.resolve, deferred.reject);
                        } else {
                            deferred.resolve(value.apply(undefined, args.slice(1)));
                        }
                    } else {
                        deferred.resolve(value);
                    }
                }

            } else {
                // return the object as is
                deferred.resolve(key);
            }

            return deferred.promise();
        }
    });

    _.extend(IoC, {
        resolvers: {

            xhr: function(key) {
                // key is in URL form
                return xin.$.get(key).then(null, function(xhr, state, message) {
                    return xin.Deferred().reject(new Error(message)).promise();
                }).promise();
            },

            template: function(key) {
                var $template = xin.$('script#' + key);
                if ($template.length > 0) {
                    return xin.Deferred().resolve(_.template($template.html())).promise();
                }

                var resolver = IoC.getResolver('xhr');

                return resolver(key).then(function(data) {
                    return xin.Deferred().resolve(_.template(data));
                }, null);
            },

            model: function(key) {
                return this.resolve(key);
            },

            collection: function(key) {
                var deferred = xin.Deferred();

                xin.when(this.resolve(key)).then(function(collection) {
                    if (!(collection instanceof Backbone.Collection)) {
                        collection = new Backbone.Collection(collection);
                    }
                    deferred.resolve(collection);
                });

                return deferred.promise();;
            }

        },

        addResolver: function(type, resolver) {
            this.resolvers[type] = resolver;
        },

        getResolver: function(type) {
            var resolver = this.resolvers[type];
            if (typeof resolver == 'function') {
                return resolver;
            } else if (typeof resolver == 'object' && typeof resolver.resolve == 'function') {
                return resolver.resolve;
            }
            throw new Error('IoC Resolver [' + type + '] not found!');
        }
    });

    xin.set('xin.IoC', IoC);

})(window.xin);/**
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
            uri = uri.trim();

            var that = this,
                args = arguments,
                newUri = this.app.simplifyURL(uri);

            if (uri !== newUri) {
                location.hash = newUri;
                return;
            }


            // TODO reekoheek: why do we need this to be deferred?
            // _.defer(function() { });
            var $handler = that.viewRoutes[uri],
                registerDefaultView = function() {
                    $handler = xin.$('.xin-pane > .xin-view');
                    that.viewDefaultRoute = '_';
                    $handler.attr('data-uri', '_');
                    that.registerView('_', $handler);
                };
            if (!$handler && uri == '_') {
                registerDefaultView();
            }
            if (uri === '') {
                if (!that.viewDefaultRoute) {
                    registerDefaultView();
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
                        var $role = $data.find('[data-role]');
                        $role = $role.filter(function() {
                            var K = that.app.get(that.app.container.resolveAlias(xin.$(this).data('role')));
                            return (K.prototype instanceof Backbone.View && !(K.prototype instanceof xin.ui.Container));
                        });
                        if ($role.length > 0) {
                            $data = $role;
                            $data.attr('data-uri', uri);
                        }
                    } else {
                        if ($data.find('body').length > 0) {
                            $data = $data.find('body');
                        }
                        data = $data.html() || '';
                        $data = xin.$('<div data-role="view" data-uri="' + uri + '">' + data + '</div>');
                    }

                    that.mainViewport.append($data);
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

    var DirectiveManager = function(app) {
        this.app = app;
        this.directives = {};
    };

    _.extend(DirectiveManager.prototype, {
        put: function(id, directive) {
            if (!directive) {
                throw new Error('Directive for "' + id + '" not found or invalid!');
            }
            if (typeof directive == 'function') {
                var Directive = directive;
                directive = new Directive(this.app);
            }
            this.directives[id] = directive;
        },

        scan: function($el) {
            var directiveManager = this,
                deferredRules = [],
                deferred = new xin.Deferred(),
                promise,
                onDone = function() {
                    deferredRules = [];
                    $el.children().each(function() {
                        var $el = xin.$(this);
                        deferredRules.push(directiveManager.scan($el));
                    });

                    xin.$.when.apply(null, deferredRules).done(function() {
                        deferred.resolve();
                    });

                },
                nexDirective = function(directive) {
                    return function(stop) {
                        if (stop) {
                            onDone();
                            return xin.Deferred().reject().promise();
                        } else {
                            return directive.run($el);
                        }
                    };
                };

            $el = $el || this.app.$el;

            _.each(this.directives, function(directive) {
                if (directive.matcher($el)) {
                    if (!promise) {
                        promise = directive.run($el);
                    } else {
                        promise = promise.then(nexDirective(directive));
                    }
                }
            });

            if (!promise) {
                promise = xin.Deferred().resolve().promise();
            }

            promise.done(onDone);
            return deferred.promise();
        }
    });

    xin.set('xin.DirectiveManager', DirectiveManager);





    /**
     * xin.directive.ListDirective
     */
    // var ListDirective = function(app) {
    //     this.app = app;
    // };

    // _.extend(ListDirective.prototype, {
    //     matcher: function($el) {
    //         return $el.data('role') && ($el.data('role').toLowerCase().substr(0, 5) === 'list-');
    //     },
    //     run: function($el) {
    //         var $list = $el.parents('[data-role=list]'),
    //             $parent = $el.parent(),
    //             listView = $list.data('instance'),
    //             type = $el.data('role').substr(5);

    //         if (!$list.data(type + '-template')) {
    //             // TODO replace this to the best way to get html string of domnode
    //             var tmpId = 't-' + new Date().getTime();
    //             $el.wrap('<div id="' + tmpId + '"></div>');
    //             var content = $el.parent().html();
    //             xin.$('#' + tmpId).remove();

    //             content = content.replace(/&lt;%/g, '<%').replace(/%&gt;/g, '%>');

    //             listView[type + 'Template'] = _.template(content);
    //             listView['$' + type + 'AttachPoint'] = $parent;
    //             $parent.attr('data-' + type + '-attach-point', true);

    //             listView.render();
    //         }
    //     }
    // });



})(window.xin);/**
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

    var ProviderRepository = function(app) {
        this.app = app;
        this.providers = [];
    };

    _.extend(ProviderRepository.prototype, {
        add: function(provider) {
            if (!provider) {
                throw new Error('Provider not found or invalid!');
            }
            if (typeof provider == 'function') {
                var Provider = provider;
                provider = new Provider();
            }
            this.providers.push(provider);
        },

        initialize: function() {
            var app = this.app,
                promise = null;

            _.each(this.providers, function(provider) {
                if (!promise) {
                    promise = provider.initialize(app);
                } else {
                    promise = promise.then(function() {
                        return provider.initialize(app);
                    });
                }
            });

            if (!promise) {
                promise = xin.Deferred().resolve().promise();
            }

            return promise;
        }
    });

    xin.set('xin.ProviderRepository', ProviderRepository);

})(window.xin);/**
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

    var SlideIn = function($el, to) {
        this.$el = $el;
        this.to = to;
        this.timeout = 0.3;
    };

    _.extend(SlideIn.prototype, {
        play: function() {
            var that = this,
                deferred = xin.Deferred();

            this.$el.on('transitionend', function() {
                that.$el.off('transitionend');
                that.$el.css('transition', '');
                that.$el.css('transform', '');
                deferred.resolve();
            });

            var from = '100%';
            if (this.to == 'right') {
                from = '-' + from;
            }

            this.$el.css('transform', 'translate3d(' + from + ', 0, 0)');
            this.$el.css('transition', 'all ' + that.timeout + 's');
            that.$el.addClass('xin-show');

            setTimeout(function() {
                that.$el.css('transform', 'translate3d(0, 0, 0)');
            }, xin.fx.defaultOptions.delay);

            return deferred.promise();
        }
    });

    var SlideOut = function($el, to) {
        this.$el = $el;
        this.to = to;
        this.timeout = 0.3;
    };

    _.extend(SlideOut.prototype, {
        play: function() {
            var that = this,
                deferred = xin.Deferred();

            this.$el.on('transitionend', function() {
                that.$el.off('transitionend');
                that.$el.removeClass('xin-show');
                that.$el.css('transition', '');
                that.$el.css('transform', '');
                deferred.resolve();
            });

            this.$el.css('transform', 'translate3d(0, 0, 0)');
            this.$el.css('transition', 'all ' + that.timeout + 's');

            setTimeout(function() {
                var to = '100%';
                if (that.to == 'left') {
                    to = '-' + to;
                }
                that.$el.css('transform', 'translate3d(' + to + ', 0, 0)');
            }, xin.fx.defaultOptions.delay);

            return deferred.promise();
        }
    });

    xin.set('xin.fx', {
        defaultOptions: {
            delay: 300,
        },
        SlideIn: SlideIn,
        SlideOut: SlideOut,
    });

})(window.xin);/**
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

    xin.set('xin.ui', {
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

})(window.xin);/**
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
     * xin.directive.AppDirective
     *
     * Directive to initialize xin application context
     *
     */
    var AppDirective = function(app) {
        this.app = app;
    };

    _.extend(AppDirective.prototype, {

        /**
         * Matching to [data-role=app]
         *
         * @param  $DOM     $el Dom node(s) representation (jQuery|Zepto)
         * @return Promise
         */
        matcher: function($el) {
            return $el.data('role') && $el.data('role').toLowerCase() === 'app';
        },

        /**
         * If match instantiating xin application context
         *
         * @param  $DOM $el Dom node(s) representation
         * @return Promise
         */
        run: function($el) {
            var deferred = xin.Deferred();
            // console.log('AppDirective start');

            $el.attr('instantiated', true).addClass('xin-role').data('instance', this.app);

            // console.log('AppDirective done');
            deferred.resolve();

            return deferred.promise();
        }
    });

    xin.set('xin.directive.AppDirective', AppDirective);

})(window.xin);/**
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
     * xin.directive.RoleDirective
     */
    var RoleDirective = function(app) {
        this.app = app;
    };

    _.extend(RoleDirective.prototype, {

        matcher: function($el) {
            if ($el.data('role') && ($el.data('role').toLowerCase() !== 'app')) {
                return true;
            }
        },

        run: function($el) {
            var deferredRules = [],
                deferred = new xin.Deferred(),
                app = this.app,
                options,
                role;

            // if already instantiated then it is resolved
            if ($el.data('instantiated')) {
                return deferred.resolve().promise();
            }

            // prepare options for instantiating
            options = _.defaults($el.data(), {
                el: $el,
                app: app
            });

            // save role
            role = options.role;
            // TODO: reekoheek, there was a reason why options.role should be
            // deleted
            delete options.role;


            // try to resolve each option from application context before
            // instantiating
            _.each(options, function(option, key) {
                if (typeof option == 'string') {

                    option = key + ':' + option;
                    var promise = app.resolve(option).then(function(data) {
                        options[key] = data;
                    });

                    deferredRules.push(promise);
                }
            });

            // after every option already resolved then instantiating
            xin.when.apply(null, deferredRules).done(function() {

                // resolve from application context
                app.resolve(role, options).done(function(instance) {
                    var $el,
                        $parent;

                    if (!instance) {
                        throw new Error('Role: "' + role + '" undefined');
                    }

                    if ($el = instance.$el) {
                        $parent = $el.parent('.xin-role');

                        $el.attr('data-instantiated', true)
                            .data('instance', instance)
                            .attr('data-cid', instance.cid);

                        if ($parent.length) {
                            var parent = $parent.data('instance');
                            if (parent.addChild) {
                                parent.addChild(instance);
                            }
                        }
                    }

                    if (instance instanceof Backbone.View) {
                        instance.app = instance.options.app;
                        instance.$el.addClass('xin-role');
                        if (!(instance instanceof xin.ui.Pane)) {
                            instance.$el.addClass('xin-view');
                        }
                        instance.render();
                    }
                    deferred.resolve();
                }).fail(function() {
                    console.log(arguments);
                });
            });

            return deferred.promise();
        }
    });

    xin.set('xin.directive.RoleDirective', RoleDirective);
})(window.xin);/**
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
    /**
     * xin.directive.URIDirective
     */
    var URIDirective = function(app) {
        this.app = app;
        this.router = app.router;

        this.router.viewRoutes = app.router.viewRoutes || {};
        this.router.viewDefaultRoute = null;
    };

    _.extend(URIDirective.prototype, {
        matcher: function($el) {
            return $el.data('uri');
        },

        run: function($el) {
            var that = this,
                deferred = xin.Deferred(),
                uri = $el.data('uri');

            this.router.registerView(uri, $el);

            return deferred.resolve().promise();
        }
    });

    xin.set('xin.directive.URIDirective', URIDirective);
})(window.xin);/**
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
     * xin.directive.BindDirective
     * @param xin.App app Application context
     */
    var BindDirective = function(app) {
        this.app = app;
    };

    _.extend(BindDirective.prototype, {

        newRef: function() {
            this.ref = this.ref || 0;
            return 'bind-' + this.ref++;
        },

        matcher: function($el) {
            return $el.data('bind');
        },

        run: function($el) {
            var deferred = xin.Deferred(),
                app = this.app,
                that = this;

            var $elScope = ($el.hasClass('xin-role')) ? $el : $el.parents('.xin-role'),
                view = $elScope.data('instance');

                var binds = $el.data('bind').trim().split(/\s+/);
                _.each(binds, function(bind) {
                    var eventName, refName, method;
                    bind = bind.split(':');
                    if (bind.length > 1) {
                        eventName = bind[0];
                        method = bind[1];
                        method = view[method] || that.app.get(method);
                        if (_.isFunction(method)) {
                            refName = that.newRef();
                            $el.attr('data-bind-ref', refName);

                                method = _.bind(method, view);
                                view.$el.on(eventName, '[data-bind-ref=' + refName + ']', method);
                        }
                    }
                });
                deferred.resolve();

            return deferred.promise();
        }
    });

    xin.set('xin.directive.BindDirective', BindDirective);
})(window.xin);;(function(xin) {
    "use strict";

    var Layout = function(options) {
        var $el;
        this.id = options.id = options.id || 'default';
        this.app = options.app;

        $el = xin.$(options.el);
        this.$el = $el.clone();
        this.$el.find('[data-region]').addClass(function() {
            return 'xin-region-' + xin.$(this).data('region');
        });

        $el.remove();

        if (!Layout.get(this.app, this.id)) {
            Layout.put(this.app, this.id, this);
        }
    };

    _.extend(Layout.prototype, {
        apply: function($el) {

            var $clone = this.$el.clone();

            $clone.find('[data-region=body]').html($el.html());

            if ($el.data('title')) {
                $clone.find('[data-region=title]').html($el.data('title'));
            }

            $el.html($clone.html());
            $el.addClass($clone.attr('class'));
        }
    });

    Layout.get = function(app, id) {
        var layout = app.get('_layout.' + id);
        return layout;
    };

    Layout.put = function(app, id, o) {
        app.set('_layout.' + id, o);
    }

    xin.set('xin.ui.Layout', Layout);

})(window.xin);;(function(xin) {
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

})(window.xin);;(function(xin) {
    "use strict";
    var Container = Backbone.View.extend({});
    var Pane = Container.extend({
        initialize: function(options) {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.transition = options.transition || 'plain';
            this.activePage = null;
            this.pages = {};

            if (!options.app.router.mainViewport || options.mainViewport) {
                options.app.router.mainViewport = this.$el;
            }

            this.$el.addClass('xin-pane');
        },

        addChild: function(view) {
            var object = {};
            object[view.cid] = view;
            _.extend(this.pages, object);

            this.pageKeys = _.keys(this.pages);
            this.pageValues = _.values(this.pages);

            view.parent = this;

            // var evaluateScroll = _.throttle(function() {

            //     var domEl = view.$el[0];

            //     if (view.$el.height() + 20 >= domEl.scrollHeight) {
            //         // view.$el.css('overflow', 'hidden');
            //         return;
            //     // } else {
            //     //     view.$el.css('overflow', 'auto');
            //     }

            //     if (domEl.scrollTop === 0) {
            //         domEl.scrollTop = 10;
            //     } else if (domEl.offsetHeight + domEl.scrollTop === domEl.scrollHeight) {
            //         domEl.scrollTop = domEl.scrollTop - 10;
            //     }
            // }, 300);

            // view.$el.off('scroll').on('scroll', function() {
            //     evaluateScroll();
            //     // console.log(a.scrollTop, a.offsetHeight + a.scrollTop, a.scrollHeight) });
            // });

            return this;
        },

        showChild: function(view) {
            var inIndex = -1, outIndex = -1, deferred = xin.Deferred();

            if (this.activePage == view) return deferred.resolve().promise();

            if (view) {
                inIndex = _.indexOf(this.pageValues, view);
            }
            if (this.activePage) {
                outIndex = _.indexOf(this.pageValues, this.activePage);
            }

            this.$el.scrollTop(0);

            xin.ui.Pane.transitions[this.transition](this, view, this.activePage, outIndex - inIndex)
                .done(deferred.resolve);

            this.activePage = view;

            return deferred.promise();
        }
    });

    _.extend(Pane, {
        transitions: {
            plain: function(pane, inView, outView, direction) {
                var deferred = xin.Deferred();

                if (outView) {
                    outView.$el.removeClass('xin-show');
                }
                inView.$el.addClass('xin-show');
                deferred.resolve();

                return deferred.promise();
            },

            slide: function(pane, inView, outView, direction) {
                var method, inFx, outFx, deferred = xin.Deferred();
                if (direction < 0) {
                    method = "left";
                } else {
                    method = "right";
                }
                //in
                if (inView) {
                    inFx = new xin.fx.SlideIn(inView.$el, method);
                }
                //out
                if (outView) {
                    outFx = new xin.fx.SlideOut(outView.$el, method);
                }

                if (inFx) inFx.play();
                if (outFx) outFx.play().then(function() {
                    xin.$(this).removeClass('xin-show');
                    _.defer(deferred.resolve);
                });

                return deferred.promise();
            }
        }
    });

    xin.set('xin.ui.Container', Container);
    xin.set('xin.ui.Pane', Pane);
})(window.xin);;(function(xin) {
    "use strict";

    var List = xin.ui.Outlet.extend({
        initialize: function(options)  {
            this.$el.addClass('xin-list');

            this.itemTemplate = options.template || _.template('<li><%= model %></li>');
        },

        render: function() {
            var that = this;
            if (this.collection) {
                this.collection.each(function(model) {
                    var item = new List.Item({
                        template: that.itemTemplate,
                        model: model
                    });
                    that.$el.append(item.render().$el);
                });
            }
        }
    });

    List.Item = xin.ui.Outlet.extend({
        render: function() {
            this.$el = xin.$(this.template(this));
            return this;
        }
    });

    // var List = xin.ui.Outlet.extend({
    //     initialize: function() {
    //         this.listenTo(this.collection, 'reset', this.reset);
    //         this.listenTo(this.collection, 'add', this.add);
    //         this.listenTo(this.collection, 'remove', this.remove);

    //         this.children = {};
    //     },

    //     reset: function() {
    //         if (this.emptyPrototype) {
    //             if (!this.emptyView) {
    //                 this.emptyView = this.emptyPrototype.newInstance();
    //             }

    //             var that = this;

    //             _.each(this.children, function(o, k) {
    //                 var view = o,
    //                     $el = o.$el;

    //                 delete that.children[k];
    //                 if (view.destroy) view.destroy();
    //                 $el.remove();
    //             });

    //             if (this.emptyView) {
    //                 this.emptyView.$el.detach();
    //             }

    //             this.$emptyAttachPoint.html('');
    //             this.$itemAttachPoint.html('');

    //             this.$emptyAttachPoint.append(this.emptyView.$el);
    //         }
    //     },

    //     add: function(model) {
    //         if (this.emptyView) {
    //             this.emptyView.$el.detach();
    //         }

    //         console.log(this.itemPrototype);
    //         if (this.itemPrototype) {
    //             var itemView = this.itemPrototype.newInstance({
    //                 model: model
    //             });
    //             itemView.parent = this;
    //             this.children[itemView.cid] = itemView;
    //             this.$itemAttachPoint.append(itemView.$el);
    //         }
    //     },

    //     remove: function(model, collection) {
    //         var $el = this.$itemAttachPoint.find('[data-cid=' + model.cid + ']'),
    //             view = $el.data('instance');

    //         delete this.children[view.cid];

    //         if (view.destroy) view.destroy();
    //         $el.remove();

    //         if (!collection.length) {
    //             this.reset();
    //         }
    //     }
    // });
    xin.set('xin.ui.List', List);

    // var ListItem = xin.ui.ViewFactory.extend({
    //     initialize: function(options) {
    //         var roleParentView = this.$roleParent.data('instance');
    //         if (roleParentView) {
    //             roleParentView.itemPrototype = this;
    //             roleParentView.$itemAttachPoint = this.$parent;
    //         }
    //     }
    // });

    // xin.set('xin.ui.ListItem', ListItem);

    // var ListEmpty = xin.ui.ViewFactory.extend({
    //     initialize: function(options) {
    //         var roleParentView = this.$roleParent.data('instance');
    //         if (roleParentView) {
    //             roleParentView.emptyPrototype = this;
    //             roleParentView.$emptyAttachPoint = this.$parent;
    //         }
    //     }
    // });

    // xin.set('xin.ui.ListEmpty', ListEmpty);

})(window.xin);;(function(xin) {
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