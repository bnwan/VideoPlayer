(function (root) {
    "use strict";

    root.define([
        "marionette",
        "hbs!/plugins/player_options/templates/options_view",
        "player-options-model",
        "constants"
    ], function (Marionette, tmplOptionsView, PlayerOptionsModel, Constants) {

        var view = Marionette.ItemView.extend({
            template: tmplOptionsView,

            events: {
                "click .action-tiny-player": "showTinyPlayer",
                "click .action-small-player": "showSmallPlayer",
                "click .action-large-player": "showLargePlayer"
            },

            showTinyPlayer: function () {
                PlayerOptionsModel.set(Constants.playerSizes.tiny);
            },

            showSmallPlayer: function () {
                PlayerOptionsModel.set(Constants.playerSizes.small);
            },

            showLargePlayer: function () {
                PlayerOptionsModel.set(Constants.playerSizes.large);
            },


        });

        return view;

    });

})(this);