define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_list_of_projects_by_id.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfProjectsByid = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-projects',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(ids){
        	    var self = this;
                self.$el.empty();
                var output = self.template({'library': ids});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return ViewListOfProjectsByid; 
});