var listData = new Backbone.Collection([
    { username: 'anes', age: 32 },
    { username: 'reeko', age: 17 },
    { username: 'jafar', age: 40 }
]);

var Form = Backbone.View.extend({
    // events: {
    //     'click .click': 'doClick'
    // },

    doClick: function(evt) {
        evt.preventDefault();
        alert('telah diklik');
    },
    doClick2: function(evt) {
        evt.preventDefault();
        alert('telah diklik 2');
    },
    render: function() {
        this.$el.append('<input type="text" />');
        this.$el.append('<input type="text" />');
        this.$el.append('<input type="text" />');
        return this;
    }
});

var anu = {
    ui: {
        Form: Form
    }
};

var simple = {},
    anuan = {};

var Anu = simple.Anu = xin.ui.Outlet.extend({
    doAnu: function(evt) {
        evt.preventDefault();
        alert('xxxx');
    }
});

simple.Anu.model = new Backbone.Model({
    name: 'Anu',
    alias: 'Gemes',
    age: 99
});

anuan.model = new Backbone.Model({
    name: 'someone',
    age: 17
});

;(function() {
    "use strict";

    var demo = window.demo = {};
    demo.simple = {};

    var LoginView = xin.ui.Outlet.extend({

        clicked: function(evt) {
            evt.preventDefault();
        }
    });

    var ValueDirective = function() {

    };

    _.extend(ValueDirective.prototype, {
        matcher: function($el) {
            return $el.data('value');
        },

        run: function($el) {
            $el.html($el.data('value'));
        }
    });

    demo.simple.LoginView = LoginView;

    window.AuthMiddleware = function() {
    };

    _.extend(AuthMiddleware.prototype, {
        call: function(a) {
            var d = xin.Deferred();
            if (location.hash != '#login' && !sessionStorage.getItem('username')) {
                location.hash = '#login';
                d.reject();
            } else {
                d.resolve();
            }
            return d.promise();

        }
    });

    xin.$(function() {
        var app = window.app = new xin.App({
            el: xin.$('body'),
            directives: {
                '[data-role=app]': xin.directive.AppDirective,
                '[data-role]': xin.directive.RoleDirective,
                '[data-uri]': xin.directive.URIDirective,
                '[data-bind]': xin.directive.BindDirective,
                '[data-value]': ValueDirective,
                '[data-background]': xin.directive.BackgroundDirective
            },
            middlewares: {
                // AuthMiddleware
            },
            providers: {

            }
        });

        app.router.route('anu', function() {
            alert('anu');
        });

        // app.set('clicked', function() {
        //     alert('ini yang dijalankan');
        // });
        app.start().done(function() {
            setTimeout(function() {
                $('body').show();
            }, 100);
        });
    });
})();