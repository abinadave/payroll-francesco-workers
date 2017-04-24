define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_modal_add_new_employee.html'
	],  function(_, Backbone, template) {
   
    var ViewModalAddNewEmployee = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-add-new-emp-in-attendance',
    
        	template: _.template(template),
    
            events: {
                // bound events
               
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                
                $(function(){
                   $("#btnInsertNewEmpInAttendance").on( "click", function() {
                        var $target = $('#modalAddNewEmployeeInAttendance');
                        var value = $target.find('#cbo-add-new-emp-attendance').val();
                        var $panel = $('#panel-attendance');
                        var froms = $panel.find('#from').val();
                        var tos = $panel.find('#to').val();
                        var isUphold = presents.function.isUphold;
                        if (value > 0) {
                           
                            attendances.add({id: value.toString(), from: froms, to: tos});
                            $('#modalAddNewEmployeeInAttendance').modal('hide');
                           
                        };
                        
                    });
                });
                
        	}
    
    });
   
    return ViewModalAddNewEmployee; 
});