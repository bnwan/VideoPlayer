(function (root) {
	"use strict";

	root.define([
		"marionette",
		"../apps/demo/start/controller"
	], function (Marionette, StartController) {

		var Router = Marionette.AppRouter.extend({
			appRoutes: {
				"demo": "start"
			}
		});

		var API = {
			start: function () {
				new StartController({
					region: root.App.mainRegion
				});
			}
		};

		new Router({
			controller: API
		});
	});

})(this);