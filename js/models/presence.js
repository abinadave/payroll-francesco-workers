define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Presence = Backbone.Model.extend({

    	initialize: function(){
    		console.log('Model presence initialized');
    	},

    	defaults: {
    		id: 0,
    		from_date: 0,
    		to_date: 0,
            loc_id: 0,
            loc_name: 'uknown location'
    	}
    	
    });
   
    return Presence; 
});