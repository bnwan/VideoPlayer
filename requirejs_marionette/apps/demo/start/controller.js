(function (root) {
    "use strict";

    root.define([
        "marionette",
        "app-base-controller",
        "messaging",
        "../start/layout",
        "player-plugin-controller",
        "player-options-plugin-controller"
 ], function (
        Marionette,
        AppBaseController,
        Messaging,
        Layout,
        PlayerPluginController,
        PlayerOptionsPluginController) {

        var controller = AppBaseController.extend({

            onConstructor: function (options) {
                this.options = options;
                this.options.controllerLayout = Layout;
            },

            onInitialize: function () {
                this.name = "Demo.Start";
            },

            onCompose: function () {
                new PlayerPluginController({
                    region: this.layout.mainRegion,
                    swfFile: "video-js.swf"
                });
                
                new PlayerOptionsPluginController({
                   region: this.layout.sidebarRegion
                });
            }
        });

        return controller;

    });
})(this);