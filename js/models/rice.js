define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Rice = Backbone.Model.extend({

    	initialize: function(){
    		this.fetchData();
    	},

        fetchData: function(){
            $.getJSON('ajax/select/get_rice.php', function(json, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(json){
                rice.set({price: json})
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

    	defaults: {
    		price: 0
    	}

    });
   
    return Rice; 
});