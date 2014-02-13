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
        },

        htmlDecode: function(input){
            return input.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
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

    (function() {
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
    })();

    (function(old) {
        _.template = function(text, data) {
            var r = old.apply(this, arguments);

            if (!data)  {
                r.text = text;
            }
            return r;
        };
    })(_.template);

    (function(old) {
        xin.$.fn.attr = function() {
            if(arguments.length === 0) {
                if(this.length === 0) {
                    return null;
                }

                var obj = {};
                xin.$.each(this[0].attributes, function() {
                    if(this.specified) {
                        obj[this.name] = this.value;
                    }
                });
                return obj;
            }

            return old.apply(this, arguments);
        };
    })(xin.$.fn.attr);

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

    var detect = {
        ua: ua,
        iphone: iphone,
        ipad: ipad,
        ios: ios,
        fullscreen: fullscreen,
        android: android,
        moz: moz,
        webkit: webkit
    };

    detect.TRANSITION_END = 'transitionend';
    if (webkit) {
        detect.TRANSITION_END = 'webkitTransitionEnd';
    }

    xin.set('xin.detect', detect);

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

                if ($form.data('rel') == 'external') {
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

                var hash = (href.split('#')[0] == location.href.split('#')[0]) ? '#_' : '#' + href;

                location.hash = hash;
            });

            this.$el.on('submit', 'form', function(evt) {
                var $form = xin.$(this),
                    onSubmit = $form.data('submit');

                if ($form.data('rel') == 'external') {
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
                    onSubmit(null, data, xhr);
                    Backbone.trigger('form-success', $form, data, info, xhr);
                }).fail(function(xhr, err, message) {
                    onSubmit(err, message, xhr);
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
            if (uri[0] == '/') {
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
                'list': 'xin.ui.List',
                'list-item': 'xin.ui.List.Item',
                'drawer': 'xin.ui.Drawer',
                'navbar': 'xin.ui.Navbar'
            };
        },

        clear: function() {
            this.context = {};
            this.context.prototype = this.fallbackContext;
        },

        get: function(key) {
            if (!key) {
                console.error('IoC cannot get from key:', key);
                return;
            }

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
            if (!key) {
                console.error('cannot set key:', key, 'value:', value);
                return;
            }

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

        createObject: function(Constructor, options) {
            var deferred = xin.Deferred(),
                object,
                id = (options) ? options.id : null,
                args = [],
                f;

            for(var i in arguments) {
                args.push(arguments[i]);
            }

            if (Constructor.prototype instanceof Backbone.Collection || Constructor.prototype instanceof Backbone.Model) {
                args[0] = null;
            } else {
                args = args.slice(1);
            }

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

            object.app = this.app;

            if (id) {
                this.set(id, object);
            }

            if (options.show) {
                f = this.get(options.show);
                if (f && typeof object.on == 'function') {
                    object.on('show', f);
                }
            }

            if (options.init) {
                f = this.get(options.init);
                f.apply(object);
            }

            // Backbone.trigger('xin-init', object);

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
                    if (!value) {
                        throw new Error('Key: ' + key + ' not found!');
                    }

                    value.xrole = key;
                    if (typeof value == 'function') {
                        var first = _.last(key.split('.'))[0];
                        if (first.toUpperCase() == first) {
                            args[0] = value;
                            this.createObject(args[0], args[1]).then(deferred.resolve, deferred.reject);
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

                return deferred.promise();
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

        routes: {
            "*splats": "routeMissing"
        },

        /**
         * Start router
         */
        start: function() {
            // this.setDefaultRoute();

            Backbone.history.start();
        },

        // setDefaultRoute: function() {
        //     Backbone.history.handlers.push({
        //         route: /^(.*?)$/,
        //         callback: _.bind((this.options && this.options.routeMissing) || this.routeMissing, this)
        //     });
        // },

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
            uri = (uri || '').trim();

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

                    // FIXME on remote load, should scan every doms to update
                    // every view or datasource
                    var $data = xin.$(data),
                        $role = $data.find('[data-role=pane] > [data-role]');
                    if ($role.length > 0) {
                        $data = $role;
                        $data.attr('data-uri', uri);
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

            if (typeof(callback) === 'string') {
                callback = this[callback];
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
            // if ($el) {
            //     console.error('');
            //     console.log($el[0]);
            // }
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

            this.$el.on(xin.detect.TRANSITION_END, function() {
                that.$el.off(xin.detect.TRANSITION_END);
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

            this.$el.on(xin.detect.TRANSITION_END, function() {
                that.$el.off(xin.detect.TRANSITION_END);
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

            Backbone.trigger('xin-show', view);

            _.defer(function() {
                if (view.parent && view.parent.showChild) {
                    view.parent.showChild(view).done(function() {
                        view.$el[0].scrollTop = 0;
                        view.$el.addClass('xin-show');
                    });
                } else {
                   view.$el.addClass('xin-show');
                }

                view.trigger('show', view);
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

            $el.attr('data-instantiated', true).addClass('xin-role').data('instance', this.app);

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

                    $el = instance.$el;
                    if ($el) {
                        $parent = $el.parent('.xin-role');

                        $el.attr('data-instantiated', true)
                            .data('instance', instance)
                            .attr('data-cid', instance.cid)
                            .addClass('xin-role');

                        if ($parent.length) {
                            var parent = $parent.data('instance');
                            if (parent.addChild) {
                                parent.addChild(instance);
                            }
                        }
                    }

                    if (instance.onReady) {
                        xin.when(instance.onReady()).then(deferred.resolve);
                    } else {
                        deferred.resolve();
                    }
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
        this.binding = [];
    };

    _.extend(BindDirective.prototype, {

        newRef: function() {
            this.ref = this.ref || 0;
            return 'bind-' + this.ref++;
        },

        matcher: function($el) {
            return $el.data('bind');
        },

        onChanged: function(view, model) {
            // console.log('model:onChanged', arguments);
            view.$('[data-bind-key]').each(function() {
                var $object = xin.$(this),
                    d = $object.data(),
                    val = model.get(d.bindKey);

                if (d.bindTo.indexOf('attr-') === 0) {
                    var attr = d.bindTo.substr(5);
                    $object.attr(attr, val);
                } else {
                    if ($object[0].tagName == 'INPUT') {
                        if ($object.attr('type') == 'checkbox' || $object.attr('type') == 'radio') {
                            $object.attr('checked', val || false);
                        } else {
                            $object.val(val);
                        }
                    } else {
                        $object.html(val);
                    }
                }

            });
        },

        run: function($el) {
            var deferred = xin.Deferred(),
                app = this.app,
                that = this;

            if ($el.data('bindRef')) {
                return deferred.resolve().promise();
            }

            var $elScope = ($el.hasClass('xin-role')) ? $el : $el.parents('.xin-role:not(.xin-layout)'),
                view = $elScope.data('instance');

            var binds = $el.data('bind').trim().split(/\s+/);

            _.each(binds, function(bind) {
                var eventName, refName, method;
                bind = bind.split(':');
                if (bind.length === 1) {
                    bind[1] = bind[0];
                    bind[0] = 'val';
                }

                if (bind[0] == 'val' || (bind[0] || '').indexOf('attr-') === 0) {
                    // FIXME data binding please!!!
                    that.binding[view.cid] = that.binding[view.cid] || [];
                    if (view && view.model) {
                        refName = that.newRef();
                        $el.attr('data-bind-ref', refName).attr('data-bind-to', bind[0]).attr('data-bind-key', bind[1]);

                        method = _.bind(function() {
                            var val = $el.val();
                            if ($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') {
                                val = $el.attr('checked') ? true : false;
                            }
                            this.model.attributes[$el.data('bindKey')] = val;
                            // console.log('set:'+val);
                        }, view);

                        view.model.on('change', _.partial(that.onChanged, view));
                        view.$el.on('change.delegateEvents' + view.cid, '[data-bind-ref=' + refName + ']', method);
                    }
                } else {

                    eventName = bind[0];
                    method = bind[1];
                    if (view && view[method]) {
                        method = view[method];
                    } else {
                        method = that.app.get(method);
                    }
                    if (_.isFunction(method)) {
                        refName = that.newRef();
                        $el.attr('data-bind-ref', refName);

                        if (view && view.delegateEvents) {
                            view.events = _.result(view, 'events') || {};
                            view.events[eventName + ' [data-bind-ref=' + refName + ']'] = method;
                            view.delegateEvents();
                        } else {
                            app.$el.on(eventName, '[data-bind-ref=' + refName + ']', method);
                        }
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
        this.initialize.apply(this, arguments);
    };

    _.extend(Layout.prototype, {

        $: function(sel) {
            return this.$el.find(sel);
        },

        initialize: function(options) {
            var $el,
                app = options.app,
                $views;

            this.id = options.id = options.id || 'default';
            this.app = options.app;

            delete options.id;

            $views = this.$views = {};

            this.$el = $el = xin.$(options.el);

            $el.addClass('xin-layout');

            this.$el.find('[data-region]').addClass(function() {
                return 'xin-region xin-region-' + xin.$(this).data('region');
            });

            this.$el.find('[data-role]').each(function() {
                var $view = xin.$(this),
                    role = $view.data('role');

                $views[role] = $view;
            });
        },

        initTo: function(view) {
            var $clone = this.$el.clone();

            $clone.find('.xin-region-body').html(view.$el.html());

            view.$el.html($clone.html()).addClass($clone.attr('class'));
        },

        applyTo: function(view) {

            var $views = this.$views;
            view.$('.xin-region').each(function() {
                var $region = xin.$(this);

                if ($region.data('region') == 'body') return;

                $region.find('.xin-role').each(function() {
                    var $view = xin.$(this),
                        role = $view.data('role'),
                        instance = $views[role].data('instance');
                    $view.data('instance', instance);
                    instance.setElement($view);

                });
            });
            //         region = $viewRegion.data('region');

            //     if (region != 'body') {
            //         $viewRegion.find('[data-role]').each(function() {
            //             console.log(xin.$(this)[0]);
            //         });
            //         // $viewRegion.replaceWith($views[region].clone());
            //         // $viewRegion.html('').append(function() {
            //         //     console.log('xxx');
            //         //     return '<div></div>';
            //         // });

            //         // replaceWith($views[region]);
            //     }


            if (view.$el.data('title')) {
                view.$('[data-region=title]').html(view.$el.data('title'));
            }
        }

    });

    xin.set('xin.ui.Layout', Layout);

    Backbone.on('xin-show', function(view) {
        var layout = view.app.get(view.$el.data('layout'));
        if (layout) {
            layout.applyTo(view);
        }
    });

    // Backbone.on('xin-init', function(view) {
    //     if (!view.$el) {
    //         console.log(view);
    //         return;
    //     }
    //     var layout = app.get(view.$el.data('layout'));
    //     if (layout) {
    //         layout.initTo(this);
    //     }
    // });

})(window.xin);;(function(xin) {
    "use strict";

    var Outlet = Backbone.View.extend({
        initialize: function(options) {
            var app = options.app,
                f,
                layout;

            // if (options.show) {
            //     f = app.get(options.show);
            //     if (f) {
            //         this.on('show', f);
            //     }
            // }

            this.template = options.template || null;

            // FIXME init layout to view in ioc after create view
            if (options.layout) {
                layout = app.get(options.layout);
                if (layout) {
                    layout.initTo(this);
                }
            }

            this.$el.addClass('xin-view');


            if (this.render) {
                var render = _.debounce(_.bind(this.render, this), 100, false);

                if (this.model) {
                    this.listenTo(this.model, 'change', render);
                    this.listenTo(this.model, 'destroy', render);
                }

                // this.app = this.options.app;
                render();
            }
        },

        render: function() {
            if (this.template) {
                this.$el.html(this.template(this));

                this.app.directiveManager.scan(this.$el);
            }
            this.trigger('rendered');
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

                var afterFx = function() {
                    xin.$(this).removeClass('xin-show');
                    _.defer(deferred.resolve);
                };

                if (inFx) {
                    var fx = inFx.play();
                    if (!outFx) {
                        fx.then(afterFx);
                    }
                }
                if (outFx) outFx.play().then(afterFx);

                return deferred.promise();
            }
        }
    });

    xin.set('xin.ui.Container', Container);
    xin.set('xin.ui.Pane', Pane);
})(window.xin);;(function(xin) {
    "use strict";

    var List = xin.ui.Outlet.extend({
        initialize: function(options) {
            this.$el.addClass('xin-list');

            this.app = options.app;

            if (this.collection) {
                var template,
                    $fetch;

                // template priority:
                // - options.template
                // - embedded html as template
                // - hardcoded template
                if (options.template) {
                    if (options.template.text) {
                        template = options.template.text;
                    } else {
                        this.itemTemplate = options.template;
                        this.itemAttributes = [];
                        this.itemTagName = 'li';
                    }
                } else {
                    template = xin.htmlDecode(this.$el.html());
                    if (!template) {
                        this.itemTemplate = _.template('<%= model %>');
                        this.itemAttributes = [];
                        this.itemTagName = 'li';
                    }
                }

                if (template) {
                    $fetch = xin.$(template);
                    this.itemAttributes = $fetch.attr();
                    this.itemTemplate = _.template(xin.htmlDecode($fetch.html()));
                    this.itemTagName = $fetch[0].tagName.toLowerCase();
                }

                this.itemAttributes['data-role'] = this.itemAttributes['data-role'] || 'list-item';

                this.listenTo(this.collection, 'reset', this.reset);
                this.listenTo(this.collection, 'add', this.add);
                this.listenTo(this.collection, 'remove', this.remove);

                this.reset();
            }

        },

        reset: function() {
            var that = this;
            this.$el.html('');

            _.each(this.collection.models, function(model) {
                that.add(model);
            });
        },

        add: function(model) {
            var $item = xin.$('<' + this.itemTagName + '/>').attr(this.itemAttributes).data({
                template: this.itemTemplate,
                model: model
            }).addClass('xin-list-item');
            this.$el.append($item);

            this.app.directiveManager.scan($item);
        },

        remove: function(model, collection) {
            // var $el = this.$itemAttachPoint.find('[data-cid=' + model.cid + ']'),
            //     view = $el.data('instance');

            // delete this.children[view.cid];

            // if (view.destroy) view.destroy();
            // $el.remove();

            // if (!collection.length) {
            //     this.reset();
            // }
        }
    });

    List.Item = xin.ui.Outlet.extend({
        // attributes: function() {
        //     return {
        //         'data-cid': this.cid,
        //         'data-model-cid': this.model.cid,
        //         'data-instantiated': true
        //     };
        // },

        // render: function() {
        //     // var attrs = _.extend({}, _.result(this, 'attributes'));

        //     // if (this.id) attrs.id = _.result(this, 'id');
        //     // if (this.className) attrs['class'] = _.result(this, 'className');


        //     var $el = xin.$(this.template(this));
        //     // .attr(attrs);

        //     // $el.addClass('xin-list-item');

        //     // if (!$el.attr('data-role')) {
        //     //     $el.attr('data-role', 'list-item');
        //     // }

        //     this.setElement($el, false);
        //     $el.data('instance', this);

        //     return this;
        // }
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
            this.constructor.__super__.initialize.apply(this, arguments);

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
})(window.xin);;(function(xin) {
    "use strict";

    var Navbar = xin.ui.Outlet.extend({
        initialize: function() {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.$el.addClass('xin-navbar');
        }
    });

    xin.set('xin.ui.Navbar', Navbar);
})(window.xin);