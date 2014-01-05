;(function(xin) {
    "use strict";

    var List = xin.ui.Outlet.extend({
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
    xin.set('xin.ui.List', List);

    var ListItem = xin.ui.ViewFactory.extend({
        initialize: function(options) {
            var roleParentView = this.$roleParent.data('instance');
            if (roleParentView) {
                roleParentView.itemPrototype = this;
                roleParentView.$itemAttachPoint = this.$parent;
            }
        }
    });

    xin.set('xin.ui.ListItem', ListItem);

    var ListEmpty = ViewFactory.extend({
        initialize: function(options) {
            var roleParentView = this.$roleParent.data('instance');
            if (roleParentView) {
                roleParentView.emptyPrototype = this;
                roleParentView.$emptyAttachPoint = this.$parent;
            }
        }
    });

    xin.set('xin.ui.ListEmpty', ListEmpty);

})(window.xin);