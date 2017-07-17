define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Present = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){

    		});
    	}

    });
   
    return Present; 
});