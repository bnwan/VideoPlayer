(function (root) {
	"use strict";

	root.define([		
		"underscore",
		"backbone",		
		"messaging",
		"base-controller"
	], function (_, Backbone, Messaging, BaseController) {

		var API = {
			getLayoutModel: function () {
				var apps = Messaging.reqres.request("app:entities");
				var app = _.find(apps.models, function (a) {
					return a.get("url") === Backbone.history.fragment;
				});

				return app;
			}
		};

		var appBase = BaseController.extend({

			constructor: function (options) {
				if (this.onConstructor) {
					this.onConstructor(options);
				}
				
				this.model = options.model;
				this.collection = options.collection;

				BaseController.prototype.constructor.call(this, options);
			},

			initialize: function (options) {
				if (this.onInitialize) {
					this.onInitialize(options);
				}

				//this.layoutModel = API.getLayoutModel();
				this.layout = this.getLayoutView();

				this.listenTo(this.layout, "show", function () {
					this.compose();
				});

				this.show(this.layout);
			},

			compose: function () {
				if (this.onCompose) {
					this.onCompose();
				}
			},

			getLayoutView: function () {
				return new this.options.controllerLayout({
					model: this.layoutModel
				});
			}
		});

		Messaging.reqres.setHandler("app:model", function () {
			return API.getLayoutModel();
		});

		return appBase;
	});

})(this);