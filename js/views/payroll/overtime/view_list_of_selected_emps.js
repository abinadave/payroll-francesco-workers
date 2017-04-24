define(['underscore','backbone','text!templates/payroll/overtime/temp_list_of_selected_emps.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-overtime-employees',
    
        	template: _.template(template),
    
            events: {

            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                var list = selected_emps.function.sortName('asc');
                self.$el.empty();
                var output = self.template({'library': list.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function() {
                    // self.$el.find('input[type="text"]').hide();
                    // self.$el.find('input[type="text"]').keyup(function(event) {
                    //     var val = parseFloat($(this).val()), 
                    //     currentDiff = $('#all-work-hours').val(), 
                    //     id = this.id;
                    //     if (val > parseFloat(currentDiff)) {
                    //         router.alertify_error('Number of hrs exceeded');
                    //         $(this).val('0');
                    //         console.log(id);
                    //     };
                    // });
                });

                $(function(){
                    self.$el.find('input.input-hrs').keyup(function(event) {
                    	var id = this.id, value = $(this).val(), $el = '#emp-' + id; 
                        console.log(id)
                        var emp = selected_emps.get(id);
                        var empJson = emp.toJSON();

                        if (value != '') {           	
                            var total = parseFloat(empJson.hrs) * parseFloat(empJson.rph);                        
                        	if ($.isNumeric(value)) {
                                emp.set({hrs: parseFloat(value)});
                        	}else{
                        		router.alertify_error('Invalid input');
                        		$(this).val('').focus();
                                emp.set({hrs: 0});
                        	}
                        }else {
                            $(this).val('').focus();
                            emp.set({hrs: 0});
                        }

                    });
                });

                $(function(){
                    /* input in minutes */
                    self.$el.find('input.input-mins').keyup(function(event) {
                        var id = this.id, value = $(this).val(), $el = '#emp-' + id; 
                        var emp = selected_emps.get(id);
                        var empJson = emp.toJSON();
                        if (value != '') {               
                            if ($.isNumeric(value)) {
                                emp.set({min: parseFloat(value)});
                            }else{
                                router.alertify_error('Invalid input');
                                $(this).val('').focus();
                                emp.set({min: 0});
                            }
                        }else {
                            $(this).val('').focus();
                            emp.set({min: 0});
                        }
                    });
                });


                $(function() {
                    self.$el.find('a').click(function(event) {
                        var id = this.id;
                        require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                        function(css, alertify){
                            loadCSS('js/libs/alertify/css/alertify.core.css');
                            loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                            alertify.confirm('Are you sure ?', function(e){
                                if (e) {
                                    selected_emps.remove(id);
                                }else {
                                    console.log(e);
                                }
                            });
                        });
                    });
                });


        	}
    
    });
   
    return Subview; 
});