define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Debt = Backbone.Model.extend({

    	initialize: function(){
    		this.on('change', function(){
    			var json = this.attributes;
                   console.log(json);
    		});
    	},

    	defaults: {
    		id: 0,
    		fullname: 'no name',
    		value: 0.0
    	}

    });
   
    return Debt; 
});