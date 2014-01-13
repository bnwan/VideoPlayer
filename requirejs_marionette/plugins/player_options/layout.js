(function (root) {
    "use strict";

    root.define([
        "marionette",
        "hbs!/plugins/player_options/templates/layout",
    ], function (Marionette, tmplLayout) {
        
        var layout = Marionette.Layout.extend({
            template: tmplLayout,
            regions: {
                "mainRegion": "#player-options-main-region"
            }
        });

        return layout;
    });

})(this);