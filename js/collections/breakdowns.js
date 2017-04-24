define(['underscore','backbone','models/breakdown'], function(_, Backbone, Breakdown) {
   
    var Breakdown = Backbone.Collection.extend({
    
    	model: Breakdown,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			// console.log('new Breakdown was added');
    		});
    		this.on('remove', function(model){
    			// console.log('Breakdown successfully removed');
    		});
            this.on('reset', function(model) {
                overtime_payrolls.function.getBreakdown();
            });
    	},
    
    	print: function(){
    		breakdowns.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Breakdown; 
});