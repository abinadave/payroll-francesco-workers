define(
	[
		'underscore',
		'backbone',
		'text!templates/account/temp_modal_upload_photo.html'
	],  function(_, Backbone, template) {
   
    var ViewModalUploadPhoto = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-upload-account-photo',
    
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
                accounts.subviews.initUploadPhoto();
    	        return self;
        	},
    
        	init: function(){
                $(function(){
                   
                });
        	}
    
    });
   
    return ViewModalUploadPhoto; 
});