(function(root){
    "use strict";
    
    
    root.define("player-options-plugin-controller", [
        "underscore",		
		"marionette",
		"messaging",
		"app-base-controller",
		"../plugins/player_options/options_view",
		"../plugins/player_options/layout"
    ], function(_, Marionette, Messaging, AppBaseController, OptionsView, Layout){
        
        var controller = AppBaseController.extend({

			onConstructor: function (options) {
				this.options = options;
				this.options.controllerLayout = Layout;
			},

			onInitialize: function () {
				this.name = "Plugins.PlayerOptions";
			},

			onCompose: function () {
				this.show(new OptionsView(), {
					region: this.layout.mainRegion
				});
			}
		});

		return controller;
        
    });
    
})(this);