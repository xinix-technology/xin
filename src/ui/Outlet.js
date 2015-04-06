;(function(xin) {
    "use strict";

    var Outlet = Backbone.View.extend({

        events : {
            'submit form.searchForm': 'submitSearch',
            'click .back': 'back'
        },

        back: function(evt) {
            var ref = $(evt.target).parents('[data-region="header"]').parent().data('referer');
            if(ref) {
                location.hash = ref;
            }
            return false;
        },

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


    var View = Outlet.extend({

        events : {
            'click .showDrawer': 'showDrawer',
            'click [data-role="navbar"] .more': 'moreMenu',
            'click [data-role="navbar"] .search': 'showSearchBox',
            'click [data-region="body"]': 'bodyClicked',
            'submit form.searchForm': 'submitSearch'
        },

        submitSearch: function(evt) {
            var form = $(evt.target).serializeObject();
            if(form.search.trim() === '') {
                alert("Searh is required.");
                return false;
            }

            this.search(form.search.trim());
            return false;
        },

        search: function(text) {
            console.log(text);
        },

        bodyClicked: function(evt) {
            this.$el.find('.navbar').removeClass('hide');
            this.$el.find('.searchBox').addClass('hide');
            this.$el.find('.moreMenu').addClass('hide');
        },

        showSearchBox: function(evt) {
            this.$el.find('.navbar').addClass('hide');
            this.$el.find('.searchBox').removeClass('hide');
            this.$el.find('form.searchForm input[name="search"]').val(null);
            this.$el.find('form.searchForm input[name="search"]').focus();
        },

        moreMenu: function(evt) {

            if (this.$el.find('.moreMenu').hasClass('hide')) {
                this.$el.find('.moreMenu').removeClass('hide');
            } else {
                this.$el.find('.moreMenu').addClass('hide');
            }
        },

        showDrawer: function() {
            xin.$('.xin-drawer').data('instance').show();
            return false;
        },

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
    xin.set('xin.ui.View', View);

})(window.xin);