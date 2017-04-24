define(
	[
		'underscore',
		'backbone',
		'text!templates/navigation/temp_navigation.html'
	],  function(_, Backbone, template) {
   
    var ViewNavigation = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#navigation',
    
        	template: _.template(template),
    
            events: {
                // bound events
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
                var self = this;
                $(function(){
                   if (Number(sessionStorage.getItem('usertype')) !== 2) {
                        self.$el.find('#for-secretary').remove();
                   }
                   self.$el.find('#sign-in-as').text(sessionStorage.getItem('firstname'))
                });

                $(function() {
                    self.$el.find('li').click(function(event) {
                        /* Act on the event */
                        self.$el.find('li').removeClass('active');
                        $(this).addClass('active');
                    });
                });
        	}
    
    });
   
    return ViewNavigation; 
});