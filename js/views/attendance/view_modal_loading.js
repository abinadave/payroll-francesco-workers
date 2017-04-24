define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_modal_loading.html'
	],  function(_, Backbone, template) {
   
    var ViewModalLoading = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-loading',
    
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
                    console.log('rendering loading modal');

                    if (self.interval > 1000) {
                        setTimeout(function() {
                            $('#modalLoadingIndacator').modal('hide');
                        }, self.interval)
                    };
                });
        	}
    
    });
   
    return ViewModalLoading; 
});