define(
	[
		'underscore',
		'backbone',
		'models/dept',
        'libs/accounting.min'
	],  function(_, Backbone, Debt, accounting) {
   
    var Debts = Backbone.Collection.extend({

    	model: Debt,

    	initialize: function(model){
    		this.on('add', function(){
    			console.log('new backaccount was added');
    		});
    		this.on('remove', function(){
    			console.log('backaccount was removed');
    		});
    	},

        function: {

            fetchData: function(){
                if (debts.length) {
                    debts.function.done();
                }else {
                    $.getJSON('ajax/select/get_debts.php', function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        debts.function.saveModel(json, 1);
                        debts.function.done();
                    }).fail(function(xhr){
                        console.log(' error while fetching debts '+xhr.status);
                    });
                }
            },

            saveModel: function(json, type){
                debts.add(json, {silent: type});
                if (type == 0) {
                    router.alertify_success('Process completed');
                }
            },

            print: function(){
                debts.forEach(function(model) {
                    console.log(model.attributes); 
                });
            },

            getCashPayable: function (i) {
                var rs = debts.where({id: i.toString()});
                if (rs.length) {
                     var model = debts.get(i);  
                     return accounting.formatMoney(model.get('value'),' ', 2);   
                }else {
                    return 0;
                }
            },

            done: function() {
               var fragment = Backbone.history.fragment;
               if (fragment == 'Debts') {
                    debts.subviews.appendTable(); 
               }; 
            },

            updatePerson: function(id, value) {
                var debt = debts.get(id);
                debt.set({value: value});
            }
            
        },

        subviews: {

            appendTable: function(arguments) {
                require(['views/debt/view_modal_table_debts'], function(ViewModalDebts){
                    var view = new ViewModalDebts();
                });
            },

            appendList: function(list) {
                require(['views/debt/view_list_of_debts'], function(ListOfDebts){
                    var view = new ListOfDebts({
                        collection: list
                    });
                });
            },

            appendModalPay: function(debt) {
                require(['views/debt/view_modal_input_pay_debt'], function(ViewModal){
                    var view = new ViewModal({
                        model: debt
                    });
                });
            }

        }

    	
    });
   
    return Debts; 
});