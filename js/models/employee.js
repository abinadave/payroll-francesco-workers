define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var Employee = Backbone.Model.extend({

    	initialize: function(){
            this.on('change', function(){
                if (this.hasChanged('firstname') || this.hasChanged('middlename') || this.hasChanged('lastname') || this.hasChanged('rpd') || this.hasChanged('position') || this.hasChanged('gender') || this.hasChanged('location') || this.hasChanged('rice_allowance')) {
                    
                   
                    var loc = $('#display-by-project').val();
                    if (loc > 0) {
                         var ids = employees.function.searchWithLocationOf(loc);
                         employees.subviews.appendListOfEmployeesById(ids);
                    }else {
                         employees.subviews.appendListOfEmployees();
                    }

                    var model = {}; model.id = this.get('id'); model.firstname = this.get('firstname'); model.middlename = this.get('middlename'); model.lastname = this.get('lastname'); model.rpd = this.get('rpd'); model.position = this.get('position'); model.gender = this.get('gender'); model.location = this.get('location'); model.rand = this.get('rand'); model.rice_allowance = this.get('rice_allowance');
                    pubnub.publish({channel: 'employeeList', message: {model, type: 'change'}});
                    console.log('Model employee has changed: ' +this.get('id'));
                }else if(this.hasChanged('rand')){
                     var model = {}; model.id = this.get('id'); model.rand = this.get('rand');
                     pubnub.publish({channel: 'employeeList', message: {model, type: 'change'}});
                }
            });
    	},

    	defaults: {
    		id: 0,
    		firstname: 'no firstname',
    		middlename: 'no middlename',
    		lastname: 'no lastname',
    		rpd: 0,
    		position: 'unknown',
    		gender: 'unknown',
            location: 0,
            rand: 0
    	}

    });
   
    return Employee; 
});