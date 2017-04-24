define(['underscore','backbone','text!templates/payroll/overtime/temp_modal_submit_overtime_date.html','moment'], 
    function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                // self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},

        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery..
                    $('#modalOvertimeDate').modal('show');
                    // projects.subviews.appendListOfLocationInModal();
                    require(['jqueryui'], function(){
                        $('#date').datepicker();
                    });
                });


                $(function() {
                    self.$el.find('#date').change(function(event) {
                        var value = $(this).val();
                        console.log(moment);
                        console.log(value);
                    });
                });

                $(function() {
                    self.$el.find('form').submit(function(event) {
                        event.preventDefault();
                        var $el = $(this);
                        require(['models/overtime_payroll'], function(Model){
                            overtime_payrolls.lastRandomId = overtime_payrolls.function.createUniqueId().toString();
                            var overtime_payroll = new Model({
                                id: overtime_payrolls.lastRandomId,
                                work_scope: $el.find('#work_scope').val(),
                                date: $el.find('#date').val(),
                                work_hrs: self.getWorkedHrs(),
                                location_id: $el.find('#location-id').val(),
                                location_name: $el.find('#location-name').val(),
                                person: sessionStorage.getItem('firstname') + ' ' + sessionStorage.getItem('lastname'),
                                table: 'overtime_payrolls'
                            });
                            if (overtime_payroll.isValid()) {
                                var form = $.param(overtime_payroll.toJSON());
                                self.$el.find('input[type="submit"]').prop('disabled', true);
                                overtime_payrolls.function.saveDB(form);
                            };
                        });
                    });
                });

                $(function() {
                    self.$el.find('#location').change(function(event) {
                        var val = $(this).val();
                        self.$el.find('#location-id').val(val);
                        self.$el.find('#location-name').val(projects.function.getLocation(val));
                    });
                });

                
        	},

            getWorkedHrs: function() {
                var value = $('#all-work-hours').val(), self = this;
                if ($.isNumeric(value)) {
                    return parseFloat(value);
                }else {
                    var arrHrs = [];
                    var $inputs = $('#list-of-overtime-employees').find('input');
                    $inputs.each(function(index, el) {
                        var num = $(this).val();
                        arrHrs.push(parseFloat(num));
                    });
                    return _.max(arrHrs);
                }
            }
    
    });
   
    return Subview; 
});