;(function(xin) {
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
                    var $template = this.$('>template');
                    if ($template.length <= 0) {
                        $template = this.$('>script[type="text/template"]');
                    }

                    template = $template.html();
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
                this.listenTo(this.collection, 'sort', this.reset);
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

})(window.xin);
