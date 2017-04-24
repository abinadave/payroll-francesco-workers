define(['underscore','backbone', 'libs/accounting.min'], function(_, Backbone, accounting) {
   
    var Selected_emp = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                if (this.hasChanged('min') || this.hasChanged('hrs')) {
                    var id = this.get('id');
                    let $td = $('#emp-'+id);
                    let json = this.attributes;
                    let rpd = Number(json.rpd);
                    let rph = Number(json.rph);
                    let hrs = Number(json.hrs);
                    let min = Number(json.min);
                    var total = parseFloat(this.get('rph')) * parseFloat(this.get('hrs'));
                    if (hrs === 0 && min !== 0) {
                        let ratePerMin = rph / 60;
                        let paymentForMinutes = Number(ratePerMin) * min;
                        let minTimesTotal = paymentForMinutes + total;
                        $td.text(accounting.formatMoney(minTimesTotal, '', 2));
                    }else if(hrs !== 0 && min === 0) {
                        var formatedMoney = accounting.formatNumber(total); 
                        $('#emp-'+id).text(formatedMoney);
                        selected_emps.function.getTotal();
                    }else if(hrs !== 0 && min !== 0){
                        let ratePerMin = rph / 60;
                        let paymentForMinutes = Number(ratePerMin) * min;
                        let minTimesTotal = paymentForMinutes + total;
                        $td.text(accounting.formatMoney(minTimesTotal, '', 2));
                    }else {
                        $('#emp-'+id).text('0');
                    }
                    selected_emps.function.getDynamicWord(json);
                    selected_emps.function.getCurrentTotal();
                };
    		});
    	},
    	
        defaults: {
            min: 0,
            hrs: 0
        }
    
    });
   
    return Selected_emp; 
});