define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_list_of_removed_payrolls.html',
        'libs/accounting.min'
	],  function(_, Backbone, template, Accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#record-list-removed-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events..
            },
    
        	render: function(){
        	    var self = this;
        	    require(['libs/accounting.min'], function(accounting){
	                self.$el.empty();
	                var output = self.template({
                        'library': self.collection.toJSON(), 'accounting': accounting,
                        'self': self,
                        'Accounting': Accounting
                    });
	                self.$el.append(output);
	                self.init(self.collection.length);
	            });
    	        return self;
        	},
    
        	init: function(length){
        		var self = this;

                $(function(){
                    //jQuery
                    if (length == 0) {
                    	self.$el.html('<tr><td colspan="14">No data was found</td></tr>')
                    };
                    $('#no-of-rremoved-overtimes').text(self.collection.length);
                });

                // $(document).ready(function($) {
                //     require(['datatable','DT-bootstrap'], function(datatable, DT_bootsrap){
                //         $('#table-rpayrolls').dataTable(); 
                //     });
                // });

        	}
    
    });
   
    return Subview; 
});