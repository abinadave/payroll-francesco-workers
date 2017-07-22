define(
	[
		'underscore',
		'backbone',
		'models/payroll',
        'libs/backbone.obscura',
        'libs/accounting.min',
        //subviews
        'views/payroll/view_table_payroll',
        'views/payroll/view_list_of_payroll',
        'models/payrollemp',
        'views/payroll/view_record_list_payroll',
        'views/payroll/view_overall_breakdown',
        'moment'
	],  function(
        _, 
        Backbone, 
        Payroll, 
        Obscura,
        accounting,

        ViewTablePayroll, 
        ViewListOfPayroll, 

        Payrollemp,

        ViewRecordListPayroll,
        ViewOverAllBreakDown,

        moment
    ){
   
    var Payrolls = Backbone.Collection.extend({

    	model: Payroll,
    	
    	initialize: function(){

    		this.on('add', function(model){
    			console.log('New payroll was added');
                userlogs.function.saveDB('New payroll was saved, Location: ' + model.get('location') + '. Date: ' + model.get('date_from') + ' to ' + model.get('date_to'));
    		});

            this.on('remove', function(model){
                console.log('Successfully removed');
                payrolls.subviews.appendAllRecordsPayroll();
                $.post('ajax/delete/delete_payroll.php', _.pick(model.attributes,'id'), function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var json = $.parseJSON(data);
                    if (json.success) {
                        removed_payrolls.add(model.attributes);
                    };
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            });


    	},

        _1000: 0,
        _500: 0,
        _200: 0,
        _100: 0,
        _50: 0,
        _20: 0,
        _10: 0,
        _5: 0,
        _1: 0,

    	function: {

            currentLocation: '',

            fetchData: function(){
                if (payrolls.length) {
                    payrolls.function.populateAll();
                }else {
                 $.getJSON('ajax/select/get_payrolls.php', function(json, textStatus, xhr) {
                     /*optional stuff to do after success */
                 }).success(function(json){
                     payrolls.function.saveModel(json, 1);
                     payrolls.function.populateAll(json, 1);
                 }).fail(function(xhr){
                     alert(' '+xhr.status);
                 });
                }
            },

            saveDB: function(data){
                var $btn = $('button#save-payroll');
                $btn.prop('disabled', true);
                $btn.text('Saving...');
                $.post('ajax/save/save_payroll.php', data, function(data, textStatus, xhr) {
                    $('#output-save-payroll').html(data);
                }).success(function(data){
                    var id = parseInt(data);
                    if (id) {
                         //check if the attendance was saved
                         if (presents.function.isUphold > 0) {
                             var presence_id = presents.function.isUphold;
                             presences.function.removeDB(presence_id);
                         }else {
                             console.log('not upholded');
                         }
                        var p_id = id;
                        var values = attendances; 
                            var lengthA = attendances.length;
                            var lengthB = 0;

                            attendances.forEach(function(model) {

                                var details = payrolls.function.getDetails(model.get('id'));
                                details.total = parseFloat(details.rpd) * parseFloat(model.get('num_of_days'));
                                details.net = parseFloat(model.get('total')) - parseFloat(model.get('advances')) - parseFloat(model.get('sss')) - parseFloat(model.get('phil'));
                                details.rice_allowance = 0.0;
                                details.ot_hrs = model.get('ot_hrs');
                                details.ot_mins = model.get('ot_mins');
                                details.undertime = model.get('undertime');
                                if (model.get('rice_allowance') == 1) {
                                    var total_rice_allowance = parseFloat(rice.get('price')) * parseFloat(model.get('num_of_days'));
                                    details.net += total_rice_allowance;
                                    details.rice_allowance = total_rice_allowance;
                                    details.has_allowance = 1;
                                }else {
                                    details.has_allowance = 0;
                                }
                                console.log(model.attributes);
                                  $.post('ajax/save/save_payrollemps.php', 
                                    {   values: model.attributes, 
                                        payroll_id: id, 
                                        data: details 
                                    } , function(data, textStatus, xhr) {
                                        /*optional stuff to do after success */
                                        $('#output-save-payrollemps').hide().html(data).fadeIn('fast');
                                  }).success(function(response){
                                        
                                        lengthB++;
                                        
                                        var payrollemp = new Payrollemp({ 
                                            payroll_id: p_id.toString(), 
                                            position: details.position, 
                                            rpd: details.rpd, 
                                            emp: model.get('id').toString(), 
                                            num_of_days: model.get('num_of_days').toString(), 
                                            advances: model.get('advances'), 
                                            sss: model.get('sss'), 
                                            phil: model.get('phil'), 
                                            rice_allowance: details.rice_allowance, 
                                            has_allowance: details.has_allowance, 
                                            total: details.total, 
                                            net: details.net ,
                                            ot_hrs: model.get('ot_hrs'),
                                            ot_mins: model.get('ot_mins'),
                                            undertime: model.get('undertime')
                                        });

                                        payrollemps.add(payrollemp);

                                        if (lengthA == lengthB) {
                                            var clonedCol = presents.clone();

                                            saved_dtrs.functions.save(p_id, clonedCol);

                                            router.alertify_alert('Process completed!')
                                            $('#modalTablePayroll').modal('hide');
                                            attendances.reset();
                                            setTimeout(function(){
                                                 router.navigate('Employees', true);
                                            },500);
                                        };

                                  });
                
                          });
                
                    }
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            saveModel: function(json, type){
                payrolls.add(json, {silent: type});
                return this;
            },

            populateAll: function(){
                payrolls.subviews.appendAllRecordsPayroll();
                // payrollemps.function.fetchData();
                overtime_payrolls.function.fetchData();
            },

            print: function(){
                if (payrolls.length) {
                    payrolls.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                };
            },

            getLocationTotal: function (payroll) {
                var proxy = new Obscura(pbreakdowns);
                proxy.filterBy('pid', {payroll_id: payroll.id});
                console.log(proxy.length);
            },

            getIndividualBreakdown: function(model) {
                var total = parseInt(model.net);
                var breakNum = [500,100,50,20,10,5,1];
                breakNum.forEach(function(i) {
                    if (total >= i) {
                        var num = parseInt(total / i);
                        total -= num * i;
                        model[i] = num;
                    }else {
                        model[i] = 0;
                    }
                });
                return model;
            },

            getDetails: function(id){
                var emp = employees.get(id);
                var data = {};
                data.rpd = parseFloat(emp.get('rpd'));
                data.position = emp.get('position');
                data.location = payrolls.function.currentLocation;
                return data;
            },

            getTotal: function(id){
                var thismodel = payrolls.get(id);
                return thismodel.get('total');
            },

            payrollTotal: function(i) {
                var proxy = new Obscura(payrollemps), net = 0;
                proxy.filterBy('payrollId', {payroll_id: i});
                proxy.forEach(function(model) {
                    net += Math.floor(model.get('net'));
                });
                return net;
            },

            getNet: function(id){
                var thismodel = payrolls.get(id);
                return thismodel.get('net');
            },

            getPayrollDate: function(i){
                var payroll = payrolls.get(i);
                var m1 = moment(payroll.get('date_from')).format('M');
                var m2 = moment(payroll.get('date_to')).format('M'); 
                if (m1 == m2) {
                    return moment(payroll.get('date_from')).format('MMM DD') +' - '+ moment(payroll.get('date_to')).format('DD, YYYY');
                }else {
                    return moment(payroll.get('date_from')).format('MMM DD') +' - '+moment(payroll.get('date_to')).format('MMM DD, YYYY');
                }
                
            },

            validateIfDuplicate: function(to, from, loc){
                var result = payrolls.where({location_id: loc});
                if (result.length) {
                    payrolls.forEach(function(model) {
                        if (model.get('location_id') == loc) {
                            var match = 0;
             
                            var DB_date_to = moment(model.get('date_to')).format('MM/DD/YYYY');
                            var DB_date_from = moment(model.get('date_from')).format('MM/DD/YYYY');
                            var MODEL_date_to = moment(to).format('MM/DD/YYYY');
                            var MODEL_date_from = moment(from).format('MM/DD/YYYY');

                            $.getJSON('ajax/others/range_of_dates2.php', { start: DB_date_from, end: DB_date_to }, function(json, textStatus, xhr) {

                            }).success(function(json){
                               json.forEach(function(model) {
                                    var formated_date = moment(model).format('MM/DD/YYYY');
                                    if(moment(formated_date).isBetween(MODEL_date_from, MODEL_date_to)){
                                       ++match;
                                    }
                               });



                                if (match > 0) {
                                    // alert('Duplicate');
                                    router.alertify_error('Duplicate payroll per location is not allowed').navigate('Employees', true);

                                    router.navigate('Employees', true);
                                }else { 
                                    console.log('ok man')
                                     attendances.function.from = from;
                                     attendances.function.to = to;
                                
                                            attendances.forEach(function(model) {
                                                var attendance = attendances.get(model.get('id'));
                                                attendance.set({
                                                    from: from,
                                                    to: to
                                                });
                                            });

                                        $.post('ajax/others/range_of_dates.php', { start: from, end: to }, function(data, textStatus, xhr) {
                                            $('#output-range-of-dates').html(data);
                                        }).success(function(data){
                                                                        
                                        }).fail(function(xhr){
                                            alert(' '+xhr.status);
                                        });  

                                }

                            }).fail(function(xhr){
                                alert(' '+xhr.status);
                            });
                           
                        }
                    });
                }else {
                                attendances.function.from = from;
                                     attendances.function.to = to;
                                
                                            attendances.forEach(function(model) {
                                                var attendance = attendances.get(model.get('id'));
                                                attendance.set({
                                                    from: from,
                                                    to: to
                                                });
                                            });

                                        $.post('ajax/others/range_of_dates.php', { start: from, end: to }, function(data, textStatus, xhr) {
                                            $('#output-range-of-dates').html(data);
                                        }).success(function(data){
                                                                        
                                        }).fail(function(xhr){
                                            alert(' '+xhr.status);
                                        });  
                }
            },

            getEmployeesWherePayrollId: function(id){
                var proxy = new Obscura(payrollemps);
                var lists = proxy.filterBy('payroll_id', {payroll_id: id});
                return lists;
            },

            getRange: function(from, to){
                var list = new Backbone.Collection();
                payrolls.forEach(function(model) {
                    if ( moment(model.get('date_from')).isSame(from) && moment(model.get('date_to')).isSame(to) ) {
                        list.add(model);
                    };
                });
                return list;
            },

            transformNoOfDays: function(num) {
                var i = parseFloat(num);
                if (i % 1 == 0.5) {
                    return num;
                }else {
                    if (i == 0.5) {
                        return .5;
                    }
                    return parseInt(num);
                }
            },

            getFromTo: function(model) {
                var y1 = moment(model.date_from).format('YYYY');
                var y2 = moment(model.date_to).format('YYYY');
                if(y1 == y2){
                    var m1 = moment(model.date_from).format('MMMM'), m2 = moment(model.date_to).format('MMMM');
                    if (m1 === m2) {
                        return moment(model.date_from).format('MMMM DD') + '-' + moment(model.date_to).format('DD, YYYY');
                    }else {
                        return moment(model.date_from).format('MMMM DD') + '-' + moment(model.date_to).format('MMMM DD, YYYY');
                    }
                }else {
                    return moment(model.date_from).format('MMMM DD, YYYY') + '&nbsp;&nbsp;&nbsp; -- &nbsp;&nbsp;&nbsp;' + moment(model.date_to).format('MMM DD YYYY');
                }
            },

            getPayrollWithIdOf: function(ids) {
                var list = new Backbone.Collection();
                ids.forEach(function(i) {
                    var rs = payrolls.where({id: i});
                    if (rs.length) {
                        var model = payrolls.get(i);
                        list.add(model);
                    };
                });
                return list;
            }



        },


    	subviews: {
            appendTablePayroll: function(){
                var view = new ViewTablePayroll();
                view.render();
            },

            appendListOfPayroll: function(){
                var view = new ViewListOfPayroll();
                view.render();
            },

            appendOverAllTotal: function(list) {
                require(['views/payroll/view_list_of_payorll_overall'], function(Subview){
                    var view = new Subview({
                        collection: list
                    });
                });
            },

            appendAllRecordsPayroll: function(){
                var view = new ViewRecordListPayroll({
                    collection: payrolls
                });
                view.render();
            },

            appendListOfPayroll2: function(list){
                var view = new ViewRecordListPayroll({
                    collection: list
                });
                view.render();
            },
            
            appendOverAllBreakDown: function(myCollection){
                var view = new ViewOverAllBreakDown({
                    collection: myCollection
                });
                view.render();
            },

            appendOvertimeAttendance: function(arguments) {
                require(['views/payroll/overtime/view_table_panel_overtime'], function(Subview){
                    var view = new Subview();
                });
            },

            appendListOfOvertimePayroll: function(arguments) {
               require(['views/payroll/overtime/view_list_of_overtime_employees'], function(Subview){
                   var view = new Subview();
               });
            },

            appendAttendance: function(){
               
            }

    	}

    });
   
    return Payrolls; 
});