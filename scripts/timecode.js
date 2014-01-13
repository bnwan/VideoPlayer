
(function (utility) {
    "use strict";

    var timeCode = function (frameRate) {
        this.frameRate = frameRate;
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
        this.frames = "00";
        this.totalSeconds = "00";
        this.framePercentage = "00";
        this.totalFrames = "00";
        this.videoTime = function () {
            return this.totalSeconds + "." + this.framePercentage;
        };
    };

    timeCode.prototype.fromVideoTimeToTimeCodeObject = function (sec) {
        var init = parseFloat(sec);

        sec = parseInt(init);        
        this.frames = parseInt(parseFloat("0." + init.toString().split('.')[1]) * this.frameRate);
        var min = parseInt(sec / 60);
        var hr = parseInt(min / 60);
        sec = sec - min * 60;
        min = min - hr * 60;
        this.hours = (hr < 10) ? "0" + hr : hr;
        this.minutes = (min < 10) ? "0" + min : min;
        this.seconds = (sec < 10) ? "0" + sec : sec;

        this.totalSeconds = parseFloat(init);
        this.framePercentage = init.toString().split('.')[1];
        this.totalFrames = this.frames + (sec * this.frameRate) + (min * 60 * this.frameRate) + (hr * 60 * 60 * this.frameRate);

        this.frames = this.frames < 10 ? "0" + this.frames : this.frames;

        return this;
    };
    
    timeCode.prototype.fromLongTimeCodeToObject = function (sec) {
        
        var longTimeCode = sec.toString();
        var timings = longTimeCode.split(':');

        var hours = parseInt(timings[0]);
        var minutes = parseInt(timings[1]);
        var seconds = parseInt(timings[2]);
        var frames = timings[2].split('.')[1];

        var videoTime = parseFloat(((hours * 60 * 60) + (minutes * 60) + (seconds)).toString() + "." + frames);

        return this.fromVideoTimeToTimeCodeObject(videoTime);
    };
    
    timeCode.prototype.fromFramesToTimeCodeObject = function (framesValue) {
        var frames = parseInt(framesValue);

        var hours = frames / (60 * 60 * this.frameRate) % 24;
        var minutes = (frames / (60 * this.frameRate)) % 60;
        var seconds = (frames / this.frameRate) % 60;
        var f = ((frames) % this.frameRate) / this.frameRate;

        var result = "hh:mm:ss.fp".replace("hh", hours)
            .replace("mm", minutes)
            .replace("ss", seconds)
            .replace("fp", f);

        return this.fromLongTimeCodeToObject(result);
    };      

    timeCode.prototype.toString = function (format) {        
        if (!format) {
            format = "hh:mm:ss:ff";
        }


        var formatted = format.replace("hh", this.hours)
            .replace("mm", this.minutes)
            .replace("ss", parseInt(this.seconds))
            .replace("ff", this.frames)
            .replace("fp", self.framePercentage)
            .replace('tf', self.totalFrames);

        return formatted;
    };

    utility.TimeCode = timeCode;

})(window.App.utility);