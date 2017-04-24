define(
	[
		'underscore',
		'backbone',
        'text!templates/employee/temp_modal_create_employee.html'
	],  function(_, Backbone, template) {
   
    var ViewModalCreateEmployee = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-create-employee',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnSaveEmployee': 'saveEmp'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    var $form = $('#form-add-employee');

                    $form.find('input').css({
                        width: '250px'
                    });
                  
                });
        	},

            saveEmp: function(event){
                event.preventDefault();
                var form = $('#form-add-employee').serialize();
                $('#form-add-employee').find(':submit').prop('disabled', true);
                employees.function.saveDB(form);
            }
    
    });
   
    return ViewModalCreateEmployee; 
});