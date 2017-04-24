define(['underscore','backbone','text!templates/payroll/overtime/temp_append_envelope_overtime.html'], 
	function(_, Backbone, template) {
   
    var ListOfEnvOvertime = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                require(['libs/accounting.min','moment'], function(accounting, moment){                    
                    // self.$el.off();
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
                    self.$el.find('th').css('padding','2px');
                    self.$el.find('#tbl-totality').css({
                        'border-color': 'transparent'
                    });
                    setTimeout(function() {
                        window.print();
                    }, self.interval)
                });
        	}
    
    });
   
    return ListOfEnvOvertime; 
});