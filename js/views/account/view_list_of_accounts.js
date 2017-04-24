define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_list_of_accounts.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfAccounts = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-accounts',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfAccounts; 
});