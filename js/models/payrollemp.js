define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Payrollemp = Backbone.Model.extend({
        
        url: 'index.php/payrollemp',

    	initialize: function(){
    		//console.log('Model payrollemp initialized');
            this.on('change', function(){
                    pbreakdowns.reset();

                    var formula = 0.0;
                    var num_of_days = this.get('num_of_days');
                    var total_value = 0;
                    var total_rice = 0.0;

                    total_value = parseFloat(num_of_days) * parseFloat(this.get('rpd'));
                    
                    if (this.get('has_allowance') == '1') {
                        total_rice = parseFloat(num_of_days) * parseFloat(rice.get('price'));
                        this.set({rice_allowance: total_rice.toString()});
                        payrollemps.function.updateRiceAllowance(this.attributes);    
                    }else {
                        this.set({rice_allowance: total_rice.toString()}, {silent: true});
                        payrollemps.function.updateRiceAllowance(this.attributes);  
                    }

                    formula = total_value - parseFloat(this.get('advances')) - parseFloat(this.get('sss')) - parseFloat(this.get('phil'));
                    formula += total_rice;

                    this.set({net: formula.toString(), total: total_value.toString()});
   
                    var payrollemp = this.attributes, overall_net = 0.0, overall_advances = 0.0, overall_sss = 0.0, overall_phil = 0.0, overall_r_a = 0.0, overall_total = 0.0;
                    var emp_net = 0.0;
                    var thisdata = {};

                    var changedAttributes = this.changedAttributes();

                    thisdata.num_of_days = this.get('num_of_days');
                    thisdata.advances = this.get('advances');
                    thisdata.sss = this.get('sss');
                    thisdata.phil = this.get('phil');
                    thisdata.nhl = this.get('nhl');
                    thisdata.total = this.get('total');
                    thisdata.payroll_id = this.get('payroll_id');
                    thisdata.emp = this.get('emp');
                    thisdata.net = this.get('net');

                    if (this.hasChanged('nhl')) {
                        this.hasChangedNet = true;
                        var rph = parseFloat(this.get('rpd')) / 8;
                        var deductLate = rph * parseFloat(this.get('nhl'));
                        var total = parseFloat(this.get('net')) - deductLate;
                        thisdata.net = total;
                    };

                    var employee = this.attributes, hasChangedNet = true;

                    $.post('ajax/update/update_payrollemps.php', 

                    {
                        values: thisdata
                    }, 

                    function(data, textStatus, xhr) {
                        /*optional stuff to do after success */

                    }).success(function(data){
                        if(hasChangedNet){
                            var current = payrolls.function.currentId;
                            console.log(current);
                            var emp = payrollemps.findWhere({
                                emp: employee.emp, 
                                payroll_id: current.toString()
                            });
                            emp.set({net: thisdata.net}, {silent: true});
                            payrollemps.subviews.appendListOfPayrollEmps(current);
                        };
                    }).fail(function(xhr){
                        console.log(' '+xhr.status);
                    });


                    payrollemps.forEach(function(model) {
                        if (model.get('payroll_id') == payrollemp.payroll_id) {
                            overall_net += parseFloat(model.get('net'));
                            overall_advances += parseFloat(model.get('advances'));
                            overall_sss += parseFloat(model.get('sss'));
                            overall_phil += parseFloat(model.get('phil'));
                            overall_r_a += parseFloat(model.get('rice_allowance'));
                            overall_total += parseFloat(model.get('total'));
                        }
                    });

                    var payroll = payrolls.get(payrollemp.payroll_id);

                    payroll.set({
                        advances_total: overall_advances.toString(),
                        sss_total: overall_sss.toString(),
                        phil_total: overall_phil.toString(),
                        rice_allowance_total: overall_r_a.toString(),
                        total: overall_total.toString(),
                        net: overall_net.toString()
                    });
               
            });
    	},

    	defaults: {
    		payroll_id: 0,
            location: 'no location',
    		emp: 0,
    		num_of_days: 0,
            rpd: 0.0,
    		advances: 0.0,
    		sss: 0.0,
    		phil: 0.0,
            rice_allowance: 0.0,
            total: 0.0
    	}

    });

    return Payrollemp; 

});