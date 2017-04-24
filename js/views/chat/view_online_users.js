define(
	[
		'underscore',
		'backbone',
		'text!templates/chat/temp_online_users.html'
	],  function(_, Backbone, template) {
   
    var ViewOnlineUsers = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-online-users',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
                    $('#btnEnterGroupChat').click(function(event) {
                        /* Act on the event */
                        $('#modalChat').modal('show');
                        chats.subviews.appendList(chats);
                    });
                });
        	}
    
    });
   
    return ViewOnlineUsers; 
});