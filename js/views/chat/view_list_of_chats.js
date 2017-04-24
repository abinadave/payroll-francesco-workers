define(['underscore','backbone','text!templates/chat/temp_list_of_chats.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-chats',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                require(['moment'], function(moment){        
	                self.$el.empty();
	                var output = self.template({ 'library': self.collection.toJSON(), 'moment': moment });
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return Subview; 
});