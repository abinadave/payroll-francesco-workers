define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_list_of_location_in_modal.html',
        'chosen'
	],  function(_, Backbone, template, chosen) {
   
    var ViewListOfLocationInModal = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#form-add-employee #location, #form-update-employee #location, #location',
    
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
                    //$('#select #location').chosen();
                });
        	}
    
    });
   
    return ViewListOfLocationInModal; 
});