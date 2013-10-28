(function() {

    "use strict";

    window.xin = window.xin || {};

    if (window.Zepto) {
        Deferred.installInto(window.xin);
        if (!$.Deferred) {
            Deferred.installInto($);
        }
        $.fn.detach = $.fn.remove;
    }

    $.fn.serializeObject = function() {
        var form = {};
        _.each($(this).serializeArray(), function(value) {
            form[value.name] = value.value;
        });
        return form;
    };

})();