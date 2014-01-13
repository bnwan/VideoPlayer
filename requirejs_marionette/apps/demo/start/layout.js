(function (root) {
	"use strict";

	root.define([
		"marionette",
		"hbs!/apps/demo/start/templates/layout"
	], function (Marionette, tmplLayout) {

		var layout = Marionette.Layout.extend({
			template: tmplLayout,
			regions: {
				"mainRegion": "#demo-main-region",
                "sidebarRegion": "#demo-sidebar-region"
			}
		});

		return layout;

	});

})(this);