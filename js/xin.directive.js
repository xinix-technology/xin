(function() {

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

    window.xin.directive = {
        AppDirective: AppDirective,
        RoleDirective: RoleDirective,
        // ListDirective: ListDirective,
        URIDirective: URIDirective
    };

})();