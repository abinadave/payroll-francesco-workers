define(['underscore','backbone','text!templates/account/temp_modal_change_pass.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events.
                'change #chk-change-pass': 'changeChk',
                'submit #form-change-password': 'updatePassword'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    self.$el.find('#modalChangePass').modal('show');
                    setTimeout(function() {
                    	self.$el.find('input[name="current_password"]').focus();
                    }, 1500);
                });
        	},

        	changeChk: function(event) {
        		var self = this;
        		var isChecked = self.$el.find('#chk-change-pass').is(':checked');
        		if (isChecked) {
        			self.$el.find('.form-control').prop('type','text');
        		}else {
        			self.$el.find('.form-control').prop('type','password');
        		}
        	},

        	updatePassword: function(event) {
        		event.preventDefault();
        		if (Number(sessionStorage.getItem('usertype')) === 2) {
        			$.post('ajax/update/update_password_payrollee.php', $('#form-change-password').serialize() , function(data, textStatus, xhr) {
        				/*optional stuff to do after success */
        			}).success(function(data){
                        console.log(data);
        				var json = $.parseJSON(data);
        				if (!json.success) {
        					json.errors.forEach(function(model) {
        						router.alertify_error(model);
        					});
        				}else {
                            if (_.has(json,'message')) {
                                router.alertify_success(json.message);
                                $('#form-change-password')[0].reset();
                            }
                        }
        			}).fail(function(xhr){
        				alert(' '+xhr.status);
        			});
        		}
        	}
    
    });
   
    return Subview; 
});