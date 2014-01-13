(function (root) {
    "use strict";

    root.define([
        "model-base",
        "constants"
    ], function (ModelBase, Constants) {

        var PlayerOptionsModel = ModelBase.extend({
           defaults: {               
               controls: true,
               autoplay: false,
               preload: "auto",
               poster: "",               
               loop: false               
           },

           initialize: function () {
               this.set(Constants.playerSizes.small);
           }
        });

        return new PlayerOptionsModel();

    });

})(this);