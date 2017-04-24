define(
	[
		'underscore',
		'backbone',
		'models/position',

		//subviews
		'views/position/view_list_of_positions_in_modal',
        'views/position/view_list_of_position_in_modal_update_employee',
        'views/position/view_list_of_designation'
	],  

	function(
		_, 
		Backbone, 
		Position, 

		//subviews
		ViewListOfPositionsInModal,
        ViewListOfPositionInModalUpdateEmployee,
        ViewListOfDesignation
	){
   
    var Positions = Backbone.Collection.extend({
        url: 'api.php/position',
    	model: Position,

    	initialize: function(){
    		//console.log('Collection Positions initialized');
    		this.on('add', function(model){
    			console.log('new position was added' + model.get('id'));
                positions.subviews.appendListOfDesignation();
                positions.subviews.appendListOfPositionsInModal();
                positions.subviews.appendListOfPositionsInModalUpdateEmployee();
    		});

    		this.on('remove', function(model){
    			console.log('position successfully removed' + model.get('id'));
                positions.subviews.appendListOfDesignation();
                positions.subviews.appendListOfPositionsInModal();
                positions.subviews.appendListOfPositionsInModalUpdateEmployee();
    		});
    	},

    	function: {

            sortName(list, Obscura){
                var proxy = new Obscura(list);
                return proxy.setSort('name','asc');
            },

    		fetchData: function(){
	    		if (positions.length) {
	    			positions.function.populateAll();
	    		}else {
	    			$.getJSON('ajax/select/get_positions.php', function(json, textStatus) {
	    				/*optional stuff to do after success */
	    			}).success(function(json){
	    				positions.function.saveModel(json, 1);
	    				positions.function.populateAll();
	    			});	
	    		}			
    		},

            saveDB: function(value){
                $.post('ajax/save/save_designation.php', { name: value }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-save-designation').html(data);
                }).success(function(data){
                   $('#designation').val('');
                   $('#designation').focus();
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

    		saveModel: function(json, type){
    			positions.add(json, {silent: type});
    		},

            removeDB: function(did){
                $.post('ajax/delete/delete_designation.php',{ id: did }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    if (data) {
                        positions.remove(did);
                    };
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

    		populateAll: function(){
                // alert('nice')
                positions.subviews.appendListOfDesignation();
    			positions.subviews.appendListOfPositionsInModal();
                positions.subviews.appendListOfPositionsInModalUpdateEmployee();
                positions.subviews.afterFetching();
                projects.function.fetchData();
    		},

    		print: function(){
    			if (positions.length) {
    				positions.forEach(function(model) {
    					console.log(model.attributes); 
    				});
    			}else {
    				console.log('length of collection: 0');
    			}
    		},

            getName: function(rid){
                var result = positions.where({id: rid});
                if (result.length) {
                    var position = positions.get(rid);
                    return position.get('name');
                }else {
                    return 'uknown position';
                }
            },

            searchAndreturnIds: function(value){
                var location_id = 0;
                var result = positions.where({name: value});
                if (result.length) {
                    var position = positions.findWhere({name: value});
                    return position.get('id');
                }
            }

    	},

    	subviews: {

    		appendListOfPositionsInModal: function(){
    			var view = new ViewListOfPositionsInModal({
    				collection: positions
    			});
    			view.render();
    		},

            appendListOfPositionsInModalUpdateEmployee: function(){
                var view = new ViewListOfPositionInModalUpdateEmployee({
                    collection: positions
                });
                view.render();
            },

            appendListOfDesignation: function(){
                var view = new ViewListOfDesignation({
                    collection: positions
                });
                view.render();
            },

            afterFetching: function(){
                // $('#sign-in-as').text(positions.function.getName(sessionStorage.getItem('usertype')));
            },

            appendListInEmpPics(list){
                require(['views/position/view_list_of_positions_in_emp_pics'], 
                    function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }

    	}

    });
   
    return Positions; 
});