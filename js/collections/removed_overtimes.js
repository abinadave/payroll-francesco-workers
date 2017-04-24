define(['underscore','backbone','models/removed_overtime',
    'moment'], function(_, Backbone, RO, moment) {
   
    var Removed_overtimes = Backbone.Collection.extend({
        url: 'api.php/removed_overtime',
    	model: RO,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new removed overtime was added');
    		});
    		this.on('remove', function(model){
    			console.log('model removed overtime removed');
                removed_overtimes.subviews.appendList(removed_overtimes);
    		});
    	},
    	

    	function: {

            fetchData: function() {
                if (removed_overtimes.length) {
                    removed_overtimes.subviews.appendList(removed_overtimes);
                }else {
                    $.get('ajax/select/get_removed_overtimes.php', {table: 'removed_overtimes'}, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(data){
                        removed_overtimes.add($.parseJSON(data));
                        removed_overtimes.subviews.appendList(removed_overtimes);
                    }).fail(function(xhr){
                        alert(' '+xhr.status);
                    });
                }
            },

    		print: function(){
	    		removed_overtimes.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

            setTotalAndWorkers: function(collections) {
                var total = 0, date = '', workers = 0;
                collections.forEach(function(model) {
                    total = overtime_payrollemps.function.getTotal(model.get('id')).toString();
                    date = moment(model.get('date')).format('MMMM DD, YYYY');
                    workers = overtime_payrollemps.where({payroll_id: model.get('id')}).length.toString();
                    model.set({
                        total: total,
                        date: date,
                        workers: workers
                    }, {silent: true});
                });
            },

            getListBetween: function(d1, d2) {
                var modelDate = '', found = new Backbone.Collection();
                removed_overtimes.forEach(function(model) {
                    modelDate = moment(model.get('date')).format('MMMM DD, YYYY');
                    if (moment(model.get('date')).isBetween(moment(d1).format('MMMM DD, YYYY'), moment(d2).format('MMMM DD, YYYY'))) {
                        found.add(model);
                    }
                });
                return found;
            }

    	},


    	subviews: {
    		appendPanel: function() {
    			require(['views/payroll/overtime/removed/view_panel_removed_overtimes'], function(Panel){
    			    var view = new Panel();
    			});
    		},

            appendTable: function() {
                require(['views/payroll/overtime/view_table_removed_overtimes'], function(ViewRemovedOvertime){
                    var view = new ViewRemovedOvertime(); 
                });
            },

            appendList: function(list) {
                require(['views/payroll/overtime/removed/view_list_of_removed_overtimes'], function(ListOfRemovedOvertime){
                    var view = new ListOfRemovedOvertime({
                        collection: list
                    });
                });
            },

            appendListOfRemovedOvertimes: function(list) {
                require(['views/payroll/overtime/removed/view_list_of_removed_overtimes_admin_side'], function(Subview1){
                    var view = new Subview1({
                        collection: list
                    });
                });
            },

            appendModalRemovedOvertime: function() {
                require(['views/payroll/overtime/removed/view_modal_removed_overtime_view'], function(Subview){
                    var view = new Subview();
                });
            }
    	}
    
    	
    
    });
   
    return Removed_overtimes; 
});