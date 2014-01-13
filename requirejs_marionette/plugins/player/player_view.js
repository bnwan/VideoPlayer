(function (root) {
	"use strict";

	root.define([
        "underscore",        
		"marionette",        
		"hbs!/plugins/player/templates/player_view",
        "constants",
        "videojs",
        "mixins"        
	], function (_, Marionette, tmplPlayerView, Constants) {

		var view = Marionette.ItemView.extend({
            
			template: tmplPlayerView,
            tagName: "video",
            className: "video-js vjs-default-skin vjs-big-play-centered",
            
            initialize: function(){
                var self = this;
                
                if(self.options.swfFile){
                    root._V_.options.flash.swf = this.options.swfFile;
                } 
                
                this.playerId = _.uniqueId("media-player-");                
            },
            
            modelEvents: {
                "change:controls": "setControls",
                "change:autoPlay": "setAutoPlay",
                "change:poster": "setPoster",
                "change:loop": "setLoop",
                "change:width": "setDimensions",
                "change:height": "setDimensions"
            },
            
            onDomRefresh: function () {                
                this.setUpPlayer();
            },
            
            onRender: function(){
                //set up player id                
                this.$el.attr("id", this.playerId);
            },

            setUpPlayer: function () {
                var self = this;
                //set up player options
                root.videojs(this.playerId, this.model.toJSON(), function () {
                    self.mediaPlayer = this;
                    self.setUpPlayerEvents();

                    this.bigPlayButton.hide();
                    this.loadingSpinner.show();
                });
            },

            setUpPlayerEvents: function () {
                // Fired when the player has downloaded data at the current playback position
                this.mediaPlayer.on("loadeddata", function () {
                    this.loadingSpinner.hide();
                    this.bigPlayButton.show();
                });

                // Fired whenever the media begins or resumes playback
                this.mediaPlayer.on("play", function () {                    
                    this.bigPlayButton.hide();
                });
            },

            setControls: function(){
                this.mediaPlayer.controls(this.model.get("controls"));
            },

            setAutoPlay: function(){
                this.mediaPlayer.autoplay(this.model.get("autoPlay"));
            },

            setPoster: function(){
                this.mediaPlayer.poster = this.model.get("poster");
            },

            setLoop: function(){
                this.mediaPlayer.loop(this.model.get("loop"));
            },

            setDimensions: function () {
                var width = this.model.get("width");
                var height = this.model.get("height");

                if(width === Constants.playerSizes.tiny.width){
                    this.mediaPlayer.controlBar.fullscreenToggle.hide();
                    this.mediaPlayer.controlBar.volumeControl.hide();
                    this.mediaPlayer.controlBar.muteToggle.hide();
                } else {
                    this.mediaPlayer.controlBar.fullscreenToggle.show();
                    this.mediaPlayer.controlBar.volumeControl.show();
                    this.mediaPlayer.controlBar.muteToggle.show();
                }

                this.mediaPlayer.dimensions(width, height);
            }           
		});

		return view;

	});
})(this);