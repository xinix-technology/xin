;(function(xin) {
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

})(window.xin);