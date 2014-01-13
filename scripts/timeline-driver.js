(function (app) {
    "use strict";

    var timelineDriver = function () { };

    timelineDriver.TimerInterval = function (callback, delay) {
        var timeId;
        var start;
        var remaining = delay;

        this.stop = function () {
            clearInterval(timeId);
        };

        this.pause = function () {
            this.stop();
            remaining -= new Date() - start;
        };

        this.resume = function () {
            start = new Date();
            timeId = setInterval(callback, remaining);
        };

        this.start = function () {
            this.resume();
        };
    };

    var videoTimer = null;

    timelineDriver.setTimer = function (data, next) {
        var rate = 1000 / data.frameRate;

        return new timelineDriver.TimerInterval(function () {
            if (data.isForwardPlay) {
                data.currentFrame++;
                data.currentTimelinePosition++;
            } else {
                data.currentFrame--;
                data.currentTimelinePosition--;
            }

            next(data);
        }, rate);
    };

    timelineDriver.clearTimer = function () {
        if (videoTimer) {
            videoTimer.stop();
            videoTimer = null;
        }
    };

    timelineDriver.addTimer = function (data, playVideoCallback) {
        if (!videoTimer) {
            videoTimer = this.setTimer(data, function (resultData) {
                // do something
                if (playVideoCallback) {
                    playVideoCallback(resultData);
                }
            });
            videoTimer.resume();
        }
    };

    timelineDriver.playVideo = function (data, next, playVideoCallback) {
        this.clearTimer();
        this.addTimer(data, playVideoCallback);

        if (next) {
            next();
        }
    };

    timelineDriver.pauseVideo = function (next) {
        if (videoTimer) {
            videoTimer.pause();            

            if (next) {
                next();
            }
        }
    };

    timelineDriver.stopVideo = function (next) {
        this.clearTimer();
        if (next) {
            next();
        }
    };


    app.utility.timelineDriver = timelineDriver;

})(window.App);