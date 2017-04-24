define(
	[
		'underscore',
		'backbone',
		'text!templates/chat/temp_chatbox.html'
	],  function(_, Backbone, template) {
   
    var ViewChatBOx = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-chat',
    
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
                    
                    $('#form-chat-box').submit(function(event) {
                        event.preventDefault();
                        var id = $('#modalChat').find('#chat-id').val();
                        var value = $('#chat-text').val();
                        var subs_id = 'emp-'+id;
                        var date = new Date();
                        var result = accounts.where({id: accounts.currentSession});
                        if (result.length) {
                            var acc = accounts.get(accounts.currentSession);
                            //publish..
                        }else {
                            $('#chat-text').val('');
                        }

                      $('#chat-text').val('');
                      $('#chat-text').focus();

                      require(['moment'], function(moment){                    
                          var obj = {
                             sender_id: sessionStorage.getItem('id'),
                             sender_name: sessionStorage.getItem('firstname'),
                             message: value,
                             date: moment().format("YYYY-MM-DD HH:mm:ss"),
                             table: 'chats'
                          };
                          chats.function.saveDB($.param(obj));
                      });

                       


                    });
                });
        	}
    
    });
   
    return ViewChatBOx; 
});