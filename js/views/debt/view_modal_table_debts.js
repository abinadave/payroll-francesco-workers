define(['underscore',
    'backbone',
    'text!templates/debt/temp_modal_table_debts.html'], 
    function(_, Backbone, template) {
   
    var ModalDebts = Backbone.View.extend({
    
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
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalDebts').modal('show');
                    setTimeout(function() {
                    	debts.subviews.appendList(debts);
                    }, 500);
  
                });
        	}
    
    });
   
    return ModalDebts; 
});