define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_payroll_envelope.html'
	],  function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {},
    
        	render: function(){
        	    var self = this;
                var output = self.template({'library': self.collection.toJSON(), 'accounting': require('libs/accounting.min') });
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;

                $(function() {
                    self.$el.find('ul li').css({
                        'font-size': '12px'
                    });
                    self.$el.find('ul').css({
                        'list-style': 'none'
                    });
                });

                setTimeout(function() {
                    // self.$el.find('#table-breakdown').find('th, td').css('fontSize', '15px');
                    self.$el.find('th, td').css({
                        padding: '0px'
                    });
                    $(function(){
                        //jQuery
                        self.$el.find('span').css({
                            fontSize: '12px'
                        });
                        self.$el.find('panel').css({
                            paddingTop: '-60px'
                        });
                        window.print();
                    });
                }, 500);
                
        	}
    
    });
   
    return Subview; 
}); 