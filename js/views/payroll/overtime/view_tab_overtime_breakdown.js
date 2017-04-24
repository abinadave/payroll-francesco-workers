define(['underscore','backbone','text!templates/payroll/overtime/temp_tab_overtime_breakdown.html'], function(_, Backbone, template) {
   
    var SubviewTab = Backbone.View.extend({
    
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
                    self.$el.find('#modalOvertimeBreakdown').modal('show');
                    overtime_payrolls.subviews.appendOverAllTotal(self.collection);
                    
                });
        	}

    
    });
   
    return SubviewTab; 
});