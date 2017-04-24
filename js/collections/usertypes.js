define(
	[
		'underscore',
		'backbone',
		'models/usertype',

		//views
		'views/usertype/view_list_of_usertype_in_modal'
	],  function(_, Backbone, Usertype, ViewListOfUsertypeInModal) {
   
    var Usertypes = Backbone.Collection.extend({

    	model: Usertype,

    	initialize: function(){

    		this.on('add', function(model){
    			console.log('New usertype was added');
    		});
    		this.on('remove', function(model){
    			console.log('Usertype successfully removed');
    		});
    	},

    	function: {
    		fetchData: function(){
    			if (usertypes.length) {
    				usertypes.function.populateAll();
    			}else {
    				$.getJSON('ajax/select/get_usertypes.php', function(json, textStatus) {
    						
    				}).success(function(json){
    					usertypes.function.saveModel(json, 1).populateAll();
    				});
    			}
    		},

    		saveModel: function(json, type){
    			usertypes.add(json, {silent: type});
    			return this;
    		},


    		populateAll: function(){
    			//code..
    			usertypes.subviews.appendUsertypesInModal();
                accounts.function.fetchData();
    			return this;
    		},

    		print: function(){
    			if (usertypes.length) {
    				usertypes.forEach(function(model) {
    					console.log(model.attributes); 
    				});
    			};
    		},

            getName: function(rid){
               var result = usertypes.where({id: rid});
               if (result.length) {
                    var usertype = usertypes.get(rid);
                    return usertype.get('name');
                }else {
                    return 'unknown usertype';
                }
                
            }
    	},

    	subviews: {
    		appendUsertypesInModal: function(){
    			var view = new ViewListOfUsertypeInModal({
    				collection: usertypes
    			});
    		}
    	}
    });
   
    return Usertypes; 
});