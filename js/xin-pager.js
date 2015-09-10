/**
 * Copyright (c) 2015 Xinix Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function(root) {

  var xin = root.xin;

  xin.Component({
    is: 'xin-pager',

    transform: function(transform, node) {
      node = node || this;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    },

    add: function(element) {
      this.views = this.views || [];
      this.views.push(element);
    },

    setFocus: function(element) {
      var index = this.views.indexOf(element);
      var oldIndex = -1;
      if (this.focused$) {
        oldIndex = this.views.indexOf(this.focused$);
      }

      var focused$ = this.focused$;

      if (oldIndex < 0) {
        // console.log('first');

        this.transform('translateX(0)', element);

        element.setVisible(true);
        element.setFocus(true);
      } else if (oldIndex < index) {
        this.transform('translateX(100%)', element);

        element.setVisible(true);

        setTimeout(function() {
          focused$.classList.add('animate');
          element.classList.add('animate');

          // console.log('animate to left');

          this.transform('translateX(-100%)', focused$);
          this.transform('translateX(0)', element);

          var toLeftTransitionEnd = function() {
            // console.log('toLeftTransitionEnd');

            element.removeEventListener('transitionend', toLeftTransitionEnd);
            element.removeEventListener('webkitTransitionEnd', toLeftTransitionEnd);
            element.removeEventListener('mozTransitionEnd', toLeftTransitionEnd);
            element.removeEventListener('msTransitionEnd', toLeftTransitionEnd);
            element.removeEventListener('oTransitionEnd', toLeftTransitionEnd);

            focused$.classList.remove('animate');
            element.classList.remove('animate');

            focused$.setFocus(false);
            focused$.setVisible(false);

            element.setFocus(true);
          }.bind(this);

          element.addEventListener('transitionend', toLeftTransitionEnd, false);
          element.addEventListener('webkitTransitionEnd', toLeftTransitionEnd, false);
          element.addEventListener('mozTransitionEnd', toLeftTransitionEnd, false);
          element.addEventListener('msTransitionEnd', toLeftTransitionEnd, false);
          element.addEventListener('oTransitionEnd', toLeftTransitionEnd, false);

        }.bind(this), 50);
      } else if (oldIndex > index) {
        this.transform('translateX(-100%)', element);

        element.setVisible(true);

        setTimeout(function() {
          focused$.classList.add('animate');
          element.classList.add('animate');

          // console.log('animate to right');

          this.transform('translateX(100%)', focused$);
          this.transform('translateX(0)', element);

          var toRightTransitionEnd = function() {
            // console.log('toRightTransitionEnd');

            element.removeEventListener('transitionend', toRightTransitionEnd);
            element.removeEventListener('webkitTransitionEnd', toRightTransitionEnd);
            element.removeEventListener('mozTransitionEnd', toRightTransitionEnd);
            element.removeEventListener('msTransitionEnd', toRightTransitionEnd);
            element.removeEventListener('oTransitionEnd', toRightTransitionEnd);

            focused$.classList.remove('animate');
            element.classList.remove('animate');

            focused$.setFocus(false);
            focused$.setVisible(false);

            element.setFocus(true);
          }.bind(this);

          element.addEventListener('transitionend', toRightTransitionEnd, false);
          element.addEventListener('webkitTransitionEnd', toRightTransitionEnd, false);
          element.addEventListener('mozTransitionEnd', toRightTransitionEnd, false);
          element.addEventListener('msTransitionEnd', toRightTransitionEnd, false);
          element.addEventListener('oTransitionEnd', toRightTransitionEnd, false);
        }.bind(this), 50);
      }

      this.focused$ = element;
    }
  });
})(this);