define(['underscore','backbone','text!templates/payroll/overtime/temp_modal_edit_overtime_payrollemps.html'],
 function(_, Backbone, template) {
   
    var ModalEdit = Backbone.View.extend({
    
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
                self.$el.empty();
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                   $('#modalEditPayrollEmps').modal('show');
                    
                    self.$el.find('form').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var hrs = self.$el.find('#hrs').val();
                        var json = self.model.toJSON();
                        var overtime = overtime_payrolls.get(json.payroll_id);
                        if ($.isNumeric(hrs) && parseFloat(hrs) > 0) {
                            self.update(json, overtime, hrs);
                        }else {
                            router.alertify_error('Invalid input for no. of hours.');
                        }
                    });
                });
        	},

            update: function(json, overtime, hr) {
               $.post('ajax/update/update.php', {
                   table: 'overtime_payrollemps',
                   values: { hrs: hr },
                   where: 'id',
                   where_value: json.id
               }, function(data, textStatus, xhr) {
                   /*optional stuff to do after success */
               }).success(function(data){
                   var model = overtime_payrollemps.get(json.id);
                   model.set({hrs: hr});
                   router.alertify_success('Successfully updated');
                   $('#modalEditPayrollEmps').modal('hide');
               }).fail(function(xhr){
                   alert(' '+xhr.status);
               });
            }
    
    });
   
    return ModalEdit; 
});