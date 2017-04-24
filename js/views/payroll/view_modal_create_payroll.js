define(
	[
		'underscore',
		'backbone',
		'text!templates/payroll/temp_modal_create_payroll.html'
	],  function(_, Backbone, template) {
   
    var ViewModalCreatePayroll = Backbone.View.extend({
    
        	initialize: function(){
        		this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-create-payroll',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.init();
    	        return self;
        	},
    
        	init: function(){
        		var $modal = $('#modalCreateAttendance');
                $(function(){
                   $modal.find('input').css({
                 		width: '200px'
                   });  
                });

                $(function() {
                	$modal.find('#form').click(function(event) {
                	var libs = 'libs/pickadatejs/';
                		require([ libs+'picker',libs+'picker.date',libs+'picker.time',libs+'legacy','libs/load_css/loadcss'], 
	                		function(css){
	                	    loadCSS("js/libs/pickadatejs/themes/default.css");
	                	    loadCSS("js/libs/pickadatejs/themes/default.date.css");
	                	    loadCSS("js/libs/pickadatejs/themes/default.time.css");
	                		$modal.find('#form').pickadate();
	                   });
                	});

                    $modal.find('#to').click(function(event) {
                    var libs = 'libs/pickadatejs/';
                        require([ libs+'picker',libs+'picker.date',libs+'picker.time',libs+'legacy','libs/load_css/loadcss'], 
                            function(css){
                            loadCSS("js/libs/pickadatejs/themes/default.css");
                            loadCSS("js/libs/pickadatejs/themes/default.date.css");
                            loadCSS("js/libs/pickadatejs/themes/default.time.css");
                            $modal.find('#to').pickadate();
                       });
                    });
                
                });
        	}
    
    });
   
    return ViewModalCreatePayroll; 
});