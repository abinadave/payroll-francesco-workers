define([
	'underscore',
	'backbone',
	'text!templates/for_admin/settings/temp_modal_edit_limit_absents.html'], 
	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
                    
                    $('#modal-limit-absents').modal('show');

                    setTimeout(function() {
                    	limit_absent.fetch({silent: true,
                    		success(){
                    			limit_absent.afterAdd();
                    		}
                    	});
                    }, 500);
 
                    $('#modal-limit-absents').on('hidden.bs.modal', function(event){
                    	router.navigate('Employees');
                    });

                    $('#modal-limit-absents').on('shown.bs.modal', function(){
                    	self.$el.find('input:first').focus();
                    });

                });

                $(function() {
                	self.$el.find('form').on('submit', function(event){
                		event.preventDefault();
                		
                		var obj = {
                			value: self.$el.find('#value').val()
                		};

                		limit_absent.set(obj);

                		$.when(limit_absent.save()).then(function(data) {
            				router.alertify_success('Successfully updated');
            				self.$el.find("#value").val('').focus();
                		}, function(data) {
                			console.log(data);
                		});
                		
                	});
                });
        	}
    
    });
   
    return Subview; 
});