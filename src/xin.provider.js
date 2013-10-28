(function() {

    "use strict";

    window.xin = window.xin || {};

    var ProviderRepository = function(app) {
        this.app = app;
        this.providers = [];
    };

    _.extend(ProviderRepository.prototype, {
        add: function(provider) {
            if (!provider) {
                throw new Error('Provider not found or invalid!');
            }
            if (typeof provider == 'function') {
                var Provider = provider;
                provider = new Provider();
            }
            this.providers.push(provider);
        },

        initialize: function() {
            var app = this.app,
                promise = null;

            _.each(this.providers, function(provider) {
                if (!promise) {
                    promise = provider.initialize(app);
                } else {
                    promise = promise.then(function() {
                        return provider.initialize(app);
                    });
                }
            });

            if (!promise) {
                promise = $.Deferred().resolve().promise();
            }

            return promise;
        }
    });

    window.xin.ProviderRepository = ProviderRepository;

})();