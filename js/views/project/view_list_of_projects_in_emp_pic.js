define(['underscore','backbone',
	'text!templates/project/temp_list_of_projects_in_emp_pic.html'], 
	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#sites-in-emp-pics',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function() {
                	self.$el.change(function(event) {
                		var value = $(this).val();
                		var models = [];

                		if (value === 'all') {
                			pictures.subviews.appendListOfEmps(pictures);
                		}else {
                			var foundModels = [];
                			var count = 0;
                			pictures.forEach(function(model) {
                				count = self.findModelsWithFullname(model.get('fullname'), value);
                				if (count > 0) {
                					foundModels.push(model.attributes);
                				}
                			});
                			if (foundModels.length > 0) {
		               			pictures.subviews.appendListOfEmps(new Backbone.Collection(foundModels));
                			}else {
                				pictures.subviews.appendListOfEmps(new Backbone.Collection([]));
                			}
                			
                		}

                	});
                });
        	},

        	findModelsWithFullname(fullname, location){
        		var count = 0;
        		var modelFullname = '';
                employees.forEach(function(model) {
                	modelFullname = model.get('firstname').toUpperCase() + ' ' + model.get('lastname').toUpperCase();
                	if (modelFullname === fullname) {
                		if (model.get('location') === location) {
                			++count;
                		}
                	}
                });
                return count;
            }
    
    });
   
    return Subview; 
});