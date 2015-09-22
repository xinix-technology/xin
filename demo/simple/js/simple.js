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

window.Collections = {};
window.namesData = [
    {name: "Athos",      job: "Musketeer"},
    {name: "Porthos",    job: "Musketeer"},
    {name: "Aramis",     job: "Musketeer"},
    {name: "d'Artagnan", job: "Guard"},
    {name: "Farid Hidayat", job: "Guard"},
    {name: "Adoel", job: "Guard"},
    {name: "Putra", job: "Guard"},
    {name: "Ali", job: "Guard"},
    {name: "Wayau", job: "Guard"},
    {name: "Nurdin", job: "Guard"},
    {name: "Dewi", job: "Guard"},
    {name: "Tutud", job: "Guard"}
];

Collections.Search = new Backbone.Collection(namesData);

window.SearchView = xin.ui.View.extend({

    events: _.defaults({
        'keyup form input[type="search"]': 'searchWhileTyping',
        'submit form': 'startSearching',
        'click .buttonSearch': 'buttonSearch',
        'click .buttonClose': 'buttonClose',
        'click .changeBundle': 'changeBundle',
        // 'click .searchResult li': 'toDetail',
        'click .searchResult .toDetail': 'toDetail',
        'click .closeDetail': 'closeDetail'
    }, xin.ui.View.prototype.events),

    _timeThreshold: 600,
    _timeoutThreshold: null,
    timeThreshold: function(callback) {
        clearTimeout(this._timeoutThreshold);
        this._timeoutThreshold = setTimeout(function() {
            if(callback) callback();
        }, this._timeThreshold);
    },

    _isLoading: false,

    collection: Collections.Search,
    search: null,
    limit: 25,
    skip: 0,

    // Manipulation Data
    data: null,
    setData: function(data) {
        this.data = data;
    },

    getData: function(skip, limit) {

        if(!skip && skip !== 0) return [];
        limit = limit || 0;

        var _from = skip,
            _end = skip + limit,
            result = [];

        for (var i = _from; i < _end; i++) {
            var item = this.data[i];
            if(item) {
                result.push(item);
            } else {
                break;
            }
        }

        return result;
    },

    searching: function(search) {

        this.$el.find('[data-region="body"]').addClass('loading');
        var that = this;
        this.search = search;

        if(!this.search) {
            that.searched([]);
        } else {
            var res = _.filter(namesData, function(model){
                return model.name.toLowerCase().indexOf(that.search) > -1;
            });
            that.searched(res);
            // console.log(res);
            // var query = this.query.replace('?', this.search);
            // app.invoke('db.query', query, [], function(res) {
            // });
        }
    },

    searched: function(res) {

        this.$el.find('[data-region="body"]').removeClass('loading');
        this.skip = 0;
        this._isLoading = false;

        if(res.length === 0 || !res || res == []) {
            this.setData([]);
            this.draw([], true);
        }else{
            this.setData(res);
            var data = this.getData(this.skip, this.limit);
            this.draw(data, true);
            this.skip += this.limit;
            this.onScroll();
        }
    },

    draw: function(data, reset) {
        if(reset) {
            this.collection.reset([]); // reset data
            this.$el.find('[data-region="body"]').addClass('empty');
        }
        this.collection.add(data);
    },

    onScroll: function() {

        var that = this;

        this.$el.find('[data-region="body"]').off('scroll').on('scroll', function() {
            var $container = that.$el.find('[data-region="body"]');
            var $content = that.$el.find('.content');
            if ($container.scrollTop() >= ($content.height() - $container.height())) {
                if (!this._isLoading) {

                    app.loading.show('Loading...');
                    that._isLoading = true;

                    $.when((function() {
                        var def = new $.Deferred();
                        setTimeout(function(){

                            var data = that.getData(that.skip, that.limit);
                            that.draw(data);

                            def.resolve();

                        }, 600);
                        return def.promise();
                    })()).done(function() {
                        app.loading.hide();
                        that._isLoading = false;
                        that.skip += that.limit;
                    });
                }
            }

        });
    },

    // User's functions
    searchWhileTyping: function(evt) {
        var that = this;
        this.timeThreshold(function() {
            var text = that.$el.find('input[name="search"]').val();
            if(text !== '') that.searching(text);
            else that.draw([], true);
        });
    },

    startSearching: function() {
        clearTimeout(this._timeoutThreshold);
        var text = this.$el.find('input[name="search"]').val();
        if(text !== '') this.searching(text);
        else this.draw([], true);
    },

    buttonSearch: function() {
        this.$el.find('.searchBar').addClass('searching');
        this.$el.find('input[type="search"]').val(null);
        this.$el.find('input[type="search"]').focus();
        this.$el.find('div[data-region="body"]').css('margin-top','40px');
    },

    buttonClose: function() {
        this.$el.find('.searchBar').removeClass('searching');
        this.$el.find('input[type="search"]').blur();
        this.$el.find('input[type="search"]').val(null);
        this.$el.find('div[data-region="body"]').css('margin-top','0');
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

var Anuku = xin.ui.Outlet.extend({

    events: {
        'click .anuku': 'anuku'
    },

    anuku: function(evt) {
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