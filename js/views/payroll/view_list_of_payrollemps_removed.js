define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_list_of_payrollemps_removed.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'ul',
    
        	el: '#list-of-payrollemps-removed',
    
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

                    //jQuery
                    if (length == 0) {
                    	$('#modalPayrollempsRemoved').modal('hide');
                    }

                    self.$el.find('a').click(function(event) {
                    	var id = this.id, pid = payrolls.function.currentId;
                    	var model = payrollemps_removed.findWhere({payroll_id: pid, emp: id});
                    	payrollemps.add(model);
                    	payrollemps_removed.remove(model.cid);

                    	payrollemps.subviews.appendListOfPayrollEmps(pid);
                    	var lists = payrollemps_removed.function.getEmpWherePayrollId(pid);
                    	payrollemps_removed.subviews.appendRetreivedRemovedEmployees(lists);
                        
                    });

                });
        	}
    
    });
   
    return Subview; 
});