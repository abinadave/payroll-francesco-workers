define(
	[
		'underscore',
		'backbone',
		'models/account',

		//subviews
		'views/account/view_form_add_accounts',
        'views/account/view_list_of_accounts',
        'views/chat/view_chatbox',
        'views/chat/view_online_users',
        'views/account/view_modal_upload_photo'
	],  function(_, Backbone, Account, ViewFormAddAccount, ViewListOfAccounts, ViewChatBOx, ViewOnlineUsers, ViewModalUploadPhoto) {
   
    var Accounts = Backbone.Collection.extend({
        url: 'index.php/account',
         
    	model: Account,

        currentSession: '', 

    	initialize: function(){
    		//console.log('Collection Accounts initialized');

    		this.on('add', function(model){
    			console.log('New account was added');
                accounts.subviews.appendListOfAccounts();
                accounts.function.afterSave();
                pubnub.publish({channel: 'accountList', message: {model, type: 'add'}});
    		});

    		this.on('remove', function(model){
    			console.log('Account successfully removed');
                accounts.subviews.appendListOfAccounts();
                pubnub.publish({channel: 'accountList', message: {model, type: 'remove'}});
    		});
            
    	},


    	function: {

            afterSave(){
                alert('after saving');
            },

            fetchData: function(){
                if (accounts.length) {
                    accounts.function.populateAll();
                }else {
                    $.getJSON('ajax/select/get_accounts.php', function(json, textStatus) {
                            /*optional stuff to do after success */
                    }).success(function(json){
                        accounts.function.saveModel(json, true).populateAll();
                    });
                }

                return this;
            },


            saveModel: function(json, type){
                accounts.add(json, {silent: type});
                if (type === 0) {
                    $('#form-add-account')[0].reset();
                    $('#form-add-account').find('#firstname').focus();
                    router.alertify_alert('Successfully added');
                };
                return this;
            },


            populateAll: function(){
                accounts.subviews.appendListOfAccounts();
                payrolls.subviews.appendAllRecordsPayroll();
                accounts.function.subscribe_active_users();
                positions.function.fetchData();
                accounts.subviews.appendPhoto();
                accounts.subviews.appendModalUpload();
                chats.function.fetchData();
                router.getSigninName();
                return this;
            },

            print: function(){
                if (accounts.length) {
                    accounts.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                }
                return this;
            },

            getFullname: function(aid){
                var result = accounts.where({id: aid});
                if (result.length) {
                    var person = accounts.get(aid).toJSON();
                    return person.lastname + ', ' + person.firstname + ' ' + person.middlename;
                }else {
                    return aid;
                }
            },

            renamePhoto: function(name, aid){
                $.post('ajax/update/update_account_photo.php', {filename: name, id: aid}, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-account-update-photo').html(data);
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            removePhoto: function(aid, prand){
                $.post('ajax/delete/delete_photo.php', {id: aid, rand: prand}, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            subscribe: function(){
               /* pubnub.subscribe({
                   channel: 'group-chat',
                   message: function(m){
                     console.log(m);
                       chats.add({
                           from: m.from,
                           chat: m.chat  
                       });
        
                        router.playSound('bootstrap/sounds/sound');
                        var account = accounts.get(m.from);
                        var output = '';
                        output += '<tr style="font-weight: bolder; font-size: 14px">';
                        output += '<td style="text-align: left" class="text-info" style="word-wrap: break-word">'+m.chat+'</td>';
                        output += '<td style="text-align: right"">'+account.get('firstname')+'</td>';
                        output += '</tr>';
                        $('#main-chatbox').append(output);

                        var height = $('#main-chatbox').height();

                        if (height > 0) {
                            $("#main-chatbox").animate({ scrollTop: $("#main-chatbox")[0].scrollHeight}, 50);
                            $('#chat-id').val('');
                            $('#chat-id').focus();
                        };
                       
                   },

                   error: function (error) {
                      // Handle error here
                      console.log(JSON.stringify(error));
                    }
                });
            },

            publish: function(chat, from){

                    pubnub.publish({
                        channel: 'group-chat',
                        message: {
                            "chat": chat,
                            "from": from
                        }
                    });

                    if (!from == accounts.currentSession) {
                        var account = accounts.get(from);
                            router.playSound('bootstrap/sounds/sound');
                            var output = '';
                            output += '<tr style="font-weight: bolder; font-size: 14px">';
                            output += '<td style="text-align: left" class="text-info" style="word-wrap: break-word">'+chat+'</td>';
                            output += '<td style="text-align: right">'+account.get('firstname')+'</td>';
                            output += '</tr>';
                            $('#main-chatbox').append(output);

                            var height = $('#main-chatbox').height();

                            if (height > 0) {
                                $("#main-chatbox").animate({ scrollTop: $("#main-chatbox")[0].scrollHeight}, 50);

                            };
                        };
                   */

            },

            subscribe_active_users: function(uniqueID){

             
            },

            search: function(str_collection, value){
                var list = new Backbone.Collection();
                window[str_collection].forEach(function(model) {
                    $.each(model.attributes, function(index, val) {
                        if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                            list.add(model);
                        };
                    });
                });
                return list;
            },



    	},

    	subviews: {	

    		appendFormAddAccounts: function(){
    			var view = new ViewFormAddAccount();
                return this;
    		},

            appendListOfAccounts: function(){
                var view = new ViewListOfAccounts({
                    collection: accounts
                });
            },

            appendChatbox: function(){
                var view = new ViewChatBOx();
                view.render();
            },

            appendOnlineUsers: function(){
                var view = new ViewOnlineUsers();
                view.render();
            },

            appendModalChangePass: function(arguments) {
                require(['views/account/view_modal_change_pass'], function(Subview){
                    var view = new Subview();
                });
            },

            appendModalUpload: function(){
                var view = new ViewModalUploadPhoto();
                view.render();
            },

            appendChats: function(id){
                var $chatbox = $('#main-chatbox');
                $chatbox.empty();
                chats.forEach(function(model) {

                    //if has chats..

                         if (model.get('from') == accounts.currentSession && model.get('to') == id) {
                            var path = 'images/accounts/account-' + model.get('id') + '-' + accounts.currentSession + '.png';
                            var output = '';
                            output += '<div class="chat-box-right">';
                            output +=  model.get('chat');
                            output += ' </div>';
                            output += '<div class="chat-box-name-right">';
                            output += '<img src="images/default/default.png" alt="bootstrap Chat box user image" class="img-circle" />';
                            output += '<span style="margin-left: 50px">'+accounts.function.getFullname(model.get('from'))+'</span>';
                            output += '</div>';
                            output += '<hr class="hr-clas" />';
                            $('#main-chatbox').append(output);
                            $("#main-chatbox").animate({ scrollTop: $("#main-chatbox")[0].scrollHeight}, 50);

                         }else if (model.get('to') == accounts.currentSession && model.get('from') == id) {
                            var path = 'images/accounts/account-' + model.get('id') + '-' + accounts.currentSession + '.png';
                            var output = '';
                            output += '<div class="chat-box-left">';
                            output +=  model.get('chat');
                            output += ' </div>';
                            output += '<div class="chat-box-name-left">';
                            output += '<img src="images/default/default.png" alt="bootstrap Chat box user image" class="img-circle" />';
                            output += '<span style="margin-left: 50px">'+accounts.function.getFullname(model.get('from'))+'</span>';
                            output += '</div>';
                            output += '<hr class="hr-clas" />';
                            $('#main-chatbox').append(output);
                            $("#main-chatbox").animate({ scrollTop: $("#main-chatbox")[0].scrollHeight}, 50);

                         };

                        
                       
                   
                });

            },

            appendPhoto: function(){
                if (sessionStorage.getItem('usertype') !== 3) { 

                    var acc = accounts.get(accounts.currentSession);
                    if (acc.get('rand')) {
                        $('#image-account').attr('src', 'images/default/default.png');
                    }else {
                        var file = 'images/accounts/account' + '-' + accounts.currentSession + '-' + acc.get('rand') + '.png';
                        $('#image-account').attr('src', file);
                    }
                    
                };
                
            },

            initImageUpdate: function(){
                var id = accounts.currentSession;
                $(function() {
                    $('#image-account').click(function(event) {
                        /* Act on the event */
                        //accounts.subviews.appendModalUpload();
                        $('#modalUpdateAccountPhoto').modal('show');
                    });


                });
            },

            initUploadPhoto: function(){

                $(function(){
                    //jQuery
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#choose-file-account')[0],
                            action: 'upload_account.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                                accounts.function.renamePhoto(filename, accounts.currentSession);
                                accounts.subviews.initUploadPhoto();
                            }
                        });
                    });
                });
           
            },

            forSecretaryEditingTd(bool){
                if (bool) {
                    var check_class = 'fa fa-check text-primary';
                    $('#range-of-dates').find('td').on('click', function(event) {
                        var $i = $(this).find('i');
                        var id = this.id;
                        if ($i.length) {
                            if ($i.hasClass('fa-check')) {
                                $i.removeClass();  
                                /* absent */
                                saved_dtrs.functions.update(id, '0');
                            }else {
                                /* present */
                                $i.addClass(check_class);
                                saved_dtrs.functions.update(id, '1');
                            }
                        }else {
                            /* present */
                            $(this).html('<i class="fa fa-check text-primary"></i>');
                            saved_dtrs.functions.update(id, '1');
                        }
                    });
                }else {
                    $('#range-of-dates').find('td').off('click');
                }
            }

    	}

    });
   
    return Accounts; 
});