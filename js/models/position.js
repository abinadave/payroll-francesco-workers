define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Position = Backbone.Model.extend({
    	initialize: function(){
    		this.on('change', function(){
    			console.log('model position has changed');
    		});
    	},

    	defaults: {
    		id: 0,
    		name: 'no name'
    	}

    });
   
    return Position; 
});