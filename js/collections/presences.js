	define(
	[
		'underscore',
		'backbone',
		'models/presence',
		'views/attendance/view_list_of_saved_attendance'
	],  function(_, Backbone, Presence, ViewListOfSavedAttendance) {
   
    var Presences = Backbone.Collection.extend({

    	model: Presence,

    	initialize: function(){
    		//console.log('Collection Presences initialized');
    		this.on('add', function(model){
    			console.log('new presence was added');
    		});
    		this.on('remove', function(model){
    			this.function.afterRemove(model.get('id'));
    			this.subviews.appendListOfPresences();
    			var json = model.toJSON();
    			json.table = 'removed_presences';
    			$.post('ajax/save/save.php', json, function(data, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(data){
    				console.log(data);
    				removed_presences.add(model);
    			}).fail(function(xhr){
    				alert(' '+xhr.status);
    			});
    				
    		});
    	},

    	function: {

			fetchData: function(){
				if (presences.length) {
					presences.function.populateAll();
				}else {
					$.getJSON('ajax/select/get_saved_attendance.php', function(json, textStatus, xhr) {
						/*optional stuff to do after success */
					}).success(function(json){
						presences.function.saveModel(json, 1).populateAll();
					}).fail(function(xhr){
						alert(' '+xhr.status);
					});
				}
			},

			saveModel: function(json, type){
				presences.add(json, {silent: type});
				return this;
			},

	    	saveDB: function(){
	    		
	    		var thisdata = { 
	    			loc_id: payrolls.function.currentLocation_id, 
	    			loc_name: projects.function.getLocation(payrolls.function.currentLocation_id.toString()), 
	    			from: attendances.function.from, 
	    			to: attendances.function.to
	    		};

	    		$.post('ajax/save/save_presence.php', { values: thisdata  }, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			if (data) {
	    				var rsp_id = parseInt(data);
		    				presences.add({
		    					id: rsp_id.toString(), 
		    					from_date: thisdata.from, 
		    					to_date: thisdata.to, 
		    					loc_id: thisdata.loc_id, 
		    					loc_name: thisdata.loc_name
		    				});
	    				presents.function.saveDB(rsp_id);		
	    			};
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	removeDB: function(presence_id){
	    		$.post('ajax/delete/delete_presence.php', {id: presence_id} , function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			if (data) {
	    				presences.function.removeModel(presence_id);
	    				var ids = [];

	    				presents.forEach(function(model) {
	    					if (model.get('presence_id') == presence_id) {
	    						ids.push(model.get('id'))
	    					};
	    				});
	    
	    				presents.function.removeDB(ids);
	    			};
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	removeSavedAttendance: function(i){
	    		$.post('ajax/delete/delete_presence.php', { id: i }, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			presences.remove(i);
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	removeModel: function(id){
	    		presences.remove(id);
	    	},

	    	print: function(){
	    		presences.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

	    	populateAll: function(){
	    		presences.subviews.appendListOfPresences();
	    		presents.function.fetchData();
	    	},

	    	afterRemove: function(id){
	    		var ids = [];
	    		presents.forEach(function(model) {
	    			if (model.get('presence_id') == id) {
	    				ids.push(model.get('id'));
	    			};
	    		});

	    		ids.forEach(function(model) {
	    			presents.remove(model);
	    		});

	    		return this;
	    	}
    	},



    	//views
    	subviews: {
    		appendListOfPresences: function(){
    			var view = new ViewListOfSavedAttendance({
    				collection: presences
    			});
    			view.render();
    		}
    	}

    	

    });
   
    return Presences; 
});