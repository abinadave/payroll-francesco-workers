define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_edit_payrollemps.html',
        'jqueryui'
        
	],  function(_, Backbone, template, jqueryui) {
   
    var ViewEditPayrollEmps = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-edit-payrollemps',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
                var self = this;

                $(function() {
                    $('#div-modalEditPayrollEmps').draggable({
                        cursor: "move"
                    });
                });

                $(function(){
                    //jQuery
                    var $modal = $('#modalEditPayrollEmps');
                    $modal.find("#form-update-payrollemps").submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var data = self.getFormEdit();
                        var result = payrollemps.where({payroll_id: data.payroll_id, emp: data.emp});

                        if (result.length && parseFloat(data.num_of_days) % 0.5 == 0) {

                            var model =  payrollemps.findWhere({payroll_id: data.payroll_id, emp: data.emp});
            
                            model.set({
                                advances: data.advances,
                                num_of_days: data.num_of_days,
                                phil: data.phil,
                                nhl: data.nhl,
                                rice_allowance: data.rice_allowance,
                                sss: data.sss
                            });

                        }else {
                            router.alertify_error('Invalid input');
                        }

                    });
                });


                $(function() {
                    
                    $('#form-update-payrollemps').find('input').keyup(function(event) {
                        /* Act on the event */
                        var id = this.id;

                        if ($(this).val() == '') {
                            $('#modalEditPayrollEmps').find('#btnSave').prop('disabled', true);
                        }else {
                            $('#modalEditPayrollEmps').find('#btnSave').prop('disabled', false);
                        }

                        if (!$.isNumeric($(this).val())) {
                            $('#modalEditPayrollEmps').find('#btnSave').prop('disabled', true);
                        }else {
                            $('#modalEditPayrollEmps').find('#btnSave').prop('disabled', false);
                        }

                        if (id == 'number-of-days') {
                            var value = parseFloat($(this).val());
                            var is = (value > 6) ? true : false;
                            $('#modalEditPayrollEmps').find('#btnSave').prop('disabled', is);
                        }
                        
                    });
                });

                $(function() {
                    require(['../bootstrap/js/flatui-radio','../bootstrap/js/bootstrap-switch'], function(){
                        self.$el.find(':radio').radio();
                    });
                });


        	},

            getFormEdit: function(){

                var data = {};
                var $target = $('#modalEditPayrollEmps');
                var total_rice = 0.0;

                data.num_of_days = $target.find('#number-of-days').val();
                data.advances = $target.find('#emp-advances').val();
                data.sss = $target.find('#emp-sss').val();
                data.phil = $target.find('#emp-phil').val();
                data.payroll_id = $target.find('#payroll-id').val();
                data.emp = $target.find('#emp').val();
                data.nhl = $target.find('#nhl').val();
                
                var condition = {payroll_id: data.payroll_id, emp: data.emp};
                var rs = payrollemps.where(condition);

                if (rs.length) {
                    var employee = payrollemps.findWhere(condition).toJSON();
                    if (parseInt(employee.has_allowance) == 1) {
                        data.rice_allowance = parseFloat(data.num_of_days) * parseFloat(rice.get('price'));
                        console.log('has rice allowance');
                    }else {
                        console.log('no rice allowance')
                    }
                }else {
                    console.log('cant find employee');
                }

                return data;
            }
    
    });
   
    return ViewEditPayrollEmps; 
});