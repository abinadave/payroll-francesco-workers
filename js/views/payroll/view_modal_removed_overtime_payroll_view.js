define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_modal_removed_overtime_payroll_view.html'
	], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},

            filterPayrollemps: function(payroll_id) {
                return payrollemps.filter(function(model) {
                    return model.get('payroll_id') === payroll_id
                });
            },
    
        	onRender: function(){
                var self = this;

                $(function(){
                    $('#modalTablePayrollempsRemoved').modal('show');
                        var found = self.filterPayrollemps(self.model.get('id'));
                        payrollemps.subviews.appendListRemovedPayrolls(found);
                });

                $(function() {
                    $('#modalTablePayrollempsRemoved').on('hidden.bs.modal', function(){
                        router.navigate('RemovedPayroll');
                    });
                });

                
                
        	}
    
    });
   
    return Subview; 
});