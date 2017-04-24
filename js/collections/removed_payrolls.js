define(
	[
		'underscore',
		'backbone',
		'models/removed_payroll'
	],  function(_, Backbone, Model) {
   
    var Removed_payrolls = Backbone.Collection.extend({
    	
    	model: Model,

    	initialize: function(){

    		this.on('add', function(model){
    			var obj = model.toJSON();
    			removed_payrolls.function.saveDB(obj);
    		});

    		this.on('remove', function(model){
    			removed_payrolls.subviews.appendList(removed_payrolls, 0);
                removed_payrolls.function.removeDB(_.pick(model.attributes, 'id'));    
                var form = $.param(model.attributes);
                form+='&table=payrolls';      
                $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(json);
                    payrolls.add(json, {silent: true});
                }).fail(function(xhr){
                    console.log(' '+xhr.status);
                });
    		});

    	},

    		function: {

    			fetchData: function(){
    				if (removed_payrolls.length) {
                        console.log('haslenth')
                        removed_payrolls.subviews.appendList(removed_payrolls, 300);
                    }else{
                        $.getJSON('ajax/select/get_removed_payrolls.php', function(json, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(json){
                            removed_payrolls.add(json, {silent: true});
                            removed_payrolls.subviews.appendList(removed_payrolls, 300);
                        });
                    }
    			},

    			saveDB: function(obj){
    				$.post('ajax/save/save_removed_payrolls.php', obj , function(data, textStatus, xhr) {
	    				/*optional stuff to do after success */
	    			}).success(function(data){
	    				console.log(data);
	    			}).fail(function(xhr){
	    				alert(' '+xhr.status);
	    			});
    			},

                removeDB: function(i){
                    $.post('ajax/delete/delete_removed_payrolls.php', i , function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(data){
                        var json = $.parseJSON(data);
                        console.log(data);
                    }).fail(function(xhr){
                        alert(' '+xhr.status);
                    });
                },

                getTotal: function(payroll_id) {
                    
                },

    			print: function(){
		    		removed_payrolls.forEach(function(model) {
		    			console.log(model.attributes); 
		    		});
		    	}

    		},

    		subviews: {

                appendTable: function(){
                    require(['views/payroll/view_table_removed_payroll'], function(Table){
                        var view = new Table();
                    });
                },

                appendList: function(list, interval){
                    setTimeout(function() {
                        require(['views/payroll/view_list_of_removed_payrolls'], function(List){
                            var view = new List({
                                collection: list
                            });
                        });
                    }, interval);
                    return this;
                },

                list: function(list){
                    require(['views/payroll/view_list_of_removed_payrolls'], function(List){
                        var view = new List({
                            collection: list
                        });
                    });
                    return this;
                },

                appendModalRemovedPayroll: function(model) {
                    require(['views/payroll/view_modal_removed_overtime_payroll_view'], function(Subview){
                        var view = new Subview({
                            model: model
                        });
                    });
                }

    		}
    

    
    });
   
    return Removed_payrolls; 
});