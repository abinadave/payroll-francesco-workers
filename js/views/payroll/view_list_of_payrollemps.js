define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_list_of_payrollemps.html',
        'libs/accounting.min'
	],  function(_, Backbone, template, acc) {
   
    var ViewListOfPayrollEmps = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-payrollemps',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(id){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'payroll_id': id, 'accounting': acc, 'library': self.collection.toJSON(), 'self': self});
                self.$el.append(output);
                self.init(id);
    	        return self;
        	},
            
            getOtHrs(payrollemp){
                let self = this;
                let rph = Number(payrollemp.rpd) / 8;
                if (Number(payrollemp.ot_hrs) === 0) {
                    return 0;
                }else {
                    let totalOtHrs = Number(payrollemp.ot_hrs) * rph;
                    return Number(totalOtHrs);
                }
            },

            getOtMins(payrollemp){
                let self = this;
                let rpd = Number(payrollemp.rpd);
                let rph = Number(rpd) / 8;
                let rpm = Number(rph) / 60;
                if (Number(payrollemp.ot_mins) === 0) {
                    return 0;
                }else {
                    let totalOtMins = Number(payrollemp.ot_mins) * rpm;
                    return parseFloat(totalOtMins);
                }
            },

            getUndertimeTotal(payrollemp){
                let self = this;
                let rpd = Number(payrollemp.rpd);
                let rph = Number(rpd) / 8;
                return Number(rph) * Number(payrollemp.undertime);
            },

        	init: function(payroll_id){
                var self = this;
                $(function(){
                    $('.r-a').hide();
                    //jQuery
                    self.$el.find('td').css({
                        padding: '2.5px'
                    });
                    var payroll = payrolls.get(payroll_id);
                    var text = payroll.get('date_from') + ' - ' + payroll.get('date_to');
                    $('#table-payrollemps-period').html(text);
                    $('#table-payrollemps-location').text(payroll.get('location'));
                    payrollemps.function.calculate_breakdown(payroll_id);
                });

                $(function() {

                    /* this is used to resize the modalemployees (modalTablePayrollemps) */

                    $('#chk-allowance').change(function(event) {
                        /* Act on the event */
                        var is = $(this).is(':checked');
                        if (is) {
                            $('#this-allowance').hide();
                            $('#table-payroll-emps').find('th').each(function(index, el) {
                                if (this.id === 'this-allowance') {
                                    $(this).hide();
                                };
                            });
                            $('#th-colspan').attr('colspan', 5);
                            self.$el.find('td').each(function(index, el) {
                                if (this.id === 'allowance') {
                                    $(this).hide();
                                };
                            });

                            $('#div-modalTablePayrollemps').animate({
                                width: '50%'
                            },500);
                            $('#emp-no').width(1);

                        }else{
                            $('#this-allowance').show();
                            $('#th-colspan').attr('colspan', 5);
                            self.$el.find('td').each(function(index, el) {
                                if (this.id === 'allowance') {
                                    $(this).show();
                                };
                            });
                            $('#table-payroll-emps').find('th').each(function(index, el) {
                                if (this.id === 'this-allowance') {
                                    $(this).show();
                                };
                            });
                            $('#div-modalTablePayrollemps').animate({
                                width: '80%'
                            },500);
                        }
                    });
                });

                $(function() {
                    if (Number(sessionStorage.getItem('usertype')) === 2) {
                        $('#list-of-payrollemps').find('tr').click(function(event) {
                            /* Act on the event */
                            var nodeName = event.target.nodeName;
                            var split_id = this.id;
                            console.log(split_id);
                            var res = split_id.split('-');

                            if (nodeName == 'TD') {                   
                                $('#list-of-payrollemps').find('tr').removeClass('text-danger project-trs');
                                $(this).addClass('text-danger project-trs');
                                payrollemps.function.edit(res[0], res[1]);
                            }else {
                                var model = payrollemps.findWhere({payroll_id: res[0], emp: res[1]});
                                var cid = model.cid;
                                payrollemps.remove(cid);
                            }

                            self.afterClick(res);
                            
                        });
                    }else {
                        self.$el.find('#list-of-payrollemps tr').css('cursor', 'context-menu');
                    }
                });


                $(function() {
                    $('#radio1').on('change', function(event) {
                         /*Do something..*/
                         var pid = $('#payroll-id').val(), empId = $('#emp').val(), is = $(this).is(":checked");
                         var obj = {payroll_id: pid, emp: empId, has: is};
                         if (is) {
                            obj.has = 1;
                            payrollemps.function.updateHasAllowance(obj);
                         }else {
                            obj.has = 0;
                            payrollemps.function.updateHasAllowance(obj);
                         }
                         
                    });

                });         
                
        	},

            afterClick: function(res){
                var condition = {payroll_id: res[0], emp: res[1]};
                var rs = payrollemps.where(condition);
                if (rs.length) {
                    require(['../bootstrap/js/flatui-radio'], function(){
                       
                        var emp = payrollemps.findWhere(condition).toJSON();
                        if (parseInt(emp.has_allowance) == 1) {
                            $('#radio1').radio('check');
                        }else {
                            $('#radio2').radio('check');
                        }

                    });
                };
            }
    
    });
   
    return ViewListOfPayrollEmps;
});