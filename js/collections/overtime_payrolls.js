define(['underscore','backbone','models/overtime_payroll','moment','libs/backbone.obscura','libs/accounting.min'], 
	function(_, Backbone, Overtime_payroll, moment, Obscura, accounting) {
   
    var Overtime_payrolls = Backbone.Collection.extend({
    
    	model: Overtime_payroll,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Overtime_payroll was added');
    			breakdowns.reset();
    		});
    		this.on('remove', function(model){
    			overtime_payrolls.subviews.appendList(overtime_payrolls);
    			userlogs.function.saveDB('Overtime payroll was restored.');
    			breakdowns.reset();
    		});
    	},

    	function: {

    		print: function(){
	    		overtime_payrolls.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

	    	createUniqueId: function() {
                var id = 0, done = false;
                while(!done){
                    id = _.random(1,999999);
                    var rs = overtime_payrollemps.where({payroll_id: id.toString()});
                    if (!rs.length) {
                    	done = true;
                    }
                }
                return id;
            },     

	    	getIndividualBreakdown: function(emp) {
	    		var total = parseInt(parseFloat(emp.rph) * parseFloat(emp.hrs));
	    		var breakNum = [500,100,50,20,10,5,1];
	    		breakNum.forEach(function(i) {
	    			if (total >= i) {
		    			var num = parseInt(total / i);
		    			total -= num * i;
		    			emp[i] = num;
		    		}else {
		    			emp[i] = 0;
		    		}
	    		});
	    		return emp;
	    	},

	    	getBreakdown: function() {
                setTimeout(function() {
                    overtime_payrollemps.forEach(function(model) {
                        var rs = overtime_payrolls.where({id: model.get('payroll_id')});
                        if (rs.length) {
                        	var emp = overtime_payrolls.function.getIndividualBreakdown(model.toJSON());
                       		breakdowns.add(emp);
                        };
                    });
                }, 1000);
	    	},

	    	saveDB: function(form) {
	    		$.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			var json = $.parseJSON(data);
	    			json.id = overtime_payrolls.lastRandomId;
	    			overtime_payrolls.add(json);
	    			overtime_payrollemps.function.saveDB(json);
	    			// userlogs.function.saveDB('New overtime was saved, Location: ' + model.get('location_name') + '. Date: ' + model.get('date'));
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	fetchData: function() {
	    		var self = this;
	    		if (overtime_payrolls.length) {
	    			self.populateAll();
	    		}else {
	    			$.getJSON('ajax/select/select.php', {table: 'overtime_payrolls'}, function(json, textStatus, xhr) {
		    			/*optional stuff to do after success */
		    		}).success(function(json){
		    			overtime_payrolls.add(json);
		    			self.populateAll();
		    		}).fail(function(xhr){
		    			console.log(' '+xhr.status);
		    		});
	    		}
	    		
	    	},

	    	numOfWorkers: function(id) {
	    		return overtime_payrollemps.where({payroll_id: id}).length;
	    	},

	    	betweenTwoDates: function (from, to) {
	    		var list = new Backbone.Collection();
	    		var d1 = moment(from).subtract(1, 'd').format('dddd MMMM DD, YYYY');
	    		var d2 = moment(to).add(1, 'd').format('dddd MMMM DD, YYYY');

	    		overtime_payrolls.forEach(function(model) {
	    			 var result = moment(model.get('date')).isBetween(d1, d2);
	    			 if (result) {
	    			 	list.add(model);
	    			 };
	    		});

	    		return list;
	    	},
	    	
	    	sortDate: function(list) {
	    		var proxy = new Obscura(list);
	    		return proxy.setSort('date', 'desc');
	    	},

	    	afterConfirmDelete: function() {
	    		var model = overtime_payrolls.get(overtime_payrolls.toDelete.toString());
	    		var obj = model.toJSON();

	    		obj.table = 'removed_overtimes';
	    		$.post('ajax/save/save.php', obj, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			if (parseInt(obj.id) > 0) {
	    				overtime_payrolls.function.deleteOvertime(obj.id);
	    			};
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	deleteOvertime: function(i) {
	    		$.post('ajax/delete/delete.php', {
	    			table: 'overtime_payrolls',
	    			prop: 'id',
	    			id: i
	    		}, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			overtime_payrolls.remove(i);
	    			$('#ModalConfirm').modal('hide');
	    			router.alertify_success('Process completed');
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	populateAll: function() {
	    		overtime_payrollemps.function.fetchData();
	    		overtime_payrolls.subviews.appendList(overtime_payrolls);
	    	},

	    	getPayrollsWithIdOf: function(i) {
	    		
	    	},

	    	getTotal: function(i) {
	    		var proxy = new Obscura(overtime_payrollemps), total = 0.0;
	    		proxy.filterBy('payroll_id', {payroll_id: i});
	    		proxy.forEach(function(model) {
	    			var salary = parseFloat(model.get('rph')) * parseFloat(model.get('hrs'));
	    			total += Math.floor(salary);
	    		});
	    		
	    		return total;
	    	},

	    	breakdown: function(num) {
	    		var total = 0;
	    		breakdowns.forEach(function(model) {
	    			var json = model.toJSON();
	    			if (json[num] > 0){
	    				total = total + json[num];
	    			}
	    		});
	    		return total;
	    	}

    	},

    	subviews: {

    		appendTable: function() {
    			require(['views/payroll/overtime/view_table_overtime_payrolls'], function(Subview){
    			    var view = new Subview();
    			});
    		},

    		appendList: function(list) {
    			// setTimeout(function() {
    				require(['views/payroll/overtime/view_list_of_overtime_payrolls'], function(Subview){
	    			    var view = new Subview({
	    			    	collection: list
	    			    });
	    			});
    			// }, 500);
    		},

    		appendModalConfirmation: function(id) {
    			var overtime = overtime_payrolls.get(id);
    			require(['views/payroll/overtime/view_modal_confirm_delete'], function(ModalConfirm){
    			    var view = new ModalConfirm({
    			    	model: overtime
    			    });
    			    view.module = overtime_payrolls;
    			});
    		},

    		appendTabBreakDown: function(list) {
    			require(['views/payroll/overtime/view_tab_overtime_breakdown'], function(SubviewModal){
    			    var view = new SubviewModal({
    			    	collection: list
    			    });
    			});
    		},

    		appendOverAllTotal: function(list) {
    			require(['views/payroll/overtime/view_list_of_overall_total'], function(SubviewList){
    			    var view = new SubviewList({
    			    	collection: list
    			    });
    			});
    		}

    	}
    
    	
    
    });
   
    return Overtime_payrolls; 
});