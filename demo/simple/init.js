;(function() {
    "use strict";

    var demo = window.demo = {};
    demo.simple = {};

    var LoginView = xin.ui.Outlet.extend({

        clicked: function(evt) {
            evt.preventDefault();
            alert('axxxx');
        }
    });

    demo.simple.LoginView = LoginView;


    xin.$(function() {
        var app = window.app = new xin.App({
            el: xin.$('body'),
            directives: {
                '[data-role=app]': xin.directive.AppDirective,
                '[data-role]': xin.directive.RoleDirective,
                '[data-uri]': xin.directive.URIDirective,
                '[data-bind]': xin.directive.BindDirective
            },
            providers: {

            }
        });

        window.clicked = function() {
            alert('window context');
        };

        // app.set('clicked', function() {
        //     alert('ini yang dijalankan');
        // });
        app.start();
    });
})();