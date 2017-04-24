define(
	[
		'underscore',
		'backbone',
		'models/payrollemp',
        'libs/backbone.obscura',
        'libs/accounting.min',
        //subviews
        'views/payroll/view_modal_table_payrollemps',
        'views/payroll/view_list_of_payrollemps',
        'views/payroll/view_modal_breakdown',
        'views/payroll/view_edit_payrollemps'
	],  function(_, Backbone, Payrollemp, Obscura, accounting, ViewModalTablePayrollEmps, 
        ViewListOfPayrollEmps, ViewModalBreakDown, ViewEditPayrollEmps) {
   
    var Payrollemps = Backbone.Collection.extend({

    	model: Payrollemp,

    	initialize: function(){
    		//console.log('Collection Payrollemps initialized');
    		this.on('add', function(model){
    			console.log('New payroll employee was added');
    		});
    		this.on('remove', function(model){
    			this.function.afterRemoved(model.attributes);
    		});            
    	},

    	function: {

            fetchData: function(){
                if (payrollemps.length) {
                    payrollemps.function.populateAll();
                }else {
                    $.getJSON('ajax/select/get_payrollemps.php', function(json, textStatus, xhr) {
                        /*optional stuff to do after success */                        
                    }).success(function(json){
                         payrollemps.function.saveModel(json, 1);
                         payrollemps.function.populateAll();
                    }).fail(function(xhr){
                        alert(' '+xhr.status);
                    });
                }
            },

            saveModel: function(json, type){
                payrollemps.add(json, {silent: type});
                return this;
            },

            populateAll: function(){
                payrollemps.subviews.appendModalBreakdown();
                payrolls.function.fetchData();
                accounts.function.fetchData();
                payrollemps.function.ifEmployee();
                pbreakdowns.function.getBreakdown(payrollemps);
                return this;
            },

            ifEmployee: function(){
               if(sessionStorage.getItem('usertype') == 3){
                    var lists = payrollemps.function.getMyPreviousSalaries();
                    employees.subviews.appendMySalaries(lists);
               }
            },

            getUndertime: function(json) {
                var total = (Math.floor(json.rpd) / 8) * Number(json.nhl);
                if (isNaN(total)) {
                    return 0;
                }else {
                    return accounting.formatMoney(total,' ', 0);                    
                }
            },

            getMyPreviousSalaries: function(){
                var proxy = new Obscura(payrollemps);
                return proxy.filterBy('employee', {emp: sessionStorage.getItem('id')});
            },

            print: function(){
                if (payrollemps.length) {
                    payrollemps.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                };
                return this;
            },

            edit: function(p_id, emp_id){
                var result = payrollemps.where({payroll_id: p_id.toString(), emp: emp_id.toString()});
               
                if(result.length){
                    var model = payrollemps.findWhere({payroll_id: p_id.toString(), emp: emp_id.toString()});
                    $('#modalEditPayrollEmps').modal();

                    $('#modalEditPayrollEmps').find('span#emp-name').text(model.get('emp')).end()
                    .find('#number-of-days').val(model.get('num_of_days')).end()
                    .find('#emp-advances').val(model.get('advances')).end()
                    .find('#emp-sss').val(model.get('sss')).end()
                    .find('#emp-phil').val(model.get('phil')).end()
                    .find('#payroll-id').val(p_id).end()
                    .find('#emp').val(emp_id).end()
                    .find('#nhl').val(accounting.formatMoney(model.get('nhl'),'',1));

                     var result = employees.where({id: emp_id.toString()});
                     if (result.length) {
                        var emp = employees.get(emp_id.toString());
                        var fullname = emp.get('lastname') + ', ' + emp.get('firstname');
                        $('#modalEditPayrollEmps').find('span#emp-name').text(fullname);
                     };
                }
               
            },

            calculate_breakdown: function(id){
                payrollemps._1000 = 0; payrollemps._500 = 0; payrollemps._200 = 0; payrollemps._100 = 0; payrollemps._50 = 0; payrollemps._20 = 0; payrollemps._10 = 0; payrollemps._5 = 0;

                var MyCollection = Backbone.Collection.extend({
                    initialize: function(){
                        console.log('Collection initialize')
                    }
                });

                var myCollection = new MyCollection();

                payrollemps.forEach(function(model) {
                    if (model.get('payroll_id') == id) {
                        myCollection.add(model.attributes);
                    }
                });

                myCollection.forEach(function(model) {
                     var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 1000) {
                        var result = parseInt(net_amount / 1000);
                        payrollemps._1000 += result;
                        var rsTotal = result * 1000;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }     
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 500) {
                        var result = parseInt(net_amount / 500);
                        payrollemps._500 += result;
                        var rsTotal = result * 500;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 200) {
                        var result = parseInt(net_amount / 200);
                        payrollemps._200 += result;
                        var rsTotal = result * 200;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 100) {
                        var result = parseInt(net_amount / 100);
                        payrollemps._100 += result;
                        var rsTotal = result * 100;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 50) {
                        var result = parseInt(net_amount / 50);
                        payrollemps._50 += result;
                        var rsTotal = result * 50;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 20) {
                        var result = parseInt(net_amount / 20);
                        payrollemps._20 += result;
                        var rsTotal = result * 20;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 10) {
                        var result = parseInt(net_amount / 10);
                        payrollemps._10 += result;
                        var rsTotal = result * 10;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 5) {
                        var result = parseInt(net_amount / 5);
                        payrollemps._5 += result;
                        var rsTotal = result * 5;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });

                myCollection.forEach(function(model) {
                    var net_amount = parseFloat(model.get('net'));
                     if (net_amount >= 1) {
                        var result = parseInt(net_amount / 1);
                        payrollemps._1 += result;
                        var rsTotal = result * 1;
                        var total = parseFloat(model.get('net')) - rsTotal;
                        model.set({net: total});
                     }   
                });
            },

            afterRemoved: function(model){
                payrollemps_removed.add(model);
            },

            updateHasAllowance: function(obj){
                $.post('ajax/update/update_has_allowance.php', obj, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    if (json.success) {
                        var emp = payrollemps.findWhere({payroll_id: obj.payroll_id, emp: obj.emp});
                        emp.set({has_allowance: obj.has.toString()});
                    };
                }).fail(function(xhr){
                    console.log('Cant update has_allowance: '+xhr.status);
                });
            },

            updateRiceAllowance: function(obj){
                $.post('ajax/update/update_rice_allowance.php', obj, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            getPayrollempsIdOf: function(collection, pid){
                var Obscura = require('libs/backbone.obscura');
                var proxy = new Obscura(collection);
                return proxy.filterBy('pid', {payroll_id: pid});
            },

            getTotalOfPayroll: function(i) {
                // var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
                // => 6
                var proxy = new Obscura(payrollemps), total = 0;
                proxy.filterBy('payroll_id', {payroll_id: i});
                proxy.forEach(function(model) {
                    total += Number(model.get('num_of_days')) * Number(model.get('rpd')); 
                });
                return total;
            },

            getEmpsAndSort: function(proxy) {
                var emp = {};
                var clone = proxy.clone();
                clone.forEach(function(model) {
                    var rs = employees.where({id: model.get('emp')});
                    if (rs.length) {
                        emp = employees.get(model.get('emp'));
                        model.set({lastname: emp.get('lastname')}, {silent: true});
                    }else {
                        model.set({lastname: 'Employee deleted'}, {silent: true});
                    }
                });
                return clone;
            }


    	},

        _1000: 0,
        _500: 0,
        _200: 0,
        _100: 0,
        _50: 0,
        _20: 0,
        _10: 0,
        _5: 0,
        _1: 0,


    	subviews: {

            appendModalViewPayrolEmps: function(id){
                var view = new ViewModalTablePayrollEmps();
                view.render(id);
                return this;
            },

            appendListOfPayrollEmps: function(id){
                var proxy = new Obscura(payrollemps);
                proxy.filterBy('payroll_id', {payroll_id: id});
                var sortedCollection = payrollemps.function.getEmpsAndSort(proxy);
                var proxy2 = new Obscura(sortedCollection);
                proxy2.setSort('lastname','asc');
                var view = new ViewListOfPayrollEmps({
                    collection: proxy2
                });
                view.render(id);
                return this;
            },

            appendModalBreakdown: function(){
                var view = new ViewModalBreakDown();
                view.render();
            },

            appendModalEditPayrollEmps: function(){
                var view = new ViewEditPayrollEmps();
                view.render();
            },

            appendListRemovedPayrolls: function(list) {
                require(['views/payroll/view_list_of_payrollemps_removed_payroll'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }

    	}
    });
   
    return Payrollemps; 
});