(function ($, _, app) {
    "use strict";

    var loader = {
        load: function (template, cb) {
            $.when($.ajax(template)).then(function (data, textStatus, jqXHR) {
                loaderCallback(data, textStatus, jqXHR, cb);
            });
        }
    };

    // function signature: data, textStatus, jqXHR, cb (callback)
    var loaderCallback = function (data, textStatus, jqXHR, cb) {
        if (jqXHR.status === 200 || jqXHR.status === 304) {
            if (_.isFunction(cb)) {
                cb(data);
            }
        } else {
            throw new Error(jqXHR.error);
        }
    };

    app.utility.templateLoader = loader;

})(window.jQuery, window._, window.App);