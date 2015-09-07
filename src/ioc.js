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
                var data = $('.xin-show').data();

                if(data.instance) return data.instance;
                if(!data.id){
                    console.error('IoC cannot get from key:', key);
                    return;
                }
                key = data.id;
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
                if (key.indexOf('/') < 0) {
                    var $template = xin.$('script#' + key);
                    if ($template.length > 0) {
                        return xin.Deferred().resolve(_.template($template.html())).promise();
                    }
                }

                var resolver = IoC.getResolver('xhr');

                return resolver(key).then(function(data) {
                    return xin.Deferred().resolve(_.template(data));
                }, null);
            },

            model: function(key) {
                var deferred = xin.Deferred();

                xin.when(this.resolve(key)).then(function(model) {
                    if (!(model instanceof Backbone.Model)) {
                        model = new Backbone.Model(model);
                    }
                    deferred.resolve(model);
                });

                return deferred.promise();
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

})(window.xin);
