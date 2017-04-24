define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_table_payrollemps_removed.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#div-payrollemps-removed',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalPayrollempsRemoved').modal('show');
                    require(['jqueryui'], function(){
                        $('#div-modalPayrollempsRemoved').draggable({});
                    });
                });

                $(function() {
                    self.$el.find('#search-query-3').keyup(function(event) {
                        var value = $(this).val();
                        var pid = payrolls.function.currentId;
                        var lists = payrollemps_removed.function.getEmpWherePayrollId(pid);
                        var found = payrollemps_removed.function.search(lists, value);
                        
                    });
                });
        	}
    
    });
   
    return Subview; 
});