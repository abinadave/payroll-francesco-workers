define(
	[
		'underscore',
		'backbone',
		'text!templates/attendance/temp_attendance.html',
		'moment'
	],  function(_, Backbone, template, moment) {
   
    var ViewAttendance = Backbone.View.extend({
    
        	initialize: function(){

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
                self.appendSubviews();
    	        return self;
        	},

            appendSubviews: function(){
                attendances.subviews.appendModalLoading();
            },
    
        	init: function(){
                var self = this;
        		$panel = $('#panel-attendance');

                self.$el.find('#btnSaveAttendance').click(function(event) {
                    require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                    function(css, alertify){
                        loadCSS('js/libs/alertify/css/alertify.core.css');
                        loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                    
                        alertify.confirm('Would you like to save Attendance?', function(e){
                            if (e) {
                                   var presence_id = presents.function.isUphold;
                                   if (presence_id > 0) {
                                    var MyCollection = Backbone.Collection.extend({});
                                    var myCollection = new MyCollection();
                                        presents.forEach(function(model) {
                                            if (model.get('presence_id') == presence_id) {
                                                myCollection.add(model.attributes);
                                            };
                                        });
                                        presents.function.updateDB(myCollection);
                                   }else {
                                        presences.function.saveDB();
                                   }
                            }
                        });
                    });
                });

                self.$el.find('#btnAddEmpAttendance').on('click', function(event) {
                    var myCollection = employees.function.returnEmpWithLocationOf(payrolls.function.currentLocation_id);
                    employees.subviews.appendEmployeeNamesInCbo(myCollection);
                    $('#modalAddNewEmployeeInAttendance').modal('show');
                });

                self.$el.find('#check-all-attendance').on('change', function(event) {
                        var $target = $('#check-all-attendance');
                        var rs = $target.is(':checked');

                        var isUphold = presents.function.isUphold;
                        if (rs) {
                            //if checked
                            console.log(1)
                            $('#div-table-attendance').find('input[type="checkbox"]').prop('checked', true);
                            
                            var dd = attendances.function.date_diff;
                            attendances.forEach(function(model) {
                                model.set({
                                    num_of_days: dd
                                });
                            });

                            if (isUphold > 0) {
                                var ids = [];
                                presents.forEach(function(model) {
                                    if (model.get('presence_id') == isUphold) {
                                        ids.push(model.get('id'));
                                    };
                                });
                                ids.forEach(function(model) {
                                    var present = presents.get(model);
                                    present.set({value: 1});
                                });
                            }else {
                                var ids = [];
                                presents.forEach(function(model) {
                                    if (!model.has('presence_id')) {
                                        model.set({value: 1});
                                    };
                                });
                            }
                        }else {
                            //if not checked
                            console.log(2)
                            $('#div-table-attendance').find('input[type="checkbox"]').prop('checked', false);
                            
                            attendances.forEach(function(model) {
                                model.set({
                                    num_of_days: 0
                                });
                            });

                            if (isUphold > 0) {
                                var ids = [];
                                presents.forEach(function(model) {
                                    if (model.get('presence_id') == isUphold) {
                                        ids.push(model.get('id'));
                                    };
                                });
                                ids.forEach(function(model) {
                                    var present = presents.get(model);
                                    present.set({value: 0});
                                });
                            }else {
                                var ids = [];
                                presents.forEach(function(model) {
                                    if (!model.has('presence_id')) {
                                        model.set({value: 0});
                                    };
                                });
                            }

                        }

                });

                self.$el.find('#to').on('change', function(){
                    var from = $('#from').val();
                    var to = $('#to').val();
                    var result = moment(from).isBefore(to);
                    if(!result){
                        alert('Invalid transaction');
                        $('#panel-attendance').find('input[type="text"]').val('');
                    }else {
                        payrolls.function.validateIfDuplicate(to,from, payrolls.function.currentLocation_id);      
                        presents.function.removeModelWith0Id();                  
                    }
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#check-all-watchman').change(function(event) {
                        /* Act on the event */
                        var isChecked = $(this).is(':checked');
                        if (isChecked) {
                            attendances.forEach(function(model) {
                                model.set({num_of_days: 7});
                            });    
                        }else {
                            if($('#check-all-attendance').is(':checked')){
                                attendances.forEach(function(model) {
                                    model.set({num_of_days: 6});
                                }); 
                            }else {
                                attendances.forEach(function(model) {
                                    model.set({num_of_days: 0});
                                }); 
                            }
                        }
                        
                    });
                });

                $(function() {
                    payrolls.subviews.appendTablePayroll();
                	$panel.find('#from, #to').css({
                		width: '220px'
                	});       
                });


				$(function() {
					$panel.find('#from').change(function(event) {
						var from = $(this).val();
        				var dt = moment(from);
        				var day = dt.format('dddd');
        				var valid = ['Thursday','Friday','Saturday','Monday','Tuesday','Sunday'];
        				if (jQuery.inArray(day, valid) === -1) {
        					alert('Cut off time: Wednesday');
        					$(this).val('');
        				}
					});
				});


                $(function() {
                    $('#panel-attendance').find('#btnCreatePayroll').click(function(event) {
                        if(attendances.function.checkIfHasChecked()){
                            
                            payrolls.subviews.appendListOfPayroll();
                            $('#modalTablePayroll').modal({
                                 backdrop: 'static',
                                 keyboard: true
                            });
                            
                        }else {
                            alert("Invalid transaction");
                            $('#panel-attendance').find('input[type="text"]').val('');
                            console.log(1)
                        }
                        
                    });
                });

        	},

            addEmployee: function(event){
               
            },

            saveAttendance: function(event){
                
            },

        	generateAttendance: function(event){
                alert(1)
        		
        	},
        

            checkAllAttendance: function(event){
            
            }




    
    });
   
    return ViewAttendance; 
});