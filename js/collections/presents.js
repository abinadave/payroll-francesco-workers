define(
	[
		'underscore',
		'backbone',
		'models/present',
        'libs/backbone.obscura',
        'collections/mycollection'
	],  function(_, Backbone, Present, emp, MyCollection) {
   
    var Presents = Backbone.Collection.extend({
        url: 'index.php/present',
    	model: Present,

    	initialize: function(){

    		this.on('add', function(model){
    			console.log('New Attendance was added');
    		});

    		this.on('remove', function(model){
                var json = model.toJSON();
                json.table = 'removed_presents';
                $.post('ajax/save/save.php', json, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                    removed_presents.add(model);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
    		});

    	},

    	//all functions
    	function: {

            isUphold: 0,

    		fetchData: function(){
                if (presents.length) {
                    presents.function.populateAll();
                }else {
                    $.getJSON('ajax/select/get_presents.php', function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        presents.function.saveModel(json, 1).populateAll();
                    }).fail(function(xhr){
                        alert(' '+xhr.status);
                    });
                }
    		},

    		saveModel: function(json, type) {
                presents.add(json, {silent: type});
                return this;
    		},

            saveNewInDB: function(uniqueid){
                $.post('ajax/save/save_new_present.php', { id: uniqueid, presence_id: presents.function.isUphold }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    if (data) {
                        presents.add({id: uniqueid, value: 0, presence_id: presents.function.isUphold}, {silent: true})
                    };
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

    		saveDB: function(response_id){
                
                $('#modalLoadingIndacator').modal({
                    backdrop: 'static',
                    keyboard: true
                }); 

                setTimeout(function() {
                    var proxy = presents.function.getPresentsWithZeroId();
                    var a = proxy.length;
                    var b = 0;     
                       
                    proxy.forEach(function(model) {

                        model.set({presence_id: response_id.toString(), value: model.get('value')});
                        var form = $.param(model.attributes);
                        form += '&table=presents';
               
                        $.post('ajax/save/save_attendance.php', form, function(data, textStatus, xhr) {
                            
                        }).success(function(data){
                            if ($.isNumeric(data)) {
                                ++b;
                                if (a == b) {
                                    presents.forEach(function(model) {
                                         if (model.get('presence_id') == 0) {
                                             model.set({presence_id: response_id.toString()});
                                         };
                                     });
                                    router.alertify_success('Attendance Successfully Saved');
                                     $('#modalLoadingIndacator').modal('hide');
                                     setTimeout(function() {
                                         router.navigate('Attendance', true);
                                     }, 500);
                                }   
                            }                          
                        }).fail(function(xhr){
                            alert(' '+xhr.status);
                        });
           
                    });

                }, 1000);
                
                
               
    		},

            getPresentsWithZeroId: function(){
                var lists = new MyCollection();
                presents.forEach(function(model) {
                    var rs = model.has('presence_id');
                    if(!rs){
                        lists.add(model);
                    }
                });
                return lists;
            },

            removeDB: function(ids){
                $.post('ajax/delete/delete_presents.php', { values: ids } , function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    if (data) {
                        ids.forEach(function(id) {
                            presents.function.removeModel(id);
                        });
                    };
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            removeModelWith0Id: function(){
                var ids = [];
                presents.forEach(function(model) {
                    if (model.get('presence_id') == 0) {
                        ids.push(model.get('id'));
                        //presents.remove(model.get('id'));
                    };
                });   
                ids.forEach(function(id) {
                    presents.function.removeModel(id);
                });
            },

            updateDB: function(library){
                var json = library.toJSON();
                var a = library.length;
                var b = 0;

                $('#modalLoadingIndacator').modal({
                    backdrop: 'static',
                    keyboard: true
                });  

                setTimeout(function() {
                    library.forEach(function(model) {
                       var thismodel = new Present({value: model.get('value'), id: model.get('id') });
                       $.post('ajax/update/edit_present.php', { values: thismodel.attributes }, function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){
                            if ($.isNumeric(data)) {
                                ++b;
                                if (a == b) {
                                    router.alertify_success('Process completed');
                                    $('#modalLoadingIndacator').modal('hide');
                                    setTimeout(function() {
                                        router.navigate('Attendance', true);
                                    }, 500);
                                    
                                }
                            }
                        }).fail(function(xhr){
                            alert(' '+xhr.status);
                        }); 
                    });
                }, 1000)

                
            
            },

            removeModel: function(id){
                 presents.remove(id);
            },

    		populateAll: function(){

    		},

    		print: function(){
    			presents.forEach(function(model) {
    				// if (model.get('value') == 1) {
                       console.log(model.attributes)
                    // };
    			});
    		}

    	},


    	//subviews
    	subviews: {

    	}


    });
   
    return Presents; 
});