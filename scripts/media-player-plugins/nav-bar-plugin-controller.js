(function (app, _, PluginBaseController, timelineDriver) {
    "use strict";

    var prototype = {

        onPluginInit: function () {
            this.playerController = this.vent.requestPlayer();
            this.playerController.timelineDriver = timelineDriver;
        },

        onRender: function () {
            this.show();
            this.$el.find(".slider").addClass(this.size);            
        },

        onSizeChanged: function (data) {
            if (data.size === app.constants.playerSize.tiny) {
                this.hide();
            } else {
                this.show();
            }

            this.$el.find(".slider").removeClass(this.size).addClass(data.size);

            if (this.playerController) {
                this.playerController.load();
            }
        },

        onBindEvents: function () {
            setUIElements.call(this);
            initEvents.call(this);
        },

        onSetUIElements: function () {
            setUIElements.call(this);
        },

        onLoadedData: function () {
            initSlider.call(this);

            actions.setCurrentTimeCode.call(this);
            actions.setEndTimeCode.call(this);            
        },

        onPlay: function () {
            actions.playVideo.call(this);
        },

        onPause: function () {
            actions.pauseVideo.call(this);
        },               

        onTimeUpdate: function () {
            
        },
        
        onSetCurrentPosition: function() {
            actions.setCurrentPosition.call(this);            
        },
        
        onVolumeChange: function(cssIcon) {
            actions.setVolume.call(this, cssIcon);
        }
    };

    var setUIElements = function () {
        var self = this;
        this.ui = {
            "$actionMeta": self.$el.find(".action-metadata"),
            "$actionTextSafety": self.$el.find(".action-text-safety"),
            "$actionPlayPause": self.$el.find(".action-play-pause"),
            "$actionPlayPauseIcon": self.$el.find(".action-play-pause i"),
            "$actionStart": self.$el.find(".action-start"),
            "$actionEnd": self.$el.find(".action-end"),
            "$actionVolume": self.$el.find(".action-volume"),
            "$actionFullscreen": self.$el.find(".action-fullscreen"),
            "$currentTimeCode": self.$el.find(".current-time-code"),
            "$endTimeCode": self.$el.find(".end-time-code"),
            "$actionForward": self.$el.find(".action-forward"),
            "$actionBackward": self.$el.find(".action-backward")
            
        };
    };

    var initSlider = function () {
        var self = this;

        var timelineModel = this.playerController.timelineModel;

        this.ui.$progressSlider = this.$el.find(".slider").slider({
            range: "max",
            min: timelineModel.startFrame,
            step: 1,
            max: timelineModel.endFrame,
            value: 0,
            slide: function (event, ui) {
                actions.onSlide.call(self, ui);
            }
        });
    };

    // controller events
    var initEvents = function () {
        var self = this;

        this.ui.$actionMeta.on("click", function () {
            self.vent.trigger("onMetadataButtonClick");
        });

        this.ui.$actionTextSafety.on("click", function () {
            self.vent.trigger("onOverlayButtonClick");
        });

        this.ui.$actionPlayPause.on("click", function () {
            self.playerController.playPause();            
        });

        this.ui.$actionFullscreen.on("click", function () {
            self.playerController.mediaPlayer.requestFullScreen();
        });

        this.ui.$actionStart.on("click", function () {
            self.playerController.setStart();
        });
        
        this.ui.$actionEnd.on("click", function () {
            self.playerController.setEnd();
        });
        
        this.ui.$actionForward.on("click", function () {
            self.playerController.frameForward();
        });
        
        this.ui.$actionBackward.on("click", function () {
            self.playerController.frameBackward();
        });
               
    };

    var actions = {

        playVideo: function () {
            var timelineModel = this.playerController.timelineModel;

            if (this.ui.$progressSlider) {
                                            
                var timecode = this.playerController.timecodeProvider.fromFramesToTimeCodeObject(timelineModel.currentFrame);
                timelineModel.currentSeconds = timecode.totalSeconds;

                this.ui.$progressSlider.slider("option", "value", timelineModel.currentFrame);                          

                if (timelineModel.totalFrames === timelineModel.currentFrame) {
                    this.playerController.pauseVideo();
                }
            }                      

            this.ui.$actionPlayPauseIcon.removeClass("fa-play").addClass("fa-pause");
            actions.setCurrentTimeCode.call(this);
        },
        
        pauseVideo: function () {
            this.ui.$actionPlayPauseIcon.removeClass("fa-pause").addClass("fa-play");
        },
        
        onSlide: function (eleSlider) {
            var timelineModel = this.playerController.timelineModel;
            timelineModel.currentFrame = eleSlider.value;
            
            var timecode = this.playerController.timecodeProvider.fromFramesToTimeCodeObject(eleSlider.value);

            timelineModel.currentSeconds = timecode.totalSeconds;
            
            this.playerController.setCurrentPosition();
        },
        
        setCurrentTimeCode: function () {            
            var timelineModel = this.playerController.timelineModel;                       

            var currentTimeCode = this.playerController.timecodeProvider.fromVideoTimeToTimeCodeObject(timelineModel.currentSeconds);
            this.ui.$currentTimeCode.empty().html(currentTimeCode.toString() + " (" + timelineModel.totalFrames + ")");
        },       

        setEndTimeCode: function () {
            var timelineModel = this.playerController.timelineModel;
            var endTimeCode = this.playerController.timecodeProvider.fromFramesToTimeCodeObject(timelineModel.totalFrames);
            this.ui.$endTimeCode.empty().html(endTimeCode.toString());
        },
        
        setCurrentPosition: function() {
            var timelineModel = this.playerController.timelineModel;
            this.ui.$progressSlider.slider("option", "value", timelineModel.currentFrame);
            actions.setCurrentTimeCode.call(this);
        },
        
        setVolume: function (cssIcon) {            
            this.ui.$actionVolume.find("i").removeClass(cssIcon.oldIcon).addClass(cssIcon.newIcon);
        }
    };

    var controller = function (name, el, options) {
        options.templateUrl = "templates/nav-bar.html";

        function ControllerBase() { }
        ControllerBase.prototype = new PluginBaseController();
        _.extend(ControllerBase.prototype, prototype);

        var f = new ControllerBase();
        f.init(name, el, options);
        return f;
    };

    app.controllers.NavBarPluginController = controller;

})(window.App, window._, window.App.controllers.PluginBaseController, window.App.utility.timelineDriver);