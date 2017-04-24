define(['underscore','backbone','text!templates/payroll/overtime/removed/temp_panel_removed_overtimes.html'], 
    function(_, Backbone, template) {
   
    var Panel = Backbone.View.extend({
    
            initialize: function(){
                this.render();
            },
    
            tagName: 'div',
    
            el: '#main',
    
            template: _.template(template),
    
            events: {
                // bound events
            },
    
            render: function(){
                var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
                return self;
            },
    
            onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
            }
    
    });
   
    return Panel; 
});