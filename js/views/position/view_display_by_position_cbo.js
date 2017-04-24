define([
    'underscore',
    'backbone',
    'text!templates/position/temp_display_by_position_cbo.html',
    'views/employee/view_list_of_employees'], 
    function(_, Backbone, template, SubviewLOE) {
   
    var SubviewDBP = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#display-by-designation',
    
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
                        if (value === 'all') {
                            var view = new SubviewLOE({
                                collection: employees
                            });
                        }else {
                            var found = self.filterEmployees(Number(value));
                            var view = new SubviewLOE({
                                collection: new Backbone.Collection(found)
                            });
                        }
                    });
                });

                $(function(){
                    require(['chosen'], function(Chosen){
                        $('#display-by-designation').chosen();
                    });
                });
        	},

            filterEmployees: function(posId) {
                return employees.filter(function(model) {
                    return Number(model.get('position')) === posId;
                });
            }
    
    });
   
    return SubviewDBP; 
});