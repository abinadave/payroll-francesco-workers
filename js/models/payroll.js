define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Payroll = Backbone.Model.extend({
    	
    	initialize: function(){
    		//console.log('Model payroll initialized');
    		this.on('change', function(){
    			console.log('something was changed to model: Payroll');
                payrolls.subviews.appendAllRecordsPayroll();
                payrollemps.subviews.appendListOfPayrollEmps(this.get('id'));
             
                var thispayroll = this.attributes
      
                $.post('ajax/update/update_payroll.php', 

                {
                    values: thispayroll
                }, 

                function(data, textStatus, xhr) {
                  if (data) {
                     if ($('#modal-saved-dtr').hasClass('in') === false) {
                         router.alertify_success('Process completed');                        
                     }
                  };
                }).success(function(data){
                    console.log(data);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });

    		});
    	},

    	defaults: {
    		id: 0,
            date_from: 'no date',
            date_to: 'no date',
    		total: 0.0,
            advances_total: 0.0,
            sss_total: 0.0,
            phil_total: 0.0,
            rice_allowance_total: 0.0,
            net: 0.0,
    		date: 'unknown date',
    		time: 'unknown time',
            personnel: 0
    	}

    });
   
    return Payroll; 
});