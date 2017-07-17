define(
	[
		'underscore',
		'backbone',
        'libs/accounting.min'
	],  function(_, Backbone, accounting) {
   
    var Attendance = Backbone.Model.extend({

    	initialize: function(){
    		//console.log('model attendance initialized');
            this.on('change', function(){

                if (this.hasChanged('num_of_days')) {
                   
                    this.setTotalNumberOfDays(this.get('id'), this.get('num_of_days'));
                    var result = employees.where({id: this.get('id')});
                    if (result.length) {
                        var emp = employees.get(this.get('id'));
                        var totality = parseFloat(emp.get('rpd')) * this.get('num_of_days');
                        this.set('total', totality.toString(), {silent: true});
                    }

                }

                if (this.hasChanged('advances')) {
                    attendances.function.advancesChanged(this.get('id'), this.get('advances'));
                    attendances.function.redisplayTotality();
                }

                if (this.hasChanged('ot_hrs')) {
                   attendances.function.otHrsChanged(this.get('id'), this.get('ot_hrs'));
                   attendances.function.redisplayTotality();
                }

                if (this.hasChanged('ot_mins')) {
                   attendances.function.otMinsChanged(this.get('id'), this.get('ot_mins'));
                   attendances.function.redisplayTotality();
                }

                if (this.hasChanged('sss')) {
                    attendances.function.sssChanged(this.get('id'), this.get('sss'));
                    attendances.function.redisplayTotality();
                }

                if (this.hasChanged('phil')) {
                    attendances.function.philChanged(this.get('id'), this.get('phil'));
                    attendances.function.redisplayTotality();
                }               

                if (this.hasChanged('rice_allowance')) {
                    attendances.function.redisplayTotality();
                    var employee = employees.get(this.get('id'));
                    var total_rice_allowance = parseFloat(rice.get('price')) * this.get('num_of_days');
                    var td = $('#net-amount-'+this.get('id'));

                    if (this.get('rice_allowance') == 1) {
                        var own_salary = 0.0;
                        own_salary = parseFloat(this.get('num_of_days')) * parseFloat(employee.get('rpd'));
                        own_salary -= parseFloat(this.get('advances'));
                        own_salary -= parseFloat(this.get('sss'));
                        own_salary -= parseFloat(this.get('phil'));
                        own_salary += total_rice_allowance;
                    }else{
                        var own_salary = 0.0;
                        own_salary = parseFloat(this.get('num_of_days')) * parseFloat(employee.get('rpd'));
                        own_salary -= parseFloat(this.get('advances'));
                        own_salary -= parseFloat(this.get('sss'));
                        own_salary -= parseFloat(this.get('phil'));
                    }

                    td.text(accounting.formatMoney(own_salary," ", 2));

                }


            });
    	},

    	defaults: {
    		id: 0,
    		num_of_days: 0,
    		total: 0.0,
    		net_amount: 0.0,
            from: 'none',
            to: 'none',
            advances: 0,
            sss: 0,
            ot_hrs: 0,
            ot_mins: 0,
            phil: 0,
            rice_allowance: 0,
            nod: '0'
    	},

        setTotalNumberOfDays: function(id, tnod){
            $('#tnod-'+id).text(tnod);
        }

       
    	
    });
   
    return Attendance; 
});