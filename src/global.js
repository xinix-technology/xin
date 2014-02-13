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

window.xin = (function() {
    "use strict";

    /**
     * xin global namespace
     * @type Object
     */
    var xin = {

        /**
         * Set object to xin namespace
         * @param String    ns         Namespace
         * @param mixed     object     Object to set to namespace
         *
         */
        set: function(ns, object) {
            var tokens,
                lastToken,
                nsObject = this;

            if (ns.substr(0, 4) !== 'xin.') {
                throw new Error('Namespace not accepted, should be prefixed with "xin."');
            }
            tokens = ns.substr(4).split('.');
            lastToken = tokens[tokens.length - 1];

            for(var i in tokens) {
                var token = tokens[i];

                if (token === lastToken) {
                    nsObject[token] = object;
                } else {
                    nsObject[token] = nsObject[token] || {};
                }

                nsObject = nsObject[token];
            }
        },

        htmlDecode: function(input){
            return input.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }

    };

    // If application using Zepto (you can also use jQuery to substitute Zepto)
    if (window.jQuery) {
        xin.when = jQuery.when;
        xin.Deferred = jQuery.Deferred;
        // TODO reekoheek: please copy references of Deferred<fn|con>,
        // when<fn>, etc to xin namespace object.
        xin.$ = jQuery;
    } else if (window.Zepto) {
        Deferred.installInto(xin);
        if (!Zepto.Deferred) {
            Deferred.installInto(Zepto);
        }
        xin.$ = Zepto;
    }

    // Add reference Zepto.fn.detach with Zepto.fn.remove
    if (window.Zepto) {
        xin.$.fn.detach = xin.$.fn.remove;
    }

    (function() {
        /**
         * Function to serializing form as object
         * @return object Object serialization of form
         */
        xin.$.fn.serializeObject = function() {
            var form = {};
            _.each(xin.$(this).serializeArray(), function(value) {
                form[value.name] = value.value;
            });
            return form;
        };
    })();

    (function(old) {
        _.template = function(text, data) {
            var r = old.apply(this, arguments);

            if (!data)  {
                r.text = text;
            }
            return r;
        };
    })(_.template);

    (function(old) {
        xin.$.fn.attr = function() {
            if(arguments.length === 0) {
                if(this.length === 0) {
                    return null;
                }

                var obj = {};
                xin.$.each(this[0].attributes, function() {
                    if(this.specified) {
                        obj[this.name] = this.value;
                    }
                });
                return obj;
            }

            return old.apply(this, arguments);
        };
    })(xin.$.fn.attr);

    return xin;

})();