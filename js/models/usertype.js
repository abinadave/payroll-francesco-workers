define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Usertype = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){
    			console.log(' model usertype changed ');
    		});
    	},

    	defaults: {
    		id: 0,
    		name: 'unknown'
    	}
    	
    });
   
    return Usertype; 
});