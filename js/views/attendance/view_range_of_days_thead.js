define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_range_of_days_thead.html',
		'moment'
	],  function(_, Backbone, template, moments) {
   
    var ViewRangeOfDaysThead = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'thead',
    
        	el: '#range-of-days',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(values){
        	    var self = this;
                self.$el.empty();
                var list = attendances.function.sortAtoZ(self.collection);
                var output = self.template({ 'library': list.toJSON(), 'value': values, 'moment': moments });
                self.$el.hide().append(output).fadeIn('slow');
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
               attendances.subviews.initializeViewAttendance();
               attendances.subviews.initializeTdWhenClicked();
        	}
    
    });
   
    return ViewRangeOfDaysThead; 
});