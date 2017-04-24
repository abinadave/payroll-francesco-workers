define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_append_new_attendance.html',
		'moment'
	],  function(_, Backbone, template, momentJS) {
   
    var ViewAppendNewAttendace = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#range-of-days',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(dates, thismodel){
        	    var self = this;
                //self.$el.off();
                //self.$el.empty();
                var output = self.template({ 'value': dates, 'model': thismodel, 'moment': momentJS });
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){

                attendances.subviews.initializeViewAttendance();
        	}
    
    });
   
    return ViewAppendNewAttendace; 
});