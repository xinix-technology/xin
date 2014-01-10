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
     * xin.directive.RoleDirective
     */
    var RoleDirective = function(app) {
        this.app = app;
    };

    _.extend(RoleDirective.prototype, {
        matcher: function($el) {
            if ($el.data('role') && ($el.data('role').toLowerCase() !== 'app')) {
                return true;
                // var role = $el.data('role').toLowerCase();
                // if (role.substr(0, 5) !== 'list-') {
                //     return true;
                // }

            }
        },
        run: function($el) {
            var deferredRules = [],
                deferred = new xin.Deferred(),
                app = this.app,
                options,
                role;

            if ($el.data('instantiated')) {
                return deferred.resolve().promise();
            }

            options = _.defaults($el.data(), {
                el: $el,
                app: app
            });
            role = options.role;

            // TODO: reekoheek, there was a reason why options.role should be
            // deleted
            // delete options.role;

            _.each(options, function(option, key) {
                if (typeof option == 'string') {

                    option = key + ':' + option;
                    var promise = app.resolve(option).then(function(data) {
                        options[key] = data;
                    });

                    deferredRules.push(promise);
                }

            });

            xin.$.when.apply(null, deferredRules).done(function() {
                app.resolve(role, options).done(function(instance) {
                    if (!instance) {
                        throw new Error('Role: "' + role + '" undefined');
                    }
                    var $el = instance.$el,
                        $parent;

                    if ($el) {
                        $parent = $el.parent('.xin-role');

                        $el.attr('data-instantiated', true)
                            .data('instance', instance)
                            .attr('data-cid', instance.cid);

                        if ($parent.length) {
                            var parent = $parent.data('instance');
                            if (parent.addChild) {
                                parent.addChild(instance);
                            }
                        }
                    }
                    if (instance instanceof Backbone.View) {
                        instance.app = instance.options.app;
                        instance.$el.addClass('xin-role');
                        if (!instance.isContainer) {
                            instance.$el.addClass('xin-view');
                        }
                        instance.render();
                    }
                    deferred.resolve();
                }).fail(function() {
                    console.log(arguments);
                });
            });

            return deferred.promise();
        }
    });

    xin.set('xin.directive.RoleDirective', RoleDirective);
})(window.xin);