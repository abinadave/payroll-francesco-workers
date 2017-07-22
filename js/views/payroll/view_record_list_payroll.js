define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_record_list_payroll.html',
        'libs/accounting.min',
        'libs/backbone.obscura',
        'moment'
	],  function(_, Backbone, template, acc, Obscura, moment) {
   
    var ViewRecordListPayroll = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#record-list-payroll',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var proxy = new Obscura(self.collection);
                self.collection = proxy.setSort('true_date', 'desc');
                var output = self.template({'library': self.collection.toJSON(), 'accounting': acc, 'moment': moment,
                    'self': self });
                self.$el.append(output);
                self.init(self.collection.length);
    	        return self;
        	},

            getTotalOfpayroll(payroll){
                let self = this;
                let rsPayrollemps = _.where(payrollemps.toJSON(), { payroll_id: payroll.id });
                if (rsPayrollemps.length) {
                    var over_all_total = 0.0;
                    var total = 0.0;
                    var advances = 0.0;
                    var sss = 0.0;
                    var ot_hrs = 0.0;
                    var ot_mins = 0.0;
                    var undertime = 0.0;
                    var phil = 0.0;
                    let rpd = 0;
                    let rph = 0;
                    let totalOverTimeHrs = 0;
                    let totalOvertimeMins = 0;
                    let totalUndertimeDeductions = 0;
                    rsPayrollemps.forEach(function(model) {
                        var emp = employees.get(model.emp);
                        var total = parseFloat(emp.get('rpd')) * parseFloat(model.num_of_days);
                        
                        rph = Number(emp.get('rpd')) / 8;
                        rpm = Number(rph) / 60;

                        totalOverTimeHrs = Number(rph) * Number(model.ot_hrs);
                        totalOvertimeMins = Number(rpm) * Number(model.ot_mins);
                        totalUndertimeDeductions = Number(rph) * Number(model.undertime);

                        total += Number(totalOverTimeHrs);
                        total += Number(totalOvertimeMins);
                        total = Number(total) - Number(totalUndertimeDeductions);

                        over_all_total += total;

                        ot_hrs += parseFloat(totalOverTimeHrs);
                        ot_mins += parseFloat(totalOvertimeMins);  
                        undertime += parseFloat(totalUndertimeDeductions);
                    });
                    return {
                        net: over_all_total,
                        ot_hrs: ot_hrs,
                        ot_mins: ot_mins,
                        undertime: undertime
                    };
                }else { return 0; };
            },

        	init: function(length){
                var self = this;        

                $(function(){
                    if (length == 0) {
                        var output = '';
                        output += '<tr>';
                        output += '<td colspan="15" class="text-center">No payroll was found in this table.</td>';
                        output += '</tr>';
                        self.$el.html(output);
                    }
                });

                if(!self.collection.length){
                    $('#panel-payrolls').find('.panel-heading form').hide();
                }else {
                    $('#panel-payrolls').find('.panel-heading form').show();
                }
                
        	}
    
    });
   
    return ViewRecordListPayroll; 
});