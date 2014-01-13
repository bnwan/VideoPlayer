(function (root) {
	"use strict";

	root.define("base-controller", [		
		"underscore",
		"backbone",
		"marionette",
		"messaging"
	], function (_, Backbone, Marionette, Messaging) {

		var base = Backbone.Marionette.Controller.extend({
			constructor: function (options) {
				this.region = options.region || Messaging.reqres.request("default:region");
				this.instanceId = _.uniqueId("controller");
				Messaging.commands.execute("register:instance", this, this.instanceId);

				Marionette.Controller.prototype.constructor.call(this, options);
			},

			close: function () {
				this.region.close();
				Messaging.commands.execute("unregister:instance", this, this.instanceId);
			},

			show: function (view, options) {
				options = options || {};

				_.defaults(options, {
					loading: false,
					region: this.region
				});

				this.setMainView(view);
				this.manageView(view, options);
			},

			setMainView: function (view) {
				if (this.mainView) {
					return;
				}
				this.mainView = this;
				this.listenTo(view, "close", this.close);
			},

			manageView: function (view, options) {
				if (options.loading) {
					Messaging.commands.execute("show:loading", view, options);
				} else {
					options.region.show(view);
				}
			}
		});

		return base;

	});

})(this);