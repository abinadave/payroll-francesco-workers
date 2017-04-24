define(['underscore','backbone','models/removed_present'], function(_, Backbone, Model) {
   
    var Removed_presents = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new removed_present was added');
    		});
    		this.on('remove', function(model){
    			console.log('removed_present successfully removed');
    		});
    	},

    	function: {

	    	print: function(){
	    		removed_presents.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

            fetchData: function() {
                if (removed_presents.length) {
                    // removed_presents.subviews.appendList(removed_presents);
                }else {
                    $.getJSON('ajax/select/select.php', { table: 'removed_presents' }, function(data) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        removed_presents.add(json);
                        // removed_presents.subviews.appendList(removed_presents);
                    });
                  
                }
            }

	    },

        subviews: {
            appendList: function(list) {
                
            }
        }
    
    });
   
    return Removed_presents; 
});