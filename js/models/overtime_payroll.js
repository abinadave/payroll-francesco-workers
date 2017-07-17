define(['underscore','backbone','moment'], function(_, Backbone, moment) {
   
    var Overtime_payroll = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.date) {
               return "date is required";
            }

            if (!attrs.work_hrs) {
               return "work hours is required";
            }

            if(moment(attrs.date).isValid() == false) {
            	return 'invalid date';
            }
        }
    
    });
   
    return Overtime_payroll; 
});