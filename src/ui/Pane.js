;(function(xin) {
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
            // if (xin.ui.isFirstRender()) {
            //     deferred.resolve();
            // } else {
            xin.ui.Pane.transitions[this.transition](this, view, this.activePage, outIndex - inIndex)
                .done(deferred.resolve);
            // }

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

                var afterFx = function() {
                    xin.$(this).removeClass('xin-show');
                    _.defer(deferred.resolve);
                };

                if (!outView) {
                    afterFx();
                } else {
                    //in
                    if (inView) {
                        inFx = new xin.fx.SlideIn(inView.$el, method);
                    }
                    //out
                    if (outView) {
                        outFx = new xin.fx.SlideOut(outView.$el, method);
                    }


                    if (inFx) {
                        var fx = inFx.play();
                        if (!outFx) {
                            fx.then(afterFx);
                        }
                    }
                    if (outFx) outFx.play().then(afterFx);
                }


                return deferred.promise();
            }
        }
    });

    xin.set('xin.ui.Container', Container);
    xin.set('xin.ui.Pane', Pane);

})(window.xin);