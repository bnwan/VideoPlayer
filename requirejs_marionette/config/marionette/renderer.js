(function (root) {
	"use strict";

	root.define(["marionette"], function (Marionette) {
		Marionette.Renderer.render = function (template, data) {
			return template(data);
		};
	});
})(this);