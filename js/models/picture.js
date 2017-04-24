define(['underscore','backbone'], function(_, Backbone) {
   
    var Picture = Backbone.Model.extend({
    
    	initialize: function(){
            url: 'api.php/picture',
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	}
    
    
    });
   
    return Picture; 
});