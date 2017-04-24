define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Online = Backbone.Model.extend({
    	initialize: function(){
    		
    	},
    	defaults: {
    		account_id: 0
    	}
    });
   
    return Online; 
});