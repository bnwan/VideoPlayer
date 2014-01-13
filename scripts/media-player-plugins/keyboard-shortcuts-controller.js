(function (app, mousetrap, _, PluginBaseController) {
    "use strict";


    var prototype = {
        
        onInit: function () {
            this.hide();

            //initialize keyborad shortcuts
            initShortcuts.call(this);            
        },
        
        onPluginInit: function () {
            this.playerController = this.vent.requestPlayer();
        }
    };

    var initShortcuts = function () {

        var self = this;

        //play video forward
        mousetrap.bind(["l", "space"], function () {
            self.playerController.playPause();
            return false;
        });
        
        //volume up     
        mousetrap.bind("ctrl+up", function () {
            self.playerController.volumeUp();
            return false;
        });

        //volume down
        mousetrap.bind("ctrl+down", function () {
            self.playerController.volumeDown();
            return false;
        });
        
        //Video Start     
        mousetrap.bind("ctrl+left", function () {
            self.playerController.setStart();
            return false;
        });
        
        //Video End     
        mousetrap.bind("ctrl+right", function () {
            self.playerController.setEnd();
            return false;
        });
        
        //Frame Back     
        mousetrap.bind("left", function () {
            self.playerController.frameBackward();
            return false;
        });
        
        //Frame Back     
        mousetrap.bind("right", function () {
            self.playerController.frameForward();
            return false;
        });
    };

    var controller = function (name, el, options) {
        
        options.templateUrl = "";

        function ControllerBase() { }
        ControllerBase.prototype = new PluginBaseController(name, el, options);
        _.extend(ControllerBase.prototype, prototype);

        var f = new ControllerBase();
        f.init(name, el, options);
        return f;

    };

    app.controllers.KeyboardPluginController = controller;

})(window.App, window.Mousetrap, window._, window.App.controllers.PluginBaseController);
