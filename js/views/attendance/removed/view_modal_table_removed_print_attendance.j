define(['underscore','backbone',
	'text!templates/attendance/removed/temp_modal_table_removed_print_attendance.html'], 
	function(_, Backbone, template) {
   
    var SubviewPrintTable = Backbone.View.extend({
    
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
                    self.$el.find('#modalPrintRemovedAttendance').modal('show');
                });
        	}
    
    });
   
    return SubviewPrintTable; 
});