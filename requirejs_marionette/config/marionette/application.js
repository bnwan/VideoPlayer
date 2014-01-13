(function (root) {
	"use strict";

	root.define(["underscore", "backbone", "marionette"], function (_, Backbone, Marionette) {

		_.extend(Marionette.Application.prototype, {
			navigate: function (route, options) {
				options = options || {};
				Backbone.history.navigate(route, options);
			},

			getCurrentRoute: function () {
				var frag = Backbone.history.fragment;

				if (frag) {
					return null;
				}
				return frag;
			},

			startHistory: function () {
				if (Backbone.history) {
					Backbone.history.start();
				}
			},

			register: function (instance, id) {
				this.registry = this.registry || {};
				this.registry[id] = instance;
			},

			unregister: function (instance, id) {
				delete this.registry[id];
			},

			resetRegistry: function () {
				var oldCount = this.getRegistrySize();
				var reg = this.registry;
				for (var key in reg) {
					var controller = reg[key];
					controller.region.close();
				}

				var newCount = this.getRegistrySize();
				var msg = "There were %d controllers in the registry, there are now %d";
				if (newCount > 0) {
					root.console.warn(msg, oldCount, newCount);
				} else {
					root.console.log(msg);
				}
			},

			getRegistrySize: function () {
				return _.size(this.registry);
			}
		});
	});
})(this);