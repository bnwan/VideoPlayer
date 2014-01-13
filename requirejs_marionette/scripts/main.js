(function (root) {
	"use strict";

	root.require.config({
		locale: "en_gb",
		hbs: {
			templateExtension: "html",
			// if disableI18n is `true` it won't load locales and the i18n helper
			// won't work as well.
			disableI18n: true
		},
		paths: {
			"jquery": "../components/jquery/jquery",
			"underscore": "../components/underscore-amd/underscore",
			"backbone": "../components/backbone-amd/backbone",
			"marionette": "../components/backbone.marionette/lib/core/amd/backbone.marionette",
			"backbone.wreqr": "../components/backbone.wreqr/lib/amd/backbone.wreqr",
			"backbone.babysitter": "../components/backbone.babysitter/lib/amd/backbone.babysitter",
			"bootstrap": "../components/less-bootstrap/dist/js/bootstrap",
			"hbs": "../components/require-handlebars-plugin/hbs",
			"handlebars": "../components/require-handlebars-plugin/Handlebars",
			"hbs/underscore": "../components/underscore-amd/underscore",
			"i18nprecompile": "../components/require-handlebars-plugin/hbs/i18nprecompile",
			"json2": "../components/require-handlebars-plugin/hbs/json2",   
			"videojs": "/components/video-js/video",
            "mixins": "/config/underscore/mixins",
			"application": "/config/marionette/application",
            "model-base": "/entities/base/model",
            "player-options-model": "/entities/player_options",
            "model-collection": "/entities/base/collection",
			"base-controller": "/controllers/base_controller",
			"app-base-controller": "/controllers/app_base_controller",
			"demo-app": "/apps/demo/router",
			"player-plugin-controller": "/plugins/player/controller",
			"player-options-plugin-controller": "/plugins/player_options/controller",
            "constants": "/config/constants"
		},
		shim: {		   
			"bootstrap": {
				deps: ["jquery"],
				exports: "jquery"
			}
		}
	});

	root.require([
		"app",
	], function (App) {
		root.App = App;
		App.start();
	});
        
})(this);