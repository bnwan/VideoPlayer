(function (_) {
    "use strict";

    _.mixin({



    });

    String.prototype.toHHMMSS = function () {
        var secNum = parseFloat(this, 10);
        var hours = Math.floor(secNum / 3600);
        var minutes = Math.floor((secNum - (hours * 3600)) / 60);
        var seconds = secNum - (hours * 3600) - (minutes * 60);
        var frames = 0;

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (frames < 10) {
            frames = "0" + frames;
        }

        var time = hours + ":" + minutes + ":" + seconds + ":" + frames;
        return time;
    };

})(window._);