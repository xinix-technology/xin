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

    var page = document.body,
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
        // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        lastWidth = 0;

    /**
     * xin.detect
     *
     */
    xin.set('xin.detect', {
        ua: ua,
        iphone: iphone,
        ipad: ipad,
        ios: ios,
        fullscreen: fullscreen,
        android: android
    });

    // TODO reekoheek: move below lines to global or application init as single
    // function
    if (android) {
        // Android's browser adds the scroll position to the innerHeight, just to
        // make this really fucking difficult. Thus, once we are scrolled, the
        // page height value needs to be corrected in case the page is loaded
        // when already scrolled down. The pageYOffset is of no use, since it always
        // returns 0 while the address bar is displayed.
        window.onscroll = function() {
            page.style.height = window.innerHeight + 'px';
        };
    }


    var setupScroll = window.onload = function() {
    // Start out by adding the height of the location bar to the width, so that
    // we can scroll past it
    if (ios) {
        // iOS reliably returns the innerWindow size for documentElement.clientHeight
        // but window.innerHeight is sometimes the wrong value after rotating
        // the orientation
        var height = document.documentElement.clientHeight;
        // Only add extra padding to the height on iphone / ipod, since the ipad
        // browser doesn't scroll off the location bar.
        if (iphone && !fullscreen) height += 60;
            page.style.height = height + 'px';
        } else if (android) {
            // The stock Android browser has a location bar height of 56 pixels, but
            // this very likely could be broken in other Android browsers.
            page.style.height = (window.innerHeight + 56) + 'px';
        }
        // Scroll after a timeout, since iOS will scroll to the top of the page
        // after it fires the onload event
        setTimeout(scrollTo, 0, 0, 1);
    };
    window.onresize = function() {
        var pageWidth = page.offsetWidth;
        // Android doesn't support orientation change, so check for when the width
        // changes to figure out when the orientation changes
        if (lastWidth == pageWidth) return;
        lastWidth = pageWidth;
        setupScroll();
    };
    window.onresize();
})(window.xin);