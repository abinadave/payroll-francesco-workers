define(['underscore','backbone',
	'text!templates/emp_pic/temp_div_employees_with_pictures.html'], 
	function(_, Backbone, template) {
   
    var SubviewEWP = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                	require(['libs/dave'], function(Dave){
                	    Dave.loadData([
                	    	'positions',
                	    	'projects',
                	    	'employees',
                	    	// 'pictures'
                	    ], {
                	    	done: function() {
                                $.when(pictures.fetch({silent: true})).then((resp) => {
                                    pictures.subviews.appendListOfEmps(pictures);
                                    positions.subviews.appendListInEmpPics(positions);
                                    projects.subviews.appendListInEmpPic(projects);
                                }, (resp) => {
                                    console.log(resp);
                                });
                                
                	    	}
                	    }); 
                	});
                });

                $(function() {
                    self.$el.find('#search-query-pic').keyup(function(event) {
                        var value = $(this).val();
                        clearTimeout(self.sto);
                        self.sto = setTimeout(function() {
                            console.log(value);
                            var models = self.filterPictures(value);
                            pictures.subviews.appendListOfEmps(new Backbone.Collection(models));
                        }, 1500);
                    });
                });

                $(function() {
                    self.$el.find('#btnPrintAll').click(function(event) {
                        $(this).text('Preparing...');
                        var models = self.employeeWithFullname();
                        pictures.subviews.appendModalPrintAll(new Backbone.Collection(models));
                    });
                });
                
        	},

            employeeWithFullname(){
                var fn = '', ln = '';
                var allModels = [];
                pictures.forEach(function(model) {
                    fn = model.get('fullname').split(' ')[0];
                    ln = model.get('fullname').split(' ')[1]; 
                    found = _.where(employees.toJSON(), {firstname: fn, lastname: ln}, true);
                    if (found.length) {
                        var idOb = pictures.functions.getLargestSalary(found);
                        var obj = _.where(found, {id: idOb.id}, true);
                        allModels.push(obj[0]);
                    }
                });
                return allModels;
            },

            filterPictures(value){
                return pictures.toJSON().filter(function(model) {
                    return model.fullname.toLowerCase().indexOf(value.toLowerCase()) != -1;
                });
            }
    
    });
   
    return SubviewEWP; 
});