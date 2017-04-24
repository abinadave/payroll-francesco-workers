define(
	[
		'underscore',
		'backbone',
		'text!templates/usertype/temp_list_of_usertype_in_modal.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfUsertypeInModal = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#usertypes',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfUsertypeInModal; 
});