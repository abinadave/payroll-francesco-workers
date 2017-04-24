define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Chat = Backbone.Model.extend({
    	initialize: function(){
    		console.log('Chat model initialized');

    		this.on('change', function(){
    			console.log('chat was chaged');
    		});
    		
    	},
    	defaults: {
    		from: 0,
    		to: 0,
    		text: 'no text',
    		date: 'no date was posted',
    		time: 'no time was posted',
    		position: ''
    	}
    });
   
    return Chat; 
});