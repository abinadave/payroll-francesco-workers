define(['underscore','backbone','models/selected_emp','libs/accounting.min','libs/backbone.obscura'], 
    function(_, Backbone, Selected_emp, accounting, Obscura) {
   
    var Selected_emps = Backbone.Collection.extend({
    
    	model: Selected_emp,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new selected_emp was added');
    		});
    		this.on('remove', function(model){
    			console.log('selected_emp successfully removed');
                this.function.afterRemove(model.attributes)
    		});
    	},

    	function: {
            getInitialWord(json){
                var id = json.id;
                let $td = $('#emp-'+id);
                let rpd = Number(json.rpd);
                let rph = Number(json.rph);
                let hrs = Number(json.hrs);
                let min = Number(json.min);
                console.log('hrs: ' + hrs + ', min: ' + min);
                var total = rph * hrs;
                let word = '';
                if (hrs === 0 && min !== 0) {
                    word = min + ' minute/s';
                }else if(hrs !== 0 && min === 0) {
                   word = hrs + ' hours/s';
                }else if(hrs !== 0 && min !== 0){
                   word = hrs + ' hours/s, and ' + min + ' minute/selected';
                }else {
                    // word = 'zero';
                }
                return word;
            },
            getDynamicWord(json){
                var id = json.id;
                let $td = $('#word-'+id);
                let rpd = Number(json.rpd);
                let rph = Number(json.rph);
                let hrs = Number(json.hrs);
                let min = Number(json.min);
                var total = rph * hrs;
                let word = '';
                if (hrs === 0 && min !== 0) {
                    word = (min > 0) ? min + ' minutes ' : 'minute';
                }else if(hrs !== 0 && min === 0) {
                   if (hrs === 1) {
                        word = hrs + ' hour'; 
                   }else if(hrs > 0) {
                        word = hrs + ' hours'; 
                   }
                }else if(hrs !== 0 && min !== 0){
                   if (hrs === 1) {
                        word = hrs + ' hour and ' + min + ' minutes'; 
                   }else if(hrs > 0) {
                        word = hrs + ' hours and ' + min + ' minutes'; 
                   }
                }else {
                    // word = 'zero';
                }
                $td.text(word);
            },
            getCurrentTotal(){
                let self = this;
                let json = {};
                let rpd = 0, rph = 0, hrs = 0, min = 0;
                let ratePerMin = 0, paymentForMinutes = 0, minTimesTotal = 0;
                let grandTotal = 0;
                let formatedMoney = 0;
                let total = 0;
                selected_emps.forEach(function(model){
                    json = model.attributes;
                    rpd = Number(json.rpd);
                    rph = Number(json.rph);
                    hrs = Number(json.hrs);
                    min = Number(json.min);
                    total = rph * hrs;
                    if (hrs === 0 && min !== 0) {
                        ratePerMin = rph / 60;
                        paymentForMinutes = Number(ratePerMin) * min;
                        minTimesTotal = paymentForMinutes + total;
                        grandTotal += minTimesTotal;
                    }else if(hrs !== 0 && min === 0) {
                        formatedMoney = accounting.formatNumber(total); 
                        grandTotal += total;
                    }else if(hrs !== 0 && min !== 0){
                        ratePerMin = rph / 60;
                        paymentForMinutes = Number(ratePerMin) * min;
                        minTimesTotal = paymentForMinutes + total;
                        grandTotal += minTimesTotal;
                    }else {
                        // $('#emp-'+id).text('0');
                    }
                });
                let grandTotalFormated = accounting.formatMoney(grandTotal, 'Php ', 2);
                $('#total-selected-emps').text(grandTotalFormated);
            },
    		print: function(){
	    		selected_emps.forEach(function(model) {
	    			console.log(model.attributes); 
	    		});
	    	},

	    	details: function() {
	    		console.log('This is for selected employees for overtime payroll.');
	    	},

            afterRemove: function(json) {
                $('tr#'+json.id).hide(400);
                this.getTotal();
            },

            getTotal: function() {
                var total = 0;
                selected_emps.forEach(function(model) { 
                    total += parseFloat(model.get('hrs')) * parseFloat(model.get('rph')); 
                });
                if (total > 0 ) {
                    $('#total-selected-emps').text(parseInt(accounting.formatMoney(total, ' ', 2)));
                    return total;
                }else {
                    $('#total-selected-emps').text(0);
                    return 0;
                }
            },

            sortName: function(type) {
                var proxy = new Obscura(selected_emps);
                return proxy.setSort('lastname', type);
            }

    	},

    	subviews: {
    		appendList: function(list) {
    			setTimeout(function() {
    				require(['views/payroll/overtime/view_list_of_selected_emps'], function(Subview){
	    			    var view = new Subview({
	    			    	collection: list
	    			    });
	    			});
    			}, 500)
    			
    		},

    		appendModalOvertimeDate: function() {
    			require(['views/payroll/overtime/view_modal_submit_overtime_date'], function(Subview){
    			    var view = new Subview();
    			});
    		}
    	}
    

    
    });
   
    return Selected_emps; 
});