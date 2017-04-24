define(
	[
		'underscore',
		'backbone',
		'models/model',
        'libs/backbone.obscura'
	],  function(_, Backbone, Model, Obscura) {
   
    var Payrollemps_removed = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new emloyee was added in payrollemps_removed collection');
    			this.function.after(model.attributes);
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed in payrollemps_removed collection');
    			console.log(model.attributes)
                this.function.after(model.attributes);
    		});

    	},

    	function: {

    		print: function(){
	    		payrollemps_removed.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
    		},

    		after: function(model){

    			var payroll = payrolls.get(model.payroll_id);
    			var lists = payrolls.function.getEmployeesWherePayrollId(model.payroll_id);

    			payroll.set({
                        total: payrollemps_removed.function.getSum(lists.pluck('total')).toString(),
                        net: payrollemps_removed.function.getSum(lists.pluck('net')).toString(), 
                        advances_total: payrollemps_removed.function.getSum(lists.pluck('advances')).toString(),
                        sss_total: payrollemps_removed.function.getSum(lists.pluck('sss')).toString(),
                        phil_total: payrollemps_removed.function.getSum(lists.pluck('phil')).toString(),
                        rice_allowance_total: payrollemps_removed.function.getSum(lists.pluck('rice_allowance')).toString()
                    }, 
                    {silent: true});

    			payrolls.subviews.appendAllRecordsPayroll();
    			payrollemps.subviews.appendListOfPayrollEmps(model.payroll_id);
    		},

            getSum: function(arr){
                var sum = 0.0;
                arr.forEach(function(value) {
                    sum += parseInt(value);
                });
                return sum;
            },

            getEmpWherePayrollId: function(id){
                var proxy = new Obscura(payrollemps_removed);
                return proxy.filterBy('payroll_id', {payroll_id: id});
            },

            search: function(collection, value){
                collection.forEach(function(model) {
                    // $.each(model.attributes, function(index, val) {
                         // if (model.get(index).indexOf(value) !== -1) {
                            console.log(model.attributes);
                         // }
                    // });
                });
                console.log(value);
                // var found = [];
                // collection.forEach(function(model) {
                //     $.each(model.attributes, function(index, val) {
                //         if (model.get(index).toLowerCase().indexOf(value) !== -1) {
                //             found.push(model);
                //         }
                //     });
                // });
                // return found;
            }

    	},

    	subviews: {

            appendModalRemovedEmployees: function(){
                require(['views/payroll/view_table_payrollemps_removed'], function(Subview){
                    var view = new Subview();
                });
                return this;
            },

            appendRetreivedRemovedEmployees: function(lists){
                require(['views/payroll/view_list_of_payrollemps_removed'], function(Subview){
                    var view = new Subview({
                        collection: lists
                    });
                });
                return this;
            }

    	}
    	
    
    });
   
    return Payrollemps_removed; 
});