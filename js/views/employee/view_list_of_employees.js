define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_list_of_employee.html',
        'libs/accounting.min'
	],  function(_, Backbone, template, acc) {
   
    var ViewListOfEmployees = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-employees',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'accounting': acc});
                self.$el.append(output);
                self.init();
                employees.subviews.initJQueryClickTr();

                if (self.collection.length) {
                    employees.subviews.appendTr(self.collection.length, '#list-of-employees');
                };


    	        return self;
        	},
    
        	init: function(){
                $(function(){
                   
                });
        	}
    
    });
   
    return ViewListOfEmployees; 
});