define(['underscore','backbone','models/removed_overtime_payrollemp'], function(_, Backbone, Model) {
   
    var Removed_overtime_payrollemps = Backbone.Collection.extend({
        url: 'api.php/get/:removed_overtime_payrollemps',
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
    		});

            this.on('reset', function(model) {
                var currentId = overtime_payrollemps.currentId;
                var list =  overtime_payrollemps.function.findWorkers(currentId);
                overtime_payrollemps.subviews.appendList(list);
            });
    	},

    	function: {
	    	print: function(){
	    		removed_overtime_payrollemps.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	}
    	}
    

    });
   
    return Removed_overtime_payrollemps; 
});