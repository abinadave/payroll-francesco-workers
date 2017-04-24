define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_saved_attendance.html',
        'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewSavedAttendance = Backbone.View.extend({
    
        	initialize: function(){
        		//console.log('View initialized..');
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
                var self = this;
                $(function(){
                    //jQuery
                    $('#main').css({
                    	margin: '0px'
                    });
                });

                $(function() {
                    $('#btnDelete').click(function(event) {
                        /* Act on the event */
                        var values = [];
                        
                        $('#list-of-saved-attendance').find(':checkbox:checked').each(function(index, el) {
                             values.push($(this).val());
                        });

                        if (values.length) {
                           values.forEach(function(model) {
                               presences.function.removeSavedAttendance(model);
                           });
                        } else{};

                    });
                });

                $(function() {
                    require(['jqueryui'], function(){
                        $('#date1, #date2').datepicker({
                            beforeShow: function (input, inst) {
                                setTimeout(function () {
                                    inst.dpDiv.css({
                                        top: 100
                                    });
                                }, 0);
                            }
                        });
                    });
                });

                $(function() {
                    self.$el.find('#date1').change(function(event) {
                        var value = moment($(this).val()).format('MMMM DD, YYYY');
                        $(this).val(value);
                    });
                    self.$el.find('#date2').change(function(event) {
                        var value = moment($(this).val()).format('MMMM DD, YYYY');
                        $(this).val(value);
                    });
                });

                removed_presences.function.fetchData();
                removed_presents.function.fetchData();
  
        	}
    
    });
   
    return ViewSavedAttendance; 
});