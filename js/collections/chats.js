define(
	[
		'underscore',
		'backbone',
		'models/chat'
	],  function(_, Backbone, Chat) {
   
    var Chats = Backbone.Collection.extend({
    	initialize: function(){
    		//console.log('Chats collection initialize');

    		this.on('add', function(model){
    			console.log('new chat was added');
                console.log(model.attributes);
                pubnub.publish({channel: 'chats', message: {model, type: 'add', user: sessionStorage.getItem('id') }});
                chats.subviews.appendList(chats);
    		});

    		this.on('remove', function(model){
    			console.log('chat removed');
                console.log(model.attributes);
                pubnub.publish({channel: 'chats', message: {model, type: 'remove', user: sessionStorage.getItem('id') }});
    		});

    	},

    	function: {

            saveDB: function(form){
                $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    chats.add(json);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

    		print: function(){
    			chats.forEach(function(model) {
    				console.log(model.attributes); 
    			});
    		},

            afterReceiveChannel: function(model) {
                var rs = $('#modalChat').is(':visible');
                chats.subviews.appendList(chats);
            },

            fetchData: function() {
                var self = this;
                if (chats.length) {
                    self.populateAll();
                }else {
                    $.getJSON('ajax/select/select.php', { table: 'chats' }, function(json, textStatus, xhr) {
                        /*optional stuff to do after success */
                    }).success(function(json){
                        chats.add(json, {silent: true});
                        self.populateAll();
                    }).fail(function(xhr){
                        console.log(' '+xhr.status);
                    });
                }
            },

            subscribe: function(){  
               /* 
               
                 pubnub.subscribe({
                    channel: 'chats',
                    message: function(m){
                        console.log('channel conversations receive request');
                        var model = m.model;       
                            if (m.type == 'add' && m.user != sessionStorage.getItem('id')) {
                                chats.add(model, {silent: true});
                                chats.function.afterReceiveChannel(model);
                            }
                    }
                 });

               */
            },

            populateAll: function(arguments) {
                this.subscribe();
            }

    	},


    	subviews: {
            appendList: function(list) {
                require(['views/chat/view_list_of_chats'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            }
    	}


    });
   
    return Chats; 
});