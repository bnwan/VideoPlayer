(function (root) {
	"use strict";

	root.define([
		"marionette",
		"messaging",
		"application"
	], function (Marionette, Messaging) {

		var App = new Marionette.Application();

		App.addRegions({
			headerRegion: "#header-region",
			footerRegion: "#footer-region",            
			mainRegion: "#main-region"
		});

		App.rootRoute = "demo";

		Messaging.reqres.setHandler("default:region", function () {
			return App.mainRegion;
		});		

		Messaging.commands.setHandler("register:instance", function (instance, id) {
			App.register(instance, id);
		});

		Messaging.commands.setHandler("unregister:instance", function (instance, id) {
			App.unregister(instance, id);
		});

		Messaging.commands.setHandler("reset:controller:registry", function () {
			App.resetRegistry();
		});

		Messaging.reqres.setHandler("registry", function () {
			return App.registry;
		});

		App.on("initialize:after", function () {
			var self = this;

			root.require(["demo-app"], function () {
				self.startHistory();

				if (!self.getCurrentRoute()) {
					self.navigate(self.rootRoute, {
						trigger: true
					});
				}
			});
		});

		return App;
	});

})(this);