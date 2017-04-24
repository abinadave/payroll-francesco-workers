define(['underscore','backbone'], function(_, Backbone) {
   
    var Overtime_payrollemp = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                if (this.hasChanged('hrs')) {
                	var currentId = overtime_payrollemps.currentId;
                	var list = overtime_payrollemps.function.getPayrollempsIdOf(overtime_payrollemps, currentId);
                	overtime_payrollemps.subviews.appendList(list);
                    breakdowns.reset();
                };
    		});
    	}
    
    
    });
   
    return Overtime_payrollemp; 
});