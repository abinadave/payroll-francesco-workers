define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Collection = Backbone.Collection.extend({
    
    	model: '',
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
    		});
    	},

    	function: {
    		
    		print: function(){
    		
	    	},

	    	fetchData: function(){

	    	},

	    	saveDB: function(){

	    	},

	    	removeDB: function(){
	    		
	    	}
    	},
    
    	
    
    });
   
    return Collection; 
});