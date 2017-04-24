define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_list_of_my_salaries.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-my-salary',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init(self.collection.length);
    	        return self;
        	},
    
        	init: function(length){

                var self = this;
                $(function(){
                    if (length == 0) {
                        self.$el.html('<b class="text-danger">No data was found</b>');
                    };
                });
        	}
    
    });
   
    return Subview; 
});