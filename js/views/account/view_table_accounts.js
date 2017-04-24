define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_table_accounts.html'
	],  function(_, Backbone, template) {
   
    var ViewAccounts = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    $('#main').css({
                    	marginLeft: '0px'
                    });
                });


                $(document).ready(function() {
                    $('#check-all-accounts').change(function(event) {
                        /* Act on the event */
                        console.log(1)
                    });
                });

        	}
    
    });
   
    return ViewAccounts; 
});