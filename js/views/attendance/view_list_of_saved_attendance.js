define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_list_of_saved_attendance.html',
		'moment'
	],  function(_, Backbone, template, momentJS) {
   
    var ViewListOfSavedAttendance = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-saved-attendance',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'moment': momentJS
            	});
                self.$el.append(output);
                self.init(self.collection.length);
    	        return self;
        	},
    
        	init: function(length){
                $(function(){
                    //jQuery
                    if (length == 0) {
                        var output = '<tr class="text-danger"><td colspan="5">No saved attendance was found</td></tr>'
                        $('#list-of-saved-attendance').html(output);
                    };
                });
        	}
    
    });
   
    return ViewListOfSavedAttendance; 
});