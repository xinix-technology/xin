(function() {

    window.xin = window.xin || {};

    var SlideIn = function($el, to) {
        this.$el = $el;
        this.to = to;
        this.timeout = 0.3;
    };

    _.extend(SlideIn.prototype, {
        play: function() {
            var that = this,
                deferred = $.Deferred();

            this.$el.on('webkitTransitionEnd', function() {
                that.$el.off('webkitTransitionEnd');
                that.$el.css('-webkit-transition', '');
                deferred.resolve();
            });

            var from = '100%';
            if (this.to == 'right') {
                from = '-' + from;
            }

            this.$el.css('-webkit-transform', 'translate3d(' + from + ', 0, 0)');
            this.$el.css('-webkit-transition', 'all ' + that.timeout + 's');
            that.$el.addClass('xin-show');

            setTimeout(function() {
                that.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
            }, xin.fx.defaultOptions.delay);

            return deferred.promise();
        }
    });

    var SlideOut = function($el, to) {
        this.$el = $el;
        this.to = to;
        this.timeout = 0.3;
    };

    _.extend(SlideOut.prototype, {
        play: function() {
            var that = this,
                deferred = $.Deferred();

            this.$el.on('webkitTransitionEnd', function() {
                that.$el.off('webkitTransitionEnd');
                that.$el.removeClass('xin-show');
                that.$el.css('-webkit-transition', '');
                deferred.resolve();
            });

            this.$el.css('-webkit-transform', 'translate3d(0, 0, 0)');
            this.$el.css('-webkit-transition', 'all ' + that.timeout + 's');

            setTimeout(function() {
                var to = '100%';
                if (that.to == 'left') {
                    to = '-' + to;
                }
                that.$el.css('-webkit-transform', 'translate3d(' + to + ', 0, 0)');
            }, xin.fx.defaultOptions.delay);

            return deferred.promise();
        }
    });

    window.xin.fx = {
        defaultOptions: {
            delay: 300,
        },
        SlideIn: SlideIn,
        SlideOut: SlideOut,
    };

})();