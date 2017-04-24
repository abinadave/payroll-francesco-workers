define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_list_of_project_in_modal.html',
        'chosen'
	],  function(_, Backbone, template, chosen) {
   
    var ViewListOfProjectInModal = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#display-by-project',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    $('#display-by-project').chosen();
                    $("#display-by-project").trigger("chosen:updated");
                });    
        	}
    
    });
   
    return ViewListOfProjectInModal; 
});