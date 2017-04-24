define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Present = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){
    			console.log(this.changedAttributes());
                
    		});
    	}

    });
   
    return Present; 
});