define(
	[
		'underscore',
		'backbone',
		'text!templates/employee/temp_modal_upload_photo.html'
	],  function(_, Backbone, template) {
   
    var ViewModalUploadPhotoEmp = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-upload-employee',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                employees.subviews.initFileUploader();
    	        return self;
        	}
    
        	
    
    });
   
    return ViewModalUploadPhotoEmp; 
});