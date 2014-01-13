(function (root) {
    "use strict";

    root.define([
        "underscore"
    ], function (_) {

        _.mixin({

            saveToSessionStore: function (key, value) {
                sessionStorage.setItem(key, value);
            },

            getFromSessionStore: function (key) {
                return sessionStorage.getItem(key);
            },

            removeFromSessionStore: function (key) {
                sessionStorage.removeItem(key);
            }

        });

    })

})(this);