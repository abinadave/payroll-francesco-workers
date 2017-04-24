define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Removed_payrolls = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    	}
    
    });
   
    return Removed_payrolls; 
});