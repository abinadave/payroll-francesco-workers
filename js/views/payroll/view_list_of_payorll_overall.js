define(['underscore','backbone',
	'text!templates/payroll/temp_list_of_payroll_overall.html',
    'libs/accounting.min'], 
	function(_, Backbone, template, accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#list-of-payroll-overall',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'accounting': accounting });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    // require(['DT-bootstrap','datatable'], function(){
                    //     $('#table-overall-payroll-breakdown').dataTable();
                    // });
                });
        	}
    
    });
   
    return Subview; 
});