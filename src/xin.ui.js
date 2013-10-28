(function() {

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