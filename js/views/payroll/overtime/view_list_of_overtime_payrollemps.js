define(
    [
    'underscore',
    'backbone',
    'text!templates/payroll/overtime/temp_list_of_overtime_payrollemps.html',
    'libs/accounting.min'
    ], 
    function(_, Backbone, template, Accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-overtime-payrollemps',
    
        	template: _.template(template),
    
            events: {

            },
    
        	render: function(){
        	    var self = this;
                require(['libs/accounting.min'], function(accounting){
                    // self.$el.off();
                    var list = overtime_payrollemps.function.sortEmps(self.collection, 'asc');
                    self.$el.empty();
                    var output = self.template({'library': list.toJSON(), 'accounting': accounting,
                    'self': self });
                    self.$el.append(output);
                    self.onRender();
                });
    	        return self;
        	},
        
            getWorkerTotalPay(json){
                let self = this;
                let rpd = 0, rph = 0, hrs = 0, min = 0;
                let ratePerMin = 0, paymentForMinutes = 0, minTimesTotal = 0;
                let grandTotal = 0;
                let formatedMoney = 0;
                let total = 0;
                rpd = Number(json.rpd);
                rph = Number(json.rph);
                hrs = Number(json.hrs);
                min = Number(json.min);
                console.log('rpd: ' + rpd);
                console.log('rph: ' + rph);
                console.log('hrs: ' + hrs);
                console.log('min: ' + min);
                console.log('============================');
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
                return grandTotal;
            },

        	onRender: function(){
                var self = this;
                
                $(function() {
                    self.$el.find('tr').click(function(event) {
                        var id = this.id;
                        console.log(event.currentTarget.nodeName)
                        var model = overtime_payrollemps.get(id);
                        var json = model.toJSON();
                        overtime_payrollemps.subviews.appendModalEdit(model);
                    });
                });

                $(function() {
                    self.$el.find('td').css({
                        'padding': '2.5px',
                        'white-space': 'nowrap'
                    });
                });

                $(function() {
                    if (Number(sessionStorage.getItem('usertype')) !== 2) {
                        self.$el.find('tr').off('click');
                    }
                });

                $(function() {
                    // alert(1)
                });
                

        	}
    
    });
   
    return Subview; 
});