(function (_, app) {
    "use strict";

    var playerModel = function (options) {

        var defaults = {
            controls: true,
            autoplay: false,
            preload: "auto",
            poster: "",
            loop: false,            
            size: app.constants.playerSize.small,
            src: "",
            type: "video/mp4"
        };

        this.options = _.defaults(options, defaults);        
    };

    app.models.playerModel = playerModel;

})(window._, window.App);