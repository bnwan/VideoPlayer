
(function (_, app) {
    "use strict";

    var timelineModel = function (options) {

        var defaults = {
            frameRate: 25,
            currentFrame: 0,
            currentSeconds: 0,
            totalFrames: 125,
            isForwardPlay: true,
            startFrame: 0,
            endFrame: 125,
            startSeconds: 0,
            endSeconds: 5
            
        };               

        return _.defaults(options, defaults);
    };

    app.models.TimelineModel = timelineModel;

})(window._, window.App);