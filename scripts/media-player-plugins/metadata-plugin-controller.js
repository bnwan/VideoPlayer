(function (app, _, PluginBaseController) {
    "use strict";    

    var prototype = {
        onMetadataButtonClick: function () {
            if (this.$el.is(":visible")) {
                this.hide();
            } else {
                this.show();
            }
        },

        onInit: function(){
            this.hide();
        },             

        onSizeChanged: function (data) {
            if (data.size === app.constants.playerSize.tiny) {
                this.$el.hide();
            }
        }
    };

    var controller = function (name, el, options) {
        options.templateUrl = "templates/metadata.html";

        function ControllerBase() { }
        ControllerBase.prototype = new PluginBaseController();
        _.extend(ControllerBase.prototype, prototype);

        var f = new ControllerBase();
        f.init(name, el, options);
        return f;
    };    

    app.controllers.MetadataPluginController = controller;

})(window.App, window._, window.App.controllers.PluginBaseController);