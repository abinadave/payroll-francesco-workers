define(['underscore','backbone','models/pbreakdown'], function(_, Backbone, Pbreakdwn) {
   
    var Pbreakdowns = Backbone.Collection.extend({
    
    	model: Pbreakdwn,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			// console.log('new payroll breakdown was added');
    		});
    		this.on('remove', function(model){
    			// console.log('payroll breakdown successfully removed');
    		});
            this.on('reset', function(model) {
                pbreakdowns.function.getBreakdown(payrollemps);
            });
    	},

    	function: {
            
    		print: function(){
	    		pbreakdowns.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

	    	getIndividualBreakdown: function(model) {
                var total = parseInt(model.net);
                var breakNum = [500,100,50,20,10,5,1];
                breakNum.forEach(function(i) {
                    if (total >= i) {
                        var num = parseInt(total / i);
                        total -= num * i;
                        model[i] = num;
                    }else {
                        model[i] = 0;
                    }
                });
                return model;
            },

            getBreakdown: function(library) {
                setTimeout(function() {
                    library.forEach(function(model) {
                        var rs = payrolls.where({id: model.get('payroll_id')});
                        if (rs.length) {
                            var emp = payrolls.function.getIndividualBreakdown(model.toJSON());
                            emp.id = model.get('emp');
                            pbreakdowns.add(emp);
                        }
                    });
                }, 500);
            },

            breakdown: function(num) {
                var total = 0;
                pbreakdowns.forEach(function(model) {
                    var json = model.toJSON();
                    if (json[num] > 0){
                        total = total + json[num];
                    }
                });
                return total;
            }

    	}
    
    });
   
    return Pbreakdowns; 
});