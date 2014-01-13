(function (root) {
    "use strict";

    root.define("player-plugin-controller", [                        
        "app-base-controller",
        "player-options-model",
        "../plugins/player/player_view",
        "../plugins/player/layout"
 ], function (AppBaseController, PlayerOptionsModel, PlayerView, Layout) {

        var controller = AppBaseController.extend({

            onConstructor: function (options) {
                this.options = options;
                this.options.controllerLayout = Layout;
            },

            onInitialize: function () {                
                this.name = "Plugins.Player";               
            },

            onCompose: function () {
                var playerView = new PlayerView({
                    model: PlayerOptionsModel,
                    swfFile: this.options.swfFile
                });

                this.show(playerView, {
                    region: this.layout.mainRegion
                });
            }
        });

        return controller;

    });

})(this);