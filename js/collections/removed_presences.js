define(['underscore','backbone','models/removed_presence','libs/backbone.obscura'], 
    function(_, Backbone, Removed_presence, Obscura) {
   
    var Removed_presences = Backbone.Collection.extend({
    
    	model: Removed_presence,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Removed_presence was added');
    		});
    		this.on('remove', function(model){
    			console.log('Removed_presence successfully removed');
    		});
    	},

    	function: {
    		print: function(){
	    		removed_presences.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

            fetchData: function() {
                if (removed_presences.length) {
                    removed_presences.subviews.appendList(removed_presences);
                }else {
                    $.getJSON('ajax/select/select.php', { table: 'removed_presences' }, function(data) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        removed_presences.add(json);
                        removed_presences.subviews.appendList(removed_presences);
                    });
                  
                }
            },

            getModels: function(i) {
                var proxy = new Obscura(removed_presents);
                return proxy.filterBy('presence_id', {presence_id: i});
            }
            
    	},

    	subviews: {
            appendList: function (list) {
                require(['views/attendance/removed/view_list_of_removed_presents'], function(SubviewLIst){
                    var view = new SubviewLIst({
                        collection: list
                    });
                });
            },

            appendPrintableTable: function() {
                require(['views/attendance/removed/view_modal_table_removed_print_attendance'], function(SubviewTable){
                    var table = new SubviewTable();
                });
            }
    	}
    
    	
    
    });
   
    return Removed_presences; 
});