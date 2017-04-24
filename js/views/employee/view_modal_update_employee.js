define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_modal_update_employee.html'
	],  function(_, Backbone, template) {
   
    var ViewModalUpdateEmployee = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-update-employee',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'submit #form-update-employee': 'updateEmployee'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
                employees.subviews.initFileUploaderUpdatePhoto();
    	        return self;
        	},
            
    
        	init: function(){
                var self = this;

                $(function() {
                    projects.subviews.appendListOfLocationInModal();
                    positions.subviews.appendListOfPositionsInModalUpdateEmployee();
                });

                $(function(){
                    $('#modalUpdateEmployee').modal('show');
                    $('#form-update-employee').find('input').css({
                    	width: '250px'
                    });
                });
                $(function() {
                    setTimeout(function(){
                        self.$el.find('#firstname').focus();
                    },1000);
                });

                $(function() {
                    self.$el.find('form').submit(function(event) {
                        /* Act on the event */
                        var $btn = $(this).find(':submit');
                        $btn.prop('disabled', true);
                        event.preventDefault();
                        var form = $('#form-update-employee').serialize();
                        employees.function.updateDb(form);
                        setTimeout(function() {
                            $btn.prop('disabled', false);
                        }, 4000);
                    });
                });
        	},

            updateEmployee: function(event){
                
            }
    
    });
   
    return ViewModalUpdateEmployee; 
});