(function (root, $, _, app) {
    "use strict";

    var prototype = {
        init: function (playerId, model, timelineModel, options) {

            var self = this;

            self.playerId = playerId;
            self.jPlayerId = "#" + playerId;
            self.model = model;
            self.$playerContainer = $(self.jPlayerId).parent();
            self.$playerNav = self.$playerContainer.find(".media-player-nav");            
            self.options = options;

            self.timelineModel = timelineModel;
            self.timecodeProvider = new app.utility.TimeCode(self.timelineModel.frameRate);

            // init plugins collection
            self.pluginCommander = {
                plugins: options.plugins
            };
            //self.initPlugins.apply(this);

            var initSize = function (size, player) {
                self.model.options.size = size;
                $(player.el()).addClass(size);
                self.changePlayerSize(size);
            };

            var initPoints = function () {
                if (!self.model.options.points) {
                    self.model.options.points = {
                        inPoint: 2,
                        outPoint: 2
                    };
                }
            };

            var setUpPlayer = function () {
                // set up player options
                root.videojs(self.playerId, self.model.options, function () {
                    self.mediaPlayer = this;                   

                    self.initPlugins.apply(self);

                    this.usingNativeControls(true);

                    this.src({ type: self.model.options.type, src: self.model.options.src });

                    initSize(self.model.options.size, this);

                    setUpPlayerEvents();

                    this.bigPlayButton.hide();
                    this.loadingSpinner.show();
                });
            };

            var setUpPlayerEvents = function () {

                // Fired when the player has downloaded data at the current playback position
                self.mediaPlayer.on("loadeddata", function () {
                    var timecode = self.timecodeProvider.fromVideoTimeToTimeCodeObject(this.duration());
                    self.timelineModel.endFrame = timecode.totalFrames;
                    self.timelineModel.endSeconds = timecode.totalSeconds;
                    self.timelineModel.totalFrames = timecode.totalFrames;
                    self.timelineModel.totalSeconds = timecode.totalSeconds;

                    initPoints();
                    self.onLoadedData();
                });

                // Fired when the current playback position has changed
                self.mediaPlayer.on("timeupdate", function () {
                    self.onTimeUpdate();
                });

                self.mediaPlayer.on("fullscreechange", function () {
                    self.onFullscreen();
                });

                self.mediaPlayer.on("end", function () {
                    self.onEnd();
                });
            };

            setUpPlayer();

        },

        // initialize plugins
        initPlugins: function () {
            var self = this;

            self.pluginCommander.trigger = function (command, data) {
                _.each(this.plugins,
                    function (plugin) {
                        if (plugin[command]) {
                            plugin[command](data);
                        }
                    });
            };

            self.pluginCommander.requestPlayer = function () {
                return self;
            };

            _.each(self.pluginCommander.plugins,
                function (plugin) {
                    plugin.vent = self.pluginCommander;
                    if (plugin.onPluginInit) {
                        plugin.onPluginInit();
                    }
                });
        },

        onLoadedData: function () {

            this.mediaPlayer.loadingSpinner.hide();
            this.mediaPlayer.bigPlayButton.show();

            this.pluginCommander.trigger("onLoadedData");
        },

        playPause: function () {
            var self = this;

            this.mediaPlayer.bigPlayButton.hide();

            if (this.mediaPlayer.paused()) {

                if (self.timelineModel.currentFrame === self.timelineModel.totalFrames) {
                    self.timelineModel.currentFrame = self.timelineModel.startFrame;
                    self.timelineModel.currentSeconds = self.timelineModel.startSeconds;
                    self.mediaPlayer.currentTime(self.timelineModel.startSeconds);
                }

                this.timelineDriver.playVideo(this.timelineModel, null, function () {
                    self.pluginCommander.trigger("onPlay");

                });
                self.mediaPlayer.play();
            } else {
                this.pauseVideo();
            }
        },

        pauseVideo: function () {
            this.timelineDriver.pauseVideo();
            this.mediaPlayer.pause();            
            this.pluginCommander.trigger("onPause");
        },

        onPause: function () {
            this.pluginCommander.trigger("onPause");
        },

        onFullscreen: function () {

        },

        onTimeUpdate: function () {

        },

        onEnd: function () {
            this.mediaPlayer.pause();
        },

        changePlayerSize: function (size) {

            if (size === app.constants.playerSize.tiny) {
                this.mediaPlayer.controlBar.fullscreenToggle.hide();
                this.mediaPlayer.controlBar.volumeControl.hide();
                this.mediaPlayer.controlBar.muteToggle.hide();
            } else {
                this.mediaPlayer.controlBar.fullscreenToggle.show();
                this.mediaPlayer.controlBar.volumeControl.show();
                this.mediaPlayer.controlBar.muteToggle.show();
            }

            $(this.mediaPlayer.el()).removeClass(this.model.options.size).addClass(size);

            this.model.options.size = size;

            this.pluginCommander.trigger("onResize", { size: size });
        },

        load: function () {
            this.mediaPlayer.load();
        },

        setCurrentPosition: function (callback) {
            this.mediaPlayer.pause();
            this.timelineDriver.pauseVideo();
            this.mediaPlayer.currentTime(this.timelineModel.currentSeconds);

            this.pluginCommander.trigger("onSetCurrentPosition");

            if (callback) {
                callback();
            }
        },

        setStart: function () {
            this.timelineModel.currentFrame = this.timelineModel.startFrame;
            this.timelineModel.currentSeconds = this.timelineModel.startSeconds;
            this.setCurrentPosition();
        },

        volumeUp: function () {
            var self = this;

            this.changeVolume(function (currentVolume) {
                if (currentVolume != 1) {
                    self.mediaPlayer.volume(Number(currentVolume.toPrecision(1)) + 0.1);

                    if (currentVolume >= 0.1 && currentVolume <= 0.5) {
                        self.pluginCommander.trigger("onVolumeChange", { newIcon: "fa-volume-down", oldIcon: "fa-volume-off" });
                    }

                    if (currentVolume >= 0.6 && currentVolume <= 1) {
                        self.pluginCommander.trigger("onVolumeChange", { newIcon: "fa-volume-up", oldIcon: "fa-volume-down" });
                    }
                }                
            });
        },

        volumeDown: function () {
            var self = this;

            this.changeVolume(function (currentVolume) {
                if (currentVolume !== 0) {
                    self.mediaPlayer.volume(Number(currentVolume.toPrecision(1)) - 0.1);

                    if (currentVolume <= 0.5 && currentVolume >= 0.1) {
                        self.pluginCommander.trigger("onVolumeChange", { newIcon: "fa-volume-down", oldIcon: "fa-volume-up" });
                    }
                } else {
                    self.pluginCommander.trigger("onVolumeChange", { newIcon: "fa-volume-off", oldIcon: "fa-volume-down" });
                }               
            });
        },

        changeVolume: function (callback) {
            var currentVolume = this.mediaPlayer.volume();

            if (callback) {
                callback(currentVolume);
            }
        },

        setEnd: function () {
            var self = this;

            this.timelineModel.currentFrame = this.timelineModel.endFrame;
            this.timelineModel.currentSeconds = this.timelineModel.endSeconds;
            this.setCurrentPosition();
        },

        frameBackward: function () {
            if (this.timelineModel.currentFrame !== this.timelineModel.startFrame) {
                this.moveFrame(this.timelineModel.currentFrame -= 1);
            }
        },

        frameForward: function () {
            if (this.timelineModel.currentFrame !== this.timelineModel.endFrame) {
                this.moveFrame(this.timelineModel.currentFrame += 1);
            }
        },

        moveFrame: function (framePosition) {
            var timecode = this.timecodeProvider.fromFramesToTimeCodeObject(framePosition);

            this.timelineModel.currentSeconds = timecode.totalSeconds;
            this.timelineModel.currentFrame = framePosition;
            this.setCurrentPosition();
        },

        setControls: function (isActive) {
            this.model.options.controls = isActive;
            this.mediaPlayer.controls(this.model.options.controls);
        },

        setAutoPlay: function (isActive) {
            this.model.options.autoplay = isActive;
            this.mediaPlayer.autoplay(this.model.options.autoplay);
        },

        setPosterImage: function (posterUrl) {
            this.model.options.poster = posterUrl;
            this.mediaPlayer.poster = this.model.options.poster;
        },

        setLoop: function (isActive) {
            this.model.options.loop = isActive;
            this.mediaPlayer.loop(this.model.options.loop);
        },

        setVideoSrc: function (src) {
            this.model.options.src = src;
            this.mediaPlayer.src(src);
        },

        setVolume: function (volume) {
            this.mediaPlayer.volume(volume);
        },

        setPoints: function (points) {            

            //in-point
            var inPointTimeCode = this.timecodeProvider.fromLongTimeCodeToObject(points.inPoint);
            this.timelineModel.startFrame = inPointTimeCode.totalFrames;
            this.timelineModel.startSeconds = inPointTimeCode.totalSeconds;
            this.timelineModel.currentFrame = this.timelineModel.startFrame;
            this.timelineModel.currentSeconds = this.timelineModel.startSeconds;            
            
            //out-point
            var outPointTimeCode = this.timecodeProvider.fromLongTimeCodeToObject(points.outPoint);
            this.timelineModel.endFrame = outPointTimeCode.totalFrames;
            this.timelineModel.endSeconds = outPointTimeCode.totalSeconds;
            this.timelineModel.totalFrames = outPointTimeCode.totalFrames;
            this.timelineModel.totalSeconds = outPointTimeCode.totalSeconds;

            this.mediaPlayer.currentTime(this.timelineModel.currentSeconds);
            this.pluginCommander.trigger("onSetCurrentPosition");
        }
    };

    var controller = function (playerId, model, timelineModel, options) {

        function Controller() { }
        Controller.prototype = prototype;

        var f = new Controller();
        f.init(playerId, model, timelineModel, options);
        return f;

    };

    app.controllers.MediaPlayerController = controller;

})(window, window.jQuery, window._, window.App);