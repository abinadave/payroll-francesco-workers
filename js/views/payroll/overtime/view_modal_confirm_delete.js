define(['underscore','backbone','text!templates/payroll/overtime/temp_modal_confirm_delete.html'], 
	function(_, Backbone, template) {
   
    var ModalConfirmation = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {

            },
    
        	render: function(){
        	    var self = this;
        	    console.log(self.model.toJSON());
                // self.$el.off();
                self.$el.empty();
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    $('#ModalConfirm').modal('show');
                });

                $(function() {
                	self.$el.find('#btnYes').click(function(event) {
                		/* Act on the event */
                		self.module.function.afterConfirmDelete();
                	});
                });
        	}
    
    });
   
    return ModalConfirmation; 
});