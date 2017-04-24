define(
	[
		'underscore',
		'backbone',
		'text!templates/project/temp_list_of_projects.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfProjects = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-projects',
    
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
                var $target = $('#list-of-projects');
                $(function(){
                    //jQuery
                    // $target.find('tr').click(function(event) {
                    //     /* Act on the event */
                    //     $target.find('tr').removeClass('project-tr text-info');
                    //     $(this).addClass('project-tr text-info');
                    // });
                });
        	}
    
    });	
   
    return ViewListOfProjects; 
});