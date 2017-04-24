define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_list_of_payroll.html',
        "libs/accounting.min"
	],  function(_, Backbone, template, acc) {
   
    var ViewListOfPayroll = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-payroll',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'accounting': acc});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                attendances.subviews.initializeJS();
                var from = attendances.function.from;
                var to = attendances.function.to;
               
                require(['moment'], function(moment){
                    var d1 = moment(from).format('MMM DD'), 
                    d2 = moment(to).format('MMM DD, YYYY');
                    $('#payroll-period').text(d1 + ' - ' + d2);
                });
        	}
    
    });
   
    return ViewListOfPayroll; 
});