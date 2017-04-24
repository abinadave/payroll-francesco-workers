define(['underscore','backbone','text!templates/attendance/removed/temp_list_of_removed_presences.html','moment'], 
	function(_, Backbone, template, moment) {
   
    var SubviewRemovedPresents = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-removed-presences',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    self.collection.forEach(function(model) {
                    	console.log(model.attributes); 
                    });
                });
        	}
    
    });
   
    return SubviewRemovedPresents; 
});