define(['underscore','backbone','text!templates/payroll/overtime/temp_table_panel_overtime.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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

                $(function() {
                    require(['timepciker','css!libs/jquery-time-picker/jquery.timepicker','css!libs/jquery-time-picker/lib/bootstrap-datepicker'], function(){
                        $('#time-start, #time-end').timepicker();
                    });
                });

                $(function() {
                    setTimeout(function() {
                       selected_emps.subviews.appendList(selected_emps);
                    }, 700);
                });

                /*
                    validating 2 times;
                */

                $(function() {
                    self.$el.find('#time-end').change(function(event) {
                         var now = $('#time-start').val(), then = $('#time-end').val();
                            var $el = this;

                            require(['moment'], function(moment){ 
                                var startTime = moment(now, 'hh:mm:ss a');
                                var endTime = moment(then, 'hh:mm:ss a');
                                var rs = parseFloat(endTime.diff(startTime, 'minutes')) / 60;
                                self.$el.find('#time_difference').text(rs);
                                overtime_payrolls.currentDiff = rs;
                                // var isAfter = startTime.isBefore(endTime);
                                // if (!isAfter) {
                                //     router.alertify_error('Incorrect time format.');
                                //     self.$el.find('#time-start, #time-end').val('');
                                //     self.$el.find('#time_difference').text('0');
                                // }else {
                                //     console.log('ok');
                                // }
                            });

                    });
                });

                $(function() {
                    self.$el.find('#all-work-hours').keyup(function(event) {
                        var value = $(this).val();
                        if ($.isNumeric(value)) {
                            self.$el.find('tbody').find('.input-hrs').val(value);
                             $(this).val(value);
                            selected_emps.forEach(function(model) {
                                model.set({hrs: parseFloat(value)});
                            });
                        }else {
                            self.$el.find('tbody').find('input-hrs.input').val('0');
                            selected_emps.forEach(function(model) {
                                model.set({hrs: 0});
                                $(this).val('');
                            });
                        }

                    });
                });


                $(function(){

                    self.$el.css({
                        marginLeft: '0px'
                    });


                    self.$el.find('#btnSubmit').click(function(event) {

                        var proceed = true;
                        self.$el.find('tbody').find('input[type="text"]').each(function(index, el) {
                            if ($(this).val() == '') {
                                proceed = false;
                            };
                        });

                        (proceed == true) ? selected_emps.subviews.appendModalOvertimeDate() : router.alertify_error('Incomplete complete no. of hours.');
                        
                    });
                });


                $(function() {
                    self.$el.find('#input-present-all').change(function(event) {
                        var is = $(this).is(':checked'), $tbody = $('#list-of-overtime-employees'), currentDiff = self.$el.find('#time_difference').text();
                        console.log(currentDiff);
                        if (is) {
                            selected_emps.forEach(function(model) {
                                 var total = parseFloat(model.get('rph')) * parseFloat(model.get('hrs'));
                                 model.set({total: total, hrs: currentDiff});
                            });
                            $tbody.find('input').val(currentDiff);
                        }else {
                             selected_emps.forEach(function(model) {
                                 model.set({total: 0, hrs: 0});
                            });
                            $tbody.find('input').val(0);
                        }
                    });
                });
        	}
    
    });
   
    return Subview; 
});