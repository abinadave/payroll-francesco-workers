define(
    [
        'underscore',
        'backbone',
        'text!templates/payroll/overtime/removed/temp_list_of_removed_overtimes.html',
        'libs/backbone.obscura',
        'moment'
    ],
	function(_, Backbone, template, Obscura, moment) {
   
    var ViewList = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-removed-overtime-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                   $('#no-of-rovertimes').text(self.collection.length);
                   if (!self.collection.length) {
                       self.$el.html('<tr><td colspan="7">No Overtime Payroll was found at this time.</td></tr>');
                   }
                });

                $(function() {

                     
                        // require(['datatable','DT-bootstrap'], function(){
                        //     $('#table-removed-overtimes').dataTable();

                        //     $('.dataTables_filter').find('label').css({
                        //         'margin-top': '-7%'
                        //     });
                            
                        // });

                    

                });

        	}
    
    });
   
    return ViewList; 
});