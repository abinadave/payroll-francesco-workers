define(['underscore','backbone',
	'text!templates/payroll/overtime/removed/temp_list_of_removed_overtimes_admin_side.html',
	'moment',
    'libs/accounting.min'], function(_, Backbone, template, moment, Accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-removed-overtime-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(), 
                	'self': self, 
                	'moment': moment,
                    'Accounting': Accounting 
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function() {
                	$('#total-removed-payrolls').text(self.collection.length);
                });
        	}
    
    });
   
    return Subview; 
});