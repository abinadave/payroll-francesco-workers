define(['underscore','backbone',
	'models/recycle_employee'], function(_, Backbone, Recycle_employee) {
   
    var Recycle_employees = Backbone.Collection.extend({
        url: 'api.php/recycle_employees',
    	model: Recycle_employee,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Recycle_employees was added');
    		});
    		this.on('remove', function(model){
    			console.log('Recycle_employees successfully removed');
    		});
    	},
    
    	print: function(){
    		recycle_employees.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Recycle_employees; 
});