(function (root) {
	"use strict";

	root.define([
		"marionette",
		"hbs!/plugins/player/templates/layout",
	], function (Marionette, tmplLayout) {

		var layout = Marionette.Layout.extend({
			template: tmplLayout,
			regions: {
				"mainRegion": "#player-plugin-main-region"
			}
		});

		return layout;
	});

})(this);