define(['underscore','backbone',
	'text!templates/emp_pic/temp_print_all_emp_pic.html',
    'libs/functions'], function(_, Backbone, template, fn) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                    'library': self.collection.toJSON(),
                    'fn': fn
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                
                $(function() {
                	// self.$el.css({
                		// 'margin-top': '-70px'
                	// });
                });

                $(function(){
                    $('#modal-print-all-emp').modal('show');
                    setTimeout(function() {
                    	$('#navigation, #main').hide();
                    	window.print();
                    	setTimeout(function() {
                    		$('#navigation, #main').show();
                    		$('#placeholder').empty();
                    		$('#btnPrintAll').text('Print ALL')
                    	}, 300);
                    }, 1000);
                });
        	}
    
    });
   
    return Subview; 
});