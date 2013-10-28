/**
 * Xin library
 * https://github.com/reekoheek/xin
 * Copyright 2013, Xinix Technology <http://xinix.co.id>
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function() {
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

})();(function() {
    "use strict";

    window.xin = window.xin || {};

    var page = document.body,
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
        // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        lastWidth = 0;

    window.xin.detect = {
        ua: ua,
        iphone: iphone,
        ipad: ipad,
        ios: ios,
        fullscreen: fullscreen,
        android: android
    };

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
})();(function() {

    "use strict";

    window.xin = window.xin || {};

    var DirectiveManager = function(app) {
        this.app = app;
        this.directives = {};
    };

    _.extend(DirectiveManager.prototype, {
        add: function(id, directive) {
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
                deferred = new $.Deferred(),
                promise;

            $el = $el || this.app.$el;

            _.each(this.directives, function(directive) {
                if (directive.matcher($el)) {
                    if (!promise) {
                        promise = directive.run($el);
                    } else {
                        promise = promise.then(function() {
                            return directive.run($el);
                        });
                    }
                }
            });

            if (!promise) {
                promise = $.Deferred().resolve().promise();
            }

            promise.done(function() {
                deferredRules = [];
                $el.children().each(function() {
                    var $el = $(this);
                    deferredRules.push(directiveManager.scan($el));
                });

                $.when.apply(null, deferredRules).done(function() {
                    deferred.resolve();
                });

            });
            return deferred.promise();
        }
    });

    window.xin.DirectiveManager = DirectiveManager;

    /**
     * xin.directive.AppDirective
     */
    var AppDirective = function(app) {
        this.app = app;
    };

    _.extend(AppDirective.prototype, {
        matcher: function($el) {
            return $el.data('role') && $el.data('role').toLowerCase() === 'app';
        },

        run: function($el) {
            var deferred = $.Deferred();
            // console.log('AppDirective start');

            $el.attr('instantiated', true).data('instance', this.app);

            // console.log('AppDirective done');
            deferred.resolve();

            return deferred.promise();
        }
    });

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
                // var role = $el.data('role').toLowerCase();
                // if (role.substr(0, 5) !== 'list-') {
                //     return true;
                // }

            }
        },
        run: function($el) {
            // console.log('RoleDirective start');

            var deferredRules = [],
                deferred = new $.Deferred(),
                app = this.app,
                options = _.defaults($el.data(), {
                    el: $el,
                    app: app
                });

            var role = options.role;
            delete options.role;

            _.each(options, function(option, key) {
                if (typeof option == 'string') {

                    option = key + ':' + option;
                    var promise = app.resolve(option).then(function(data) {
                        options[key] = data;
                    });

                    deferredRules.push(promise);
                }

            });

            $.when.apply(null, deferredRules).done(function() {
                app.resolve(role, options).done(function(instance) {
                    if (!instance) {
                        throw new Error('Role: "' + role + '" undefined');
                    }
                    var $el = instance.$el,
                        $parent;

                    if ($el) {
                        $parent = $el.parent('[data-role]');

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
                        instance.$el.addClass('xin-view');
                        instance.render();
                    }
                    deferred.resolve();
                });
            });

            return deferred.promise();
        }
    });

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
    //             $('#' + tmpId).remove();

    //             content = content.replace(/&lt;%/g, '<%').replace(/%&gt;/g, '%>');

    //             listView[type + 'Template'] = _.template(content);
    //             listView['$' + type + 'AttachPoint'] = $parent;
    //             $parent.attr('data-' + type + '-attach-point', true);

    //             listView.render();
    //         }
    //     }
    // });


    /**
     * xin.directive.URIDirective
     */
    var URIDirective = function(app) {
        var that = this;
        this.app = app;
        this.app.router.start = function() {
            if (!that.defaultRoute) {
                that.defaultRoute = _.keys(that.routes)[0];
            }

            var routeMissing = _.bind((this.options && this.options.routeMissing) || this.routeMissing, this);
            Backbone.history.handlers.push({
                route: /^(.*?)$/,
                callback: function(splats) {
                    _.defer(function() {
                        if (splats === '') {
                            location.hash = that.defaultRoute;
                        } else {
                            routeMissing.apply(that, arguments);
                        }
                    });
                }
            });

            Backbone.history.start();
        };
        this.routes = {};
        this.defaultRoute = '';

    };

    _.extend(URIDirective.prototype, {
        matcher: function($el) {
            return $el.data('uri');
        },

        run: function($el) {

            this.routes[$el.data('uri')] = $el;
            if ($el.data('uri-default')) {
                this.defaultRoute = $el.data('uri');
            }

            // console.log('URIDirective start');

            var deferred = $.Deferred(),
                app = this.app;

            // console.log('URIDirective done', $el.data('instance'));
            deferred.resolve();

            var callback = function() {
                xin.ui.show($el.data('instance'));
            };
            callback.options = $el.data('instance').options;

            this.app.router.route($el.data('uri'), callback);

            return deferred.promise();
        }
    });

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
            var deferred = $.Deferred(),
                app = this.app,
                that = this;

            var $elScope = ($el.is('[data-role]')) ? $el : $el.parents('[data-role]'),
                view = $elScope.data('instance');

                var binds = $el.data('bind').trim().split(/\s+/);
                _.each(binds, function(bind) {
                    var eventName, refName, method;
                    bind = bind.split(':');
                    if (bind.length > 1) {
                        eventName = bind[0];
                        method = bind[1];
                        method = view[method];
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

    window.xin.directive = {
        AppDirective: AppDirective,
        RoleDirective: RoleDirective,
        // ListDirective: ListDirective,
        URIDirective: URIDirective,
        BindDirective: BindDirective
    };

})();(function() {

    window.xin = window.xin || {};

    var SlideIn = function($el, to) {
        this.$el = $el;
        this.to = to;
        this.timeout = 0.3;
    };

    _.extend(SlideIn.prototype, {
        play: function() {
            var that = this,
                deferred = $.Deferred();

            this.$el.on('webkitTransitionEnd', function() {
                that.$el.off('webkitTransitionEnd');
                that.$el.css('-webkit-transition', '');
                deferred.resolve();
            });

            var from = '100%';
            if (this.to == 'right') {
                from = '-' + from;
            }

            this.$el.css('-webkit-transform', 'translate3d(' + from + ', 0, 0)');
            this.$el.css('-webkit-transition', 'all ' + that.timeout + 's');
            that.$el.addClass('xin-show');

            setTimeout(function() {
                that.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
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
                deferred = $.Deferred();

            this.$el.on('webkitTransitionEnd', function() {
                that.$el.off('webkitTransitionEnd');
                that.$el.removeClass('xin-show');
                that.$el.css('-webkit-transition', '');
                deferred.resolve();
            });

            this.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
            this.$el.css('-webkit-transition', 'all ' + that.timeout + 's');

            setTimeout(function() {
                var to = '100%';
                if (that.to == 'left') {
                    to = '-' + to;
                }
                that.$el.css('-webkit-transform', 'translate3d(' + to + ', 0, 0)');
            }, xin.fx.defaultOptions.delay);

            return deferred.promise();
        }
    });

    window.xin.fx = {
        defaultOptions: {
            delay: 300,
        },
        SlideIn: SlideIn,
        SlideOut: SlideOut,
    };

})();(function() {

    "use strict";

    window.xin = window.xin || {};

    if (window.Zepto) {
        Deferred.installInto(window.xin);
        if (!$.Deferred) {
            Deferred.installInto($);
        }
        $.fn.detach = $.fn.remove;
    }

    $.fn.serializeObject = function() {
        var form = {};
        _.each($(this).serializeArray(), function(value) {
            form[value.name] = value.value;
        });
        return form;
    };

})();
(function() {
    "use strict";

    window.xin = window.xin || {};

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
                'app': 'xin.Application',
                'view': 'xin.ui.Outlet',
                'pager': 'xin.ui.Pager',
                'list': 'xin.ui.List',
                'list-item': 'xin.ui.ListItem',
                'list-empty': 'xin.ui.ListEmpty'
            };
        },

        clear: function() {
            this.context = {};
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
            var deferred = $.Deferred(),
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

        resolve: function(key) {
            var found;
            do {
                if (this.aliases[key]) {
                    key = this.aliases[key];
                    found = true;
                } else {
                    found = false;
                }
            } while(found);

            var index,
                resolver,
                type = '',
                deferred = $.Deferred(),
                args = [],
                value;

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
                return $.get(key).then(null, function(xhr, state, message) {
                    return $.Deferred().reject(new Error(message)).promise();
                }).promise();
            },

            template: function(key) {
                var resolver = IoC.getResolver('xhr');

                return resolver(key).then(function(data) {
                    return $.Deferred().resolve(_.template(data));
                }, null);
            },

            model: function(key) {
                return this.resolve(key);
            },

            collection: function(key) {
                return this.resolve(key);
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

    window.xin.IoC = IoC;

})();(function() {

    "use strict";

    window.xin = window.xin || {};

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
                promise = $.Deferred().resolve().promise();
            }

            return promise;
        }
    });

    window.xin.ProviderRepository = ProviderRepository;

})();(function() {
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
})();(function() {

    "use strict";

    window.xin = window.xin || {};

    window.xin.ui = window.xin.ui || {};

    var Outlet = Backbone.View.extend({
        initialize: function(options) {
            this.template = options.template || null;
        },

        render: function() {
            if (this.template) {
                this.$el.html(this.template(this));
            }
            return this;
        },
    });
    window.xin.ui.Outlet = Outlet;

    var Pager = Outlet.extend({

        initialize: function(options) {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.transition = options.transition || 'plain';
            this.activePage = null;
            this.pages = {};

            this.$el.addClass('xin-pager');
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
            var inIndex = -1, outIndex = -1, deferred = $.Deferred();

            if (this.activePage == view) return deferred.resolve().promise();

            if (view) {
                inIndex = _.indexOf(this.pageValues, view);
            }
            if (this.activePage) {
                outIndex = _.indexOf(this.pageValues, this.activePage);
            }

            this.$el.scrollTop(0);

            xin.ui.Pager.transitions[this.transition](this, view, this.activePage, outIndex - inIndex)
                .done(deferred.resolve);

            this.activePage = view;

            return deferred.promise();
        }
    });

    _.extend(Pager, {
        transitions: {
            plain: function(pager, inView, outView, direction) {
                var deferred = $.Deferred();

                if (outView) {
                    outView.$el.removeClass('xin-show');
                }
                inView.$el.addClass('xin-show');
                deferred.resolve();

                return deferred.promise();
            },

            slide: function(pager, inView, outView, direction) {
                var method, inFx, outFx, deferred = $.Deferred();
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
                    $(this).removeClass('xin-show');
                    _.defer(deferred.resolve);
                });

                return deferred.promise();
            }
        }
    });

    window.xin.ui.Pager = Pager;


    var List = Outlet.extend({
        initialize: function() {
            this.listenTo(this.collection, 'reset', this.reset);
            this.listenTo(this.collection, 'add', this.add);
            this.listenTo(this.collection, 'remove', this.remove);

            this.children = {};
        },

        reset: function() {
            if (this.emptyPrototype) {
                if (!this.emptyView) {
                    this.emptyView = this.emptyPrototype.newInstance();
                }

                var that = this;

                _.each(this.children, function(o, k) {
                    var view = o,
                        $el = o.$el;

                    delete that.children[k];
                    if (view.destroy) view.destroy();
                    $el.remove();
                });

                this.emptyView.$el.detach();

                this.$emptyAttachPoint.html('');
                this.$itemAttachPoint.html('');

                this.$emptyAttachPoint.append(this.emptyView.$el);
            }
        },

        add: function(model) {
            this.emptyView.$el.detach();

            if (this.itemPrototype) {
                var itemView = this.itemPrototype.newInstance({
                    model: model
                });
                itemView.parent = this;
                this.children[itemView.cid] = itemView;
                this.$itemAttachPoint.append(itemView.$el);
            }
        },

        remove: function(model, collection) {
            var $el = this.$itemAttachPoint.find('[data-cid=' + model.cid + ']'),
                view = $el.data('instance');

            delete this.children[view.cid];

            if (view.destroy) view.destroy();
            $el.remove();

            if (!collection.length) {
                this.reset();
            }
        }
    });

    window.xin.ui.List = List;

    var ViewFactory = function(options) {
        var $el = $(options.el);
        delete options.el;

        if (!options.template) {
            var content = $el.html().replace(/&lt;%/g, '<%').replace(/%&gt;/g, '%>');
            options.template = _.template(content);
        }

        if (!options.view) {
            this.View = Outlet;
        } else {
            this.View = options.app.get(options.view);
        }

        this.options = options;

        this.attrs = {};
        var attrs = $el[0].attributes;
        for(var i = 0; i < attrs.length; i++) {
            this.attrs[attrs[i].nodeName] = attrs[i].nodeValue;
        }

        this.$roleParent = $el.parents('[data-role]').eq(0);
        this.$parent = $el.parent();
        $el.remove();

        this.initialize.apply(this, arguments);
    };

    _.extend(ViewFactory.prototype, {

        initialize: function(options) {},

        newInstance: function(options) {
            options = _.defaults(options || {}, this.options);

            var view = new this.View(options);

            view.$el.data('instance', view);

            _.each(this.attrs, function(value, name) {
                view.$el.attr(name, value);
            });

            if (options.model) {
                view.$el.attr('data-cid', options.model.cid);
            }

            view.render();
            return view;
        }

    });

    ViewFactory.extend = Backbone.View.extend;

    var ListItem = ViewFactory.extend({
        initialize: function(options) {
            var roleParentView = this.$roleParent.data('instance');
            if (roleParentView) {
                roleParentView.itemPrototype = this;
                roleParentView.$itemAttachPoint = this.$parent;
            }
        }
    });

    window.xin.ui.ListItem = ListItem;

    var ListEmpty = ViewFactory.extend({
        initialize: function(options) {
            var roleParentView = this.$roleParent.data('instance');
            if (roleParentView) {
                roleParentView.emptyPrototype = this;
                roleParentView.$emptyAttachPoint = this.$parent;
            }
        }
    });

    window.xin.ui.ListEmpty = ListEmpty;

    _.extend(window.xin.ui, {
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

})();