define([
    'underscore',
    'backbone',
    'text!templates/payroll/overtime/temp_list_of_overtime_payrolls.html'], 
    function(_, Backbone, template) {
    
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-overtime-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['moment'], function(moment){
	                self.$el.empty();
                    var list = overtime_payrolls.function.sortDate(self.collection);
	                var output = self.template({'library': list.toJSON(), 'moment': moment });
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function() {
                    if (!self.collection.length) {
                       var output = '<tr><td colspan="10">No overtime was found in this table</td></tr>';
                       $('#list-of-overtime-payrolls').html(output);
                    }
                });

                $(function(){

                    self.$el.find('tr').css({
                    	'cursor': 'pointer'
                    });

                    self.$el.find('tr').click(function(event) {
                    	self.$el.find('tr').removeClass('text-info');
                    	$(this).toggleClass('text-info');
                    }); 

                });

        	}
    
    });
   
    return Subview; 
});