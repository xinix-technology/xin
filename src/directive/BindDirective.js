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
        this.binding = [];
    };

    _.extend(BindDirective.prototype, {

        newRef: function() {
            this.ref = this.ref || 0;
            return 'bind-' + this.ref++;
        },

        matcher: function($el) {
            return $el.data('bind');
        },

        onChanged: function(view, model) {
            // console.log('model:onChanged', arguments);
            view.$('[data-bind-key]').each(function() {
                var $object = xin.$(this),
                    d = $object.data(),
                    val = model.get(d.bindKey);

                if (d.bindTo.indexOf('attr-') === 0) {
                    var attr = d.bindTo.substr(5);
                    $object.attr(attr, val);
                } else {
                    if ($object[0].tagName == 'INPUT') {
                        if ($object.attr('type') == 'checkbox' || $object.attr('type') == 'radio') {
                            $object.attr('checked', val || false);
                        } else {
                            $object.val(val);
                        }
                    } else {
                        $object.html(val);
                    }
                }

            });
        },

        run: function($el) {
            var deferred = xin.Deferred(),
                app = this.app,
                that = this;

            if ($el.data('bindRef')) {
                return deferred.resolve().promise();
            }

            var $elScope = ($el.hasClass('xin-role')) ? $el : $el.parents('.xin-role:not(.xin-layout)'),
                view = $elScope.data('instance');

            var binds = $el.data('bind').trim().split(/\s+/);

            _.each(binds, function(bind) {
                var eventName, refName, method;
                bind = bind.split(':');
                if (bind.length === 1) {
                    bind[1] = bind[0];
                    bind[0] = 'val';
                }

                if (bind[0] == 'val' || (bind[0] || '').indexOf('attr-') === 0) {
                    // FIXME data binding please!!!
                    that.binding[view.cid] = that.binding[view.cid] || [];
                    if (view && view.model) {
                        refName = that.newRef();
                        $el.attr('data-bind-ref', refName).attr('data-bind-to', bind[0]).attr('data-bind-key', bind[1]);

                        method = _.bind(function() {
                            var val = $el.val();
                            if ($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') {
                                val = $el.attr('checked') ? true : false;
                            }
                            this.model.attributes[$el.data('bindKey')] = val;
                            // console.log('set:'+val);
                        }, view);

                        view.model.on('change', _.partial(that.onChanged, view));
                        view.$el.on('change.delegateEvents' + view.cid, '[data-bind-ref=' + refName + ']', method);
                    }
                } else {

                    eventName = bind[0];
                    method = bind[1];
                    if (view && view[method]) {
                        method = view[method];
                    } else {
                        method = that.app.get(method);
                    }
                    if (_.isFunction(method)) {
                        refName = that.newRef();
                        $el.attr('data-bind-ref', refName);

                        if (view && view.delegateEvents) {
                            view.events = _.result(view, 'events') || {};
                            view.events[eventName + ' [data-bind-ref=' + refName + ']'] = method;
                            view.delegateEvents();
                        } else {
                            app.$el.on(eventName, '[data-bind-ref=' + refName + ']', method);
                        }
                    }
                }
            });
            deferred.resolve();

            return deferred.promise();
        }
    });

    xin.set('xin.directive.BindDirective', BindDirective);
})(window.xin);