define(
	[
		'underscore',
		'backbone',
		'text!templates/position/temp_list_of_position_in_modal_update_employee.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfPositionInModalUpdateEmployee = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#update-position',
    
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
   
    return ViewListOfPositionInModalUpdateEmployee; 
});