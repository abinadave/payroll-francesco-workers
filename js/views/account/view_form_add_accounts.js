define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_form_add_accounts.html'
	],  function(_, Backbone, template) {
   
    var ViewFormAddAccount = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#div-form-add-account',
    
        	template: _.template(template),
    
            events: {
                // bound events
               'keyup #username': 'passwordType',
               'keyup #contact': 'contactType'
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

                //start jQuery................
                var self = this;
                $(function(){
                
                    var $div = $('#div-form-add-account');
                    $div.find('#form-add-account label').css({
                        width: '280px',
                        marginLeft: '20px',
                        marginTop: '8px'
                    });
                });

                $(function() {
                    $('#form-add-account').submit(function(event) {
                        event.preventDefault();
                        var form = $(this).serialize();
                        require(['libs/functions','models/account'], function(Fn, Account){
                            var formValues = Fn.getFormValues(self);
                            formValues.password = self.$el.find('#form-add-account').find('#password').val();   
                           var account = new Account(formValues);
                           $.when(account.save()).then( (response)=> {
                              if (response.success) {
                                  self.$el.find('form')[0].reset();
                                  self.$el.find('form').find('input:first').focus();
                              }
                           }, ()=> {

                           });                           
                        });
                    });
                });

        	},

            passwordType: function(event){
                var value = event.currentTarget.value, $target = $('#form-add-account').find('#output-username');
                if (value != '') {
                    var result = accounts.where({username: value});
                    if (result.length) {
                        $target.text('Username already taken').addClass('text-danger').css('margin-top', '-8px');
                    }else {
                        $target.text('');
                    }
                }else {
                    $target.text('');
                }
            },

            contactType: function(event){
                var value = event.currentTarget.value, $target = $('#form-add-account').find('#output-contact');
                var $btn = $('#btnAddAccount');
                   if (value != '') {
                        var result = accounts.where({contact: value});
                        if (result.length) {
                            $target.text('contact number already taken').addClass('text-danger').css('margin-top', '-8px');
                            $btn.attr('disabled', true);
                        }else {
                            $target.text('');
                            $btn.attr('disabled', false);
                        }
                    }else {
                        $target.text('');
                        $btn.attr('disabled', false);
                    }
            }
    
    });
   
    return ViewFormAddAccount; 
});