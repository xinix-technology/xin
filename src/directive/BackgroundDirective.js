/**
* Background Directive
*
* MIT LICENSE
*
* Copyright (c) 2015 PT Sagara Xinix Solusitama - Xinix Technology
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
* @author Farid Hidayat <e.faridhidayat@gmail.com>
* @copyright 2015 PT Sagara Xinix Solusitama
*/

;(function(xin) {
    "use strict";

    /**
     * xin.directive.BackgroundDirective
     *
     * Directive to initialize xin application context
     *
     */
    var BackgroundDirective = function(app) {
        this.app = app;
    };

    _.extend(BackgroundDirective.prototype, {

        /**
         * Matching to [data-role=app]
         *
         * @param  $DOM     $el Dom node(s) representation (jQuery|Zepto)
         * @return Promise
         */
        matcher: function($el) {
            return $el.data('background');
        },

        /**
         * If match instantiating xin application context
         *
         * @param  $DOM $el Dom node(s) representation
         * @return Promise
         */
        run: function($el) {
            var deferred = xin.Deferred();
            $el.css('background', $el.data('background'));
            // $el.attr('data-instantiated', true).addClass('xin-role').data('instance', this.app);
            deferred.resolve();

            return deferred.promise();
        }
    });

    xin.set('xin.directive.BackgroundDirective', BackgroundDirective);

})(window.xin);