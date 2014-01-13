(function (root, $, app) {
    "use strict";

    var defaultPlayerSize = app.constants.playerSize.large;    

    var playerModel = new app.models.playerModel({
        size: defaultPlayerSize,     
        src: "",
        type: "video/mp4"
    });

    var timelineModel = new app.models.TimelineModel({        
        frameRate: 30,
        currentFrame: 0,
        currentSeconds: 0,                
        startFrame: 0
    });

    var navBarPlugin = new app.controllers.NavBarPluginController("Nav-Bar-Plugin", ".media-player-nav", {
        size: defaultPlayerSize
    });

    var textSafetyPlugin = new app.controllers.TextSafetyPluginController("Text-Safety-Plugin", ".media-player-text-safety", {
        size: defaultPlayerSize
    });

    var metadataPlugin = new app.controllers.MetadataPluginController("Metadata-Plugin", ".media-player-metadata", {
        size: defaultPlayerSize
    });
    
    var keyboardPlugin = new app.controllers.KeyboardPluginController("Keyboard-Plugin", "", {});

    var videoPlayer = new root.App.controllers.MediaPlayerController("media-player", playerModel, timelineModel, {
        plugins: [
            navBarPlugin,
            textSafetyPlugin,
            metadataPlugin,
            keyboardPlugin
        ]
    });
    app.videoPlayer = videoPlayer;

    $(".action-tiny-player").on("click", function () {
        videoPlayer.changePlayerSize(app.constants.playerSize.tiny);
    });

    $(".action-small-player").on("click", function () {
        videoPlayer.changePlayerSize(app.constants.playerSize.small);
    });

    $(".action-large-player").on("click", function () {
        videoPlayer.changePlayerSize(app.constants.playerSize.large);
    });

    $(".player-controls").on("click", function () {
        var isChecked = $(this).is(":checked");
        videoPlayer.setControls(isChecked);
    });

    $(".player-autoplay").on("click", function () {
        var isChecked = $(this).is(":checked");
        videoPlayer.setAutoPlay(isChecked);
    });

    $(".player-loop").on("click", function () {
        var isChecked = $(this).is(":checked");
        videoPlayer.setLoop(isChecked);
    });

    $(".poster-image").on("blur", function (e) {
        var poster = $(e.currentTarget).val();
        videoPlayer.setPosterImage(poster);
    });

    $(".video-src").on("blur", function (e) {
        var src = $(e.currentTarget).val();
        videoPlayer.setVideoSrc(src);
    });

    $("#btn-set-points").on("click", function () {
        var inPoint = $(".in-point").val();
        var outPoint = $(".out-point").val();        

        videoPlayer.setPoints({
            inPoint: inPoint,
            outPoint: outPoint
        });        
    });

})(window, window.jQuery, window.App);