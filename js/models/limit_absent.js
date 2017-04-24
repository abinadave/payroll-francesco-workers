define(['underscore','backbone'], function(_, Backbone) {
   
    var Limit_absent = Backbone.Model.extend({
        url: 'index.php/limit_absent',
    	initialize: function(){
    		this.on('change', function(){
                this.afterAdd();
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},

        afterAdd(){
            if ($('#modal-limit-absents').hasClass('in')) {
                $('#display-limit-of-absent').text(limit_absent.get('value'));
            }
        },
    
    	defaults: {
			value: '0'    		
    	},
    
        validate: function(attrs, options) {
            if (!attrs.value) {
               return "value is required";
            }
        }
    
    
    });
   
    return Limit_absent; 
});