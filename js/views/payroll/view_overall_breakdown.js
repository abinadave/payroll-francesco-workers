define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_overall_breakdown.html',
		'libs/accounting.min'
	],  function(_, Backbone, template, acc) {
   
    var ViewOverAllBreakDown = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnPrintOverAllBreakDown': 'printOverAllBreakDown'
            },
    
        	render: function(){
        	    var self = this;
                console.log('rendering')
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'accounting': acc});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
               var self = this;

               $(function() {
                    var ids = self.getChecked();
                    var list = payrolls.function.getPayrollWithIdOf(ids);
                    payrolls.subviews.appendOverAllTotal(list);
               });

               $(function() {
                   self.$el.find('#modalPayrollBreakdown').modal('show');
               });

	                (function() {

      					    var beforePrint = function() {
      					        console.log('Functionality to run before printing.');
      					    };

      					    var afterPrint = function() {
      					       view_navigation.render();
      					       $('#main').empty();
      					       router.navigate('Payroll', true);
      					    };

      					    if (window.matchMedia) {
      					        var mediaQueryList = window.matchMedia('print');
      					        mediaQueryList.addListener(function(mql) {
      					            if (mql.matches) {
      					                beforePrint();
      					            } else {
      					                afterPrint();
      					            }
      					        });
      					    }

      					    window.onbeforeprint = beforePrint;
      					    window.onafterprint = afterPrint;

      					}());

        	},

          getChecked: function() {
                var self = this, ids = [];
                $('#record-list-payroll').find('input[type="checkbox"]:checked').each(function(index, el) {
                    ids.push($(this).val());
                });
                return ids;
          },

        	printOverAllBreakDown: function(event){
        		var html = $('#modalOverAllBreakdown').find('#div-table-overall-breakdown').html();
        		$('#modalOverAllBreakdown').modal('hide');
        		setTimeout(function(){
        			$('#main').html(html);
        			$('#navigation').empty();
        			window.print();
        		}, 500);

        	}
    
    });
   
    return ViewOverAllBreakDown; 
});