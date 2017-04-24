define([
	'underscore',
	'backbone',
	'models/overtime_payrollemp',
	'libs/backbone.obscura',
	'libs/accounting.min'
	], 
	function(_, Backbone, Overtime_payrollemp, Obscura, accounting) {
   
    var Overtime_payrollemps = Backbone.Collection.extend({
    	url:'api.php/overtime_payrollemps',
    	model: Overtime_payrollemp,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Overtime_payrollemp was added');
    			breakdowns.reset();
    		});
    		this.on('remove', function(model){
    			console.log('Overtime_payrollemp successfully removed');
    			overtime_payrollemps.function.afterRemove(model.attributes);
    			breakdowns.reset();
    		});
    		
    	},
    	
    	function: {

    		print: function(){
	    		overtime_payrollemps.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

	    	saveDB: function (json) {
	    		var a = selected_emps.length, b = 0, self = this;
	    		selected_emps.forEach(function(model) {
	    			var obj = _.pick(model.attributes,'firstname','lastname','hrs','min','rph','rpd','designation');
	    			obj.payroll_id = json.id; obj.emp_id = model.get('id'); obj.table = 'overtime_payrollemps';
	    			console.log(obj);
	    			$.post('ajax/save/save.php', $.param(obj) , function(data, textStatus, xhr) {
	    			}).success(function(data){

	    				var json = $.parseJSON(data);
	    				overtime_payrollemps.add(json);

	    				++b;

	    				if (a == b) {

	    					self.afterSave();
	    				}

	    			}).fail(function(xhr){
	    				console.log('cant save to database overtime_payrollempsertime payroll employees,  '+xhr.status);
	    			});

	    		});
	    	},

	    	afterSave: function() {
	    		router.alertify_success('Process Completed.');
				$('#modalOvertimeDate').modal('hide');
				setTimeout(function() {
					view_employee.render();
					router.employeeSubviews();
					selected_emps.reset();
				}, 1000);
	    	},

	    	afterRemove: function(model) {
	    		/*
					This is a callback after removing payroll employee..
	    		*/
	    		removed_overtime_payrollemps.add(model);
	    		if ($('#list-of-overtime-payrollemps').length) {
    				var currentId = overtime_payrollemps.currentId;
    				var list = this.findWorkers(currentId);
    				overtime_payrollemps.subviews.appendList(list);
    			};
	    	},

	    	fetchData: function() {
	    		var self = this;
	    		$.getJSON('ajax/select/select.php', { table: 'overtime_payrollemps' }, function(json, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(json){
	    			overtime_payrollemps.add(json, {silent: true});
	    			self.populateAll();
	    		}).fail(function(xhr){
	    			alert(' '+xhr.status);
	    		});
	    	},

	    	findWorkers: function (id) {
	    		var proxy = new Obscura(overtime_payrollemps);
	    		return proxy.filterBy('payroll_id', {payroll_id: id});
	    	},

	    	getTotal: function(pid) {
        		var total = 0.0;
        		overtime_payrollemps.forEach(function(model) {
        			if (model.get('payroll_id') === pid) {
        				total += Number(model.get('hrs')) * Number(model.get('rph'));
        			}
        		});
        		return total;
        	},

	    	populateAll: function() {
	    		overtime_payrolls.function.getBreakdown();
	    	},

	    	getPayrollempsIdOf: function(library, id) {
	    		var proxy = new Obscura(library);
	    		return proxy.filterBy('pid', {payroll_id: id});
	    	},

	    	sortEmps: function(emps, type) {
	    		var proxy = new Obscura(emps);
	    		return proxy.setSort('lastname', type);
	    	}
    
    	},

    	subviews: {

    		appendTable: function(list) {
    			require(['views/payroll/overtime/view_modal_overtime_payrollemps'], function(Subview){
    			    var view = new Subview({
    			    	collection: list
    			    });
    			});
    		},

    		appendList: function(list) {
    			require(['views/payroll/overtime/view_list_of_overtime_payrollemps'], function(Subview){
    			    var view = new Subview({
    			    	collection: list
    			    });
    			});
    		},

    		appendModalEdit: function(i) {
    			require(['views/payroll/overtime/view_modal_edit_payrollemps'], function(EditModal){
    			    var view = new EditModal({
    			    	model: i
    			    });
    			});
    		}
    	}
    	
    });
   
    return Overtime_payrollemps; 
});