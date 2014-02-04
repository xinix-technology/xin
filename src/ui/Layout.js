;(function(xin) {
    "use strict";

    var Layout = function(options) {
        var $el;
        this.id = options.id = options.id || 'default';
        this.app = options.app;

        $el = xin.$(options.el);
        this.$el = $el.clone();
        this.$el.find('[data-region]').addClass(function() {
            return 'xin-region-' + xin.$(this).data('region');
        });

        $el.remove();

        if (!Layout.get(this.app, this.id)) {
            Layout.put(this.app, this.id, this);
        }
    };

    _.extend(Layout.prototype, {
        apply: function($el) {

            var $clone = this.$el.clone();

            $clone.find('[data-region=body]').html($el.html());

            if ($el.data('title')) {
                $clone.find('[data-region=title]').html($el.data('title'));
            }

            $el.html($clone.html());
            $el.addClass($clone.attr('class'));
        }
    });

    Layout.get = function(app, id) {
        var layout = app.get('_layout.' + id);
        return layout;
    };

    Layout.put = function(app, id, o) {
        app.set('_layout.' + id, o);
    }

    xin.set('xin.ui.Layout', Layout);

})(window.xin);