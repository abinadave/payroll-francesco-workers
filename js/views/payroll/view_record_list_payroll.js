define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_record_list_payroll.html',
        'libs/accounting.min',
        'libs/backbone.obscura'
	],  function(_, Backbone, template, acc, Obscura) {
   
    var ViewRecordListPayroll = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#record-list-payroll',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var proxy = new Obscura(self.collection);
                self.collection = proxy.setSort('true_date', 'desc');
                var output = self.template({'library': self.collection.toJSON(), 'accounting': acc });
                self.$el.append(output);
                self.init(self.collection.length);
    	        return self;
        	},
    
        	init: function(length){
                var self = this;        

                $(function(){
                    if (length == 0) {
                        var output = '';
                        output += '<tr>';
                        output += '<td colspan="15" class="text-center">No payroll was found in this table.</td>';
                        output += '</tr>';
                        self.$el.html(output);
                    }
                });

                if(!self.collection.length){
                    $('#panel-payrolls').find('.panel-heading form').hide();
                }else {
                    $('#panel-payrolls').find('.panel-heading form').show();
                }
                
        	}
    
    });
   
    return ViewRecordListPayroll; 
});