define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Session = Backbone.Model.extend({
    	initialize: function(){
    		//console.log('Session model initialized');
    	},

    	defaults: {
    		id: 0,
    		usertype: 0,
    		fullname: 'no name'
    	}

    });
   
    return Session; 
});