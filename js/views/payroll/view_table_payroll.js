define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_table_payroll.html',
        'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewTablePayroll = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-table-payroll',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #print-payroll': 'printPayroll',
                'click #save-payroll': 'savePayroll'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'attend': attendances.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                
                $(function(){
                    
                    //jQuery
                    if (attendances.length) {

                        var first = attendances.first(), display_date = '', from = '', to = '';

                        if (employees.where({id: first.get('id')})) {
                            var emp = employees.get(first.get('id'));
                            $('#modalTablePayroll').find('#payroll-location').text(projects.function.getLocation(emp.get('location')).toUpperCase())
                        }
                        
                        from = attendances.function.from;
                        to = attendances.function.to;

                        var date_from = moment(from);
                        var date_to = moment(to);
                        var dateObj = new Date();
                        var from_date_format = date_from.format('DD');
                        var from_month_format = date_from.format("MMMM");

                        var to_date_format = date_to.format('DD');
                        var to_month_format = date_to.format("MMMM");

                        display_date = from_month_format + ' ' + from_date_format;
                        display_date += ' to ' + to_month_format + ' ' + to_date_format + ', ' + dateObj.getFullYear();
                        $('#payroll-period').text(display_date);
                    }
                });


        	},

            printPayroll: function(event){
                var $table = $('#div-table-payroll').html();
                $('body').html($table);
                $('title').text('Payroll');
            },

            savePayroll: function(event){
                var data = {};
                var date = new Date();
                data.date_from = moment(attendances.function.from).format('MMMM DD, YYYY');
                data.date_to = moment(attendances.function.to).format('MMMM DD, YYYY');
                data.total = attendances.function.getTotal();
                data.advances_total = attendances.function.getAdvancesTotal();
                data.sss_total = attendances.function.getSSSTotal();
                data.phil_total = attendances.function.getPhilTotal();
                data.rice_allowance_total = attendances.function.getRiceAllowanceTotal();
                data.net = attendances.function.getOverAllTotal();
                data.date = moment().format('MMMM DD, YYYY');
                data.time = date.toLocaleTimeString().replace(/:\d+ /, ' ');
                data.location = payrolls.function.currentLocation;
                data.location_id = payrolls.function.currentLocation_id;
                data.true_date = router.getDate();
                payrolls.function.saveDB(data);
            }
    
    });
   
    return ViewTablePayroll; 
});