define([
    'underscore',
    'backbone',
    'text!templates/debt/temp_modal_input_pay_debt.html',
    'moment',
    'libs/accounting.min'], 
	function(_, Backbone, template, moment, Accounting) {
   
    var Subview = Backbone.View.extend({
    
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
        	    require(['libs/accounting.min'], function(accounting){   
	                // self.$el.off();
	                self.$el.empty();
	                var output = self.template(template);
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
            clearForm(){
                let self = this;
                let $el = $('#modalPayDebt');
                $el.find('input').val('');
                $el.modal('hide');
            },
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    // $('#modalPayDebt').modal({
                    // 	backdrop: 'static',
                    // 	keyboard: false
                    // });

                    self.$el.find('#btnSubmit').click(function(event) {
                    	/* Act on the event */
                    	var value = self.$el.find('#value').val();
                    	var balance = self.$el.find('#balance').val();
                    	var debt = debts.get(self.$el.find('#person-id').val());
                        let empId = self.$el.find('#person-id').val()
                    	if ($.isNumeric(value)) {
                			$.post('ajax/save/save_debt.php', {
                                 value: value ,
                                 emp_id: self.$el.find('#debt-emp-id').val(),
                                 date: moment().format('MMMM DD, YYYY hh:mm a')
                            }, function(data, textStatus, xhr) {
                                /*optional stuff to do after success */
                            }).then((resp) => {
                                let json = JSON.parse(resp);
                                console.log(json);
                                if (json.type === 'save') {
                                    if (Number(json.data.id) > 0) {
                                        router.alertify_success('Process Completed');
                                        debts.add(json.data);
                                        console.log(debts.length);
                                    }
                                }else {
                                    /* syempre update liwat */
                                    let id = json.data.id;
                                    let debt = debts.get(id);
                                    debt.set(json.data);
                                }
                                self.clearForm();
                            }, (resp) => {
                                console.log(resp);
                            })
                		}else {
                			router.alertify_error('Incorrect input');
                		}
                    });
                });

                $(function() {
                	setTimeout(function() {
                		self.$el.find('#value').focus();
                	}, 600);
                });

                $(document).ready(function() {
                    self.$el.find('#value').keyup(function(event) {
                        let value = $(this).val();
                        if(!isNaN(value)){
                            let ca = Number(value);
                            let empId = $('#debt-emp-id').val();
                            let newCa = self.getBalanceWhileTyping(empId, ca);
                            self.$el.find('#balance').val(Accounting.formatNumber(newCa));
                        }
                    });
                });
                
        	},
            getBalanceWhileTyping(empId, newCa){
                let self = this;
                let rs = debts.where({emp_id: empId});
                if (rs.length) {
                    let model = rs[0].attributes;
                    return Number(model.value) + Number(newCa);
                }
            },
    
    });
   
    return Subview; 
});