;(function(xin) {
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

            view.$el.html($clone.html()).addClass($clone.attr('class')).removeClass('xin-layout');
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
        if (!view.$el.data('layout')) return;

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

})(window.xin);