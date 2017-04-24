define(
	[
		'underscore',
		'backbone',
		'text!templates/position/temp_list_of_positions_in_modal.html'
	],  function(_, Backbone, template) {
   
    var ViewListOfPositionsInModal = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'select',
    
        	el: '#form-add-employee #position, #positions-in-emp-pics',
    
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
                var self = this;
                $(function(){
                    //jQuery
                    if ($('#div-emps-with-pic').length) {
                        self.$el.change(function(event) {
                            var value = $(this).val();
                            var models = [];
                            
                            pictures.forEach(function(model) {
                                var first = self.findFirstModel(model.get('fullname'), value);
                                if (first !== undefined) {
                                    models.push(model.attributes);
                                }
                            });

                            if (models.length) {
                                pictures.subviews.appendListOfEmps(new Backbone.Collection(models));
                            }else {

                            }

                        });
                    }
                });
        	},

            findFirstModel(fullname, pid){
                var fnModel = '';
                var found = [];
                employees.forEach(function(model) {
                    fnModel = model.get('firstname').toUpperCase() + ' ' + model.get('lastname').toUpperCase();
                    if (fullname.toUpperCase() === fnModel && Number(model.get('position')) === Number(pid)) {
                        found.push(model.attributes);
                    }
                });
                return found.pop();
            }
    
    });
   
    return ViewListOfPositionsInModal; 
});