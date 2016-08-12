(function(root) {

  var xin = root.xin;

  xin.Component({
    is: 'xin-pager',

    add: function(element) {
      this.views = this.views || [];
      this.views.push(element);

      // if (!element.transitionFx) {
      //   element.transitionFx = new xin.Fx(element, 'none');
      // }
    },

    setFocus: function(element) {
      var index = this.views.indexOf(element);
      var oldIndex = -1;
      if (this.focused$) {
        oldIndex = this.views.indexOf(this.focused$);
      }

      var focused$ = this.focused$;

      if (oldIndex < index) {
        this._transitionForward(focused$, element);
      } else if (oldIndex > index) {
        this._transitionBackward(focused$, element);
      }

      this.focused$ = element;
    },

    _transitionBackward: function(prevEl, nextEl) {
      Promise.all([
        prevEl.transitionFx.play('out', -1),
        nextEl.transitionFx.play('in', -1),
      ]).then(function() {
        prevEl.setVisible(false);
        prevEl.setFocus(false);
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;
      }.bind(this));
    },

    _transitionForward: function(prevEl, nextEl) {
      if (!prevEl) {
        (new xin.Fx(nextEl, 'none')).play('in', 1).then(function() {
          nextEl.setVisible(true);
          nextEl.setFocus(true);
          this.$focused = nextEl;
        }.bind(this));
      } else {
        Promise.all([
          prevEl.transitionFx.play('out', 1),
          nextEl.transitionFx.play('in', 1)
        ]).then(function() {
          prevEl.setVisible(false);
          prevEl.setFocus(false);
          nextEl.setVisible(true);
          nextEl.setFocus(true);
          this.$focused = nextEl;
        }.bind(this));
      }
    }
  });
})(this);
