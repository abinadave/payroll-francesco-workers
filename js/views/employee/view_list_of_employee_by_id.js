define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_list_of_employees_by_id.html',
        'libs/accounting.min',
        'libs/backbone.obscura'
	],  function(_, Backbone, template, acc, Obscura) {
   
    var ViewListOfEmployeeById = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-employees',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(ids){
        	    var self = this;
                self.$el.empty();
                var list = self.findEmps(ids);
                var output = self.template({'library': list.toJSON(), 'accounting': acc});
                self.$el.append(output);
                self.init();
    	        return self;
        	},

            findEmps: function(ids) {
                var list = new Backbone.Collection();
                ids.forEach(function(i) {
                    var emp = employees.get(i);
                    list.add(emp);
                });

                var proxy = new Obscura(list);
                return proxy.setSort('lastname', 'asc');
                return proxy;
            },
    
        	init: function(){
                $(function(){
                    //jQuery
                    employees.subviews.initJQueryClickTr();
                });
        	}
    
    });
   
    return ViewListOfEmployeeById; 
});