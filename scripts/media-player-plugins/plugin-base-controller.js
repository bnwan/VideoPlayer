(function ($, _, utility, app) {

    var prototype = {
        // raises onInit event
        init: function (name, el, options) {
            this.name = name;            
            this.el = el;            

            if (options) {
                this.options = options;
                this.templateUrl = options.templateUrl;
            }

            this.$el = $(el);

            var defaults = {};

            _.defaults(this.options, defaults);

            if (el && this.templateUrl && !this.template) {
                this.render();
            } else {
                if (this.onRender) {
                    this.onRender.call(this);
                }
            }

            if (this.onInit) {
                this.onInit.apply(this, [options]);
            }
        },

        // raises onRender event
        render: function () {
            var self = this;            

            if (this.templateUrl && !this.template) {
                utility.templateLoader.load(this.templateUrl, function(templateContent) {
                    self.template = templateContent;
                    
                    if (self.onRender) {
                        self.onRender.apply(self, [templateContent]);
                    }

                    if (self.onSetUIElements) {
                        self.onSetUIElements.call(self);
                    }
                });
            }   
        },

        // raises onSizeChangeed event
        onResize: function (data) {
            if (this.onSizeChanged) {
                this.onSizeChanged.apply(this, [data]);
            }

            this.$el.removeClass(this.size).addClass(data.size);
            this.size = data.size;
        },

        setUIElements: function(){
            if (this.onSetUIElements) {
                this.onSetUIElements.call(this);
            }
        },

        // raises onBindEvents event
        bindEvents: function () {

            if(this.onBindEvents){
                this.onBindEvents.call(this);
            }            
        },        

        // raises onShow event
        show: function () {            

            if(this.template){
                this.$el.html(this.template);                
            }

            this.$el.show();

            if(this.onShow){
                this.onShow.call(this);
            }

            if (this.template) {
                this.setUIElements();
                this.bindEvents();
            }
        },

        // raises onHide event
        hide: function () {
            this.$el.html("");

            this.$el.hide();

            if (this.onHide) {
                this.onHide.call(this);
            }
        }
    };

    var controller = function (name, el, options) {

        function ControllerBase() { }
        ControllerBase.prototype = prototype;

        var f = new ControllerBase();
        f.init(name, el, options);
        return f;
    };    

    app.controllers.PluginBaseController = controller;

})(window.jQuery, window._, window.App.utility, window.App);