(function (app, _, PluginBaseController) {
    "use strict";

    var prototype = {

        onOverlayButtonClick: function () {
            if (this.$el.is(":visible")) {
                this.hide();
            } else {
                this.show();
            }
        },

        onInit: function () {
            this.hide();
        }
    };

    var controller = function (name, el, options) {

        function ControllerBase() { }
        ControllerBase.prototype = new PluginBaseController(name, el, options);
        _.extend(ControllerBase.prototype, prototype);

        var f = new ControllerBase();
        f.init(name, el, options);
        return f;

    };

    app.controllers.TextSafetyPluginController = controller;

})(window.App, window._, window.App.controllers.PluginBaseController);