define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_modal_breakdown.html'
	],  function(_, Backbone, template) {
   
    var ViewModalBreakDown = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-payroll-breakdown',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
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
   
    return ViewModalBreakDown; 
});