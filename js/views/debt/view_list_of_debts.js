define(['underscore','backbone','text!templates/debt/temp_list_of_debts.html'], function(_, Backbone, template) {
   
    var ListOfDebts = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-debts',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['libs/accounting.min'], function(accounting){
	                // self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'accounting': accounting});
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('button').click(function(event) {
                        /* Act on the event */
                        var id = this.id;
                        
                        var debt = debts.get(id);
                        if (_.has(debt.attributes, 'value')) {
                           $('#modalDebts').modal('hide');
                           setTimeout(function() {
                               debts.subviews.appendModalPay(debt);
                           }, 600)
                           
                        };
                    });
                });
        	}
    
    });
   
    return ListOfDebts; 
});