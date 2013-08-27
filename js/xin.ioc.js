
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

})();