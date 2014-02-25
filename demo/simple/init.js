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
            if (location.hash != '#login' && !sessionStorage['username']) {
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
                '[data-value]': ValueDirective
            },
            middlewares: [
                // AuthMiddleware
            ],
            providers: {

            }
        });

        app.router.route('anu', function() {
            alert('anu');
        });

        // app.set('clicked', function() {
        //     alert('ini yang dijalankan');
        // });
        app.start();
    });
})();