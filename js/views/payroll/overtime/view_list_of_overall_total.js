define(['underscore','backbone','text!templates/payroll/overtime/temp_list_of_overall_total.html'], function(_, Backbone, template) {
   
    var SubviewList = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-overall-total',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
        	    require(['libs/accounting.min','moment'], function(accounting, moment){
	                self.$el.off();
	                self.$el.empty();
	                var output = self.template({'library': self.collection.toJSON(), 'accounting': accounting, 'moment': moment });
	                self.$el.append(output);
	                self.onRender();
                });
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
                 // $(function () {
                 //   $('[data-toggle="popover"]').popover()
                 // });
        	}
    
    });
   
    return SubviewList; 
});