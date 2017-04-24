define(
	[
		'underscore',
		'backbone',
		'text!templates/position/temp_list_of_positions_in_emp_pics.html',
        'libs/backbone.obscura'
	],  function(_, Backbone, template, Obscura) {
   
    var SubviewLOPIEP = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#positions-in-emp-pics',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var proxy = new Obscura(self.collection);
                self.collection = proxy.setSort('name', 'asc');
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
                var self = this;
                $(function(){
                    //jQuery
                        self.$el.change(function(event) {
                            var value = $(this).val();
                            var models = [];

                            if (value !== 'all') {
                                pictures.forEach(function(model) {
                                    var first = self.findFirstModel(model.get('fullname'), value);
                                    if (first !== undefined) {
                                        models.push(model.attributes);
                                    }
                                });
                                if (models.length) {
                                    pictures.subviews.appendListOfEmps(new Backbone.Collection(models));
                                }else {
                                    $('#list-of-emps-with-pic').html('<p class="text-danger">0 result was found</p>');
                                }
                            }else {
                                pictures.subviews.appendListOfEmps(pictures);
                            }

                        });
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
   
    return SubviewLOPIEP; 
});