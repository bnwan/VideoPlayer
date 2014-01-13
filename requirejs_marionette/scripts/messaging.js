(function (root) {
	"use strict";

	root.define("messaging", ["backbone.wreqr"], function (Wreqr) {
		return {
			vent: new Wreqr.EventAggregator(),
			reqres: new Wreqr.RequestResponse(),
			commands: new Wreqr.Commands()
		};
	});

})(this);