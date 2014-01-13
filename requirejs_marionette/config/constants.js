(function (root) {
    "use strict";

    root.define("constants", [], function () {

        var constants = {
            // media player sizes
            playerSizes: {
                tiny: {
                    width: 172,
                    height: 98
                },
                small: {
                    width: 426,
                    height: 240
                },
                large: {
                    width: 852,
                    height: 480
                }
            }
        };

        return constants;
    });

})(this);