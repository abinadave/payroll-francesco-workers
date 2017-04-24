define(['underscore','backbone',
	'text!templates/payroll/overtime/removed/temp_modal_removed_overtime_view.html'], function(_, Backbone, template) {
   
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
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    $('#modalRemovedOvertimePayrollemps').modal('show');
                    $('#modalRemovedOvertimePayrollemps').on('shown.bs.modal', function(event) {
                    	var str = Backbone.history.fragment.split('/');
                    	var list = overtime_payrollemps.function.findWorkers(str[3]);
                    	overtime_payrollemps.subviews.appendList(list);
                    }).on('hidden.bs.modal', function(event) {
                    	console.log('hidden');
                    });


                    
                });
        	}
    
    });
   
    return Subview; 
});