define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_employee_salary.html'
	],  function(_, Backbone, template) {
   
    var View = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var self = this;
                $(function(){
                    //jQuery
                    self.$el.css('margin-left', '0px');
                    self.$el.find('#employee-profile').find('span').addClass('text-info').wrap('<b></b>')
                    self.$el.find('#fullname').text(sessionStorage.getItem('firstname').toLowerCase()+ ' '+ sessionStorage.getItem('middlename').toLowerCase() +' '+sessionStorage.getItem('lastname').toLowerCase()).end()
                    .find('#rpd').text(sessionStorage.getItem('rpd')).end()
                    .find('#location').text(sessionStorage.getItem('location'));
                });
        	}
    
    });
   
    return View; 
});