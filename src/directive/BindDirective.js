/**
 * XIN SPA Framework
 *
 * MIT LICENSE
 *
 * Copyright (c) 2014 PT Sagara Xinix Solusitama
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @author      Ganesha <reekoheek@gmail.com>
 * @copyright   2014 PT Sagara Xinix Solusitama
 * @link        http://xinix.co.id/products/xin
 * @license     https://raw.github.com/reekoheek/xin/master/LICENSE
 * @package     xin
 *
 */

;(function(xin) {
    "use strict";

    /**
     * xin.directive.BindDirective
     * @param xin.App app Application context
     */
    var BindDirective = function(app) {
        this.app = app;
    };

    _.extend(BindDirective.prototype, {

        newRef: function() {
            this.ref = this.ref || 0;
            return 'bind-' + this.ref++;
        },

        matcher: function($el) {
            return $el.data('bind');
        },

        run: function($el) {
            var deferred = xin.Deferred(),
                app = this.app,
                that = this;

            var $elScope = ($el.hasClass('xin-role')) ? $el : $el.parents('.xin-role'),
                view = $elScope.data('instance');

                var binds = $el.data('bind').trim().split(/\s+/);
                _.each(binds, function(bind) {
                    var eventName, refName, method;
                    bind = bind.split(':');
                    if (bind.length > 1) {
                        eventName = bind[0];
                        method = bind[1];
                        method = view[method] || that.app.get(method);
                        if (_.isFunction(method)) {
                            refName = that.newRef();
                            $el.attr('data-bind-ref', refName);

                                method = _.bind(method, view);
                                view.$el.on(eventName, '[data-bind-ref=' + refName + ']', method);
                        }
                    }
                });
                deferred.resolve();

            return deferred.promise();
        }
    });

    xin.set('xin.directive.BindDirective', BindDirective);
})(window.xin);