define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_list_of_employee_names_in_cbo.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfEmployeeNamesInCbo = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#cbo-add-new-emp-attendance',
    
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
   
    return ViewListOfEmployeeNamesInCbo; 
});