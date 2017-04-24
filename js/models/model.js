define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Model = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	},
    
    	defaults: {
    		
    	}
    
    });
   
    return Model; 
});