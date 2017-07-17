define(
	[
		'underscore',
		'backbone',
		'models/attendance',
        'libs/backbone.obscura',
        'collections/mycollection',
        'views/attendance/view_range_of_days_thead',
        'views/attendance/view_modal_add_new_employee',
        'views/attendance/view_append_new_attendance',
        'views/attendance/view_modal_loading',
        'moment',
        'libs/accounting.min'
	],  function(_, Backbone, Attendance, Obscura, MyCollection, ViewRangeOfDaysThead, ViewModalAddNewEmployee, ViewAppendNewAttendance, ViewModalLoading, moment, accounting) {
   
    var Attendances = Backbone.Collection.extend({

    	model: Attendance,

    	initialize: function(){

    		this.on('add', function(model){
                this.subviews.appendNewTrAttendance(model.attributes);
    		});
    		this.on('remove', function(model){
    			var attributes = model.attributes;
                attendances.function.afterRemoved(attributes);
    		});

    	},



    	function: {
    		//all functions...
            afterRemoved: function(removed){
                var from = removed.from;
                var to = removed.to;
                var ids = [];
                
                presents.forEach(function(model) {
                    var str = model.get('id');
                    var res = str.split('-');
                    var date = res[1] + " " + res[2] + " " + res[3];
                    if (moment(date).isBetween(from, to) || moment(date).isSame(from) || moment(date).isSame(to)) {
                        if (res[0] == removed.id) {
                           ids.push(model.get('id'))
                        };
                    };
                });

                presents.function.removeDB(ids)
                
            },

            saveModel: function(rid){
                var attendance = new Attendance({
                    id: rid
                });
                attendances.add(attendance, {silent: true});
            },

           
            print: function(){
                attendances.forEach(function(model) {
                    console.log(model.attributes); 
                });
            },

            catchDate: function(value){
                var length = value.length;
                attendances.function.currentRangeOfDates = value;
                value.forEach(function(model) {
                    var dt = moment(model);
                    if (dt.format('dddd') == "Sunday") {
                        length--;
                    }
                });

                attendances.subviews.appendRangeOfDaysThead(value);
                attendances.function.date_diff = length;
                
                if (value.length >= 0 && value.length <= 10) {
                    $('#table-attendance').css({
                        width: '1500px'
                    });
                }else if (value.length >= 11 && value.length <= 20) {
                    $('#table-attendance').css({
                        width: '3000px'
                    });
                }else if (value.length >= 21 && value.length <= 30) {
                    $('#table-attendance').css({
                        width: '5000px'
                    });
                };

                if (attendances.length) {
                    attendances.forEach(function(model) {
                        model.set({ num_of_days: 0});
                    });
                };
            },

            date_diff: 0,

            from: 0,

            to: 0,

            currentLocation: 0,

            currentRangeOfDates: '',

            get_date_difference: function(to, from){
                var a = moment(from);
                var b = moment(to);
                return a.diff(b, 'days'); 
            },

            getNumOfDays: function(i) {
                var num = Number(i);
                if (num >= 1) {
                    return (num % 1 === 0) ? parseInt(num) : num; 
                }else {
                    return num;
                }
            },

            checkIfHasChecked: function(){
                var checked = 0;
                var $table = $('#table-attendance').find('input[type="checkbox"]:checked');
                $table.each(function(index, el) {   
                     checked++;
                });
                return checked;
            },

            getTotal: function(){
                var total = 0.0;
                attendances.forEach(function(model) {
                    var emp = employees.get(model.get('id'));
                    var formula = 0.0;
                    formula = parseFloat(emp.get('rpd')) * parseFloat(model.get('num_of_days'));
                    total += formula;
                });
                return total;
            },

            getAdvancesTotal: function(){
                var total_advances = 0.0;
                attendances.forEach(function(model) {
                   total_advances += parseFloat(model.get('advances'));
                });
                return total_advances;
            },

            getSSSTotal: function(){
                var total_sss = 0.0;
                attendances.forEach(function(model) {
                   total_sss += parseFloat(model.get('sss'));
                });
                return total_sss;
            },

            getPhilTotal: function(){
                var total_phil = 0.0;
                attendances.forEach(function(model) {
                   total_phil += parseFloat(model.get('phil'));
                });
                return total_phil;
            },

            getRiceAllowanceTotal: function(){
                var total_rice_allowance = 0.0;
                attendances.forEach(function(model) {
                    if (model.get('rice_allowance') == 1) {
                        var rice_total = parseFloat(rice.get('price')) * parseFloat(model.get('num_of_days'));
                        total_rice_allowance += rice_total;
                    };
                }); 
                
                return total_rice_allowance;
            },

            getOverAllTotal: function(){
                var overall = 0.0;
                overall = attendances.function.getTotal();
                overall -= attendances.function.getAdvancesTotal();
                overall -= attendances.function.getSSSTotal();
                overall -= attendances.function.getPhilTotal();
                attendances.forEach(function(model) {
                    if (model.get('rice_allowance') == 1) {
                        var total_rice_allowance = parseFloat(rice.get('price')) * parseFloat(model.get('num_of_days'));
                        overall += total_rice_allowance;
                    }
                });
                return overall;
            },

            advancesChanged: function(id, value){
                var $table = $('#table-payroll');
                var attendance = attendances.get(id), employee = employees.get(id), own_salary = 0.0, td = $('#net-amount-'+id), over_all_total = 0.0, deduct_advances = 0.0;
                
                let rpd = employee.get('rpd');
                let ratePerHour = (Number(rpd) / 8);
                let ratePerMin = Number(ratePerHour) / 60;

                let totalOverTimeHrs = ( Number(rpd) / 8) * Number(value);
                let totalOvertimeMins = ratePerMin * Number(value);

                own_salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                own_salary -= parseFloat(attendance.get('advances'));
                own_salary -= parseFloat(attendance.get('sss'));
               
                own_salary += parseFloat(totalOverTimeHrs);
                own_salary += parseFloat(totalOvertimeMins);

                   if (attendance.get('rice_allowance') == 1) {
                        var rice_times_nod = parseFloat(attendance.get('num_of_days')) * parseFloat(rice.get('price'));
                        own_salary += rice_times_nod;
                    };
                td.text(accounting.formatMoney(own_salary," ", 2));
                
               //this.redisplayTotality();
                return this;
               
            },
            
            otMinsChanged: function(id, value){
                // alert('changed')
                var $table = $('#table-payroll');
                var attendance = attendances.get(id), 
                employee = employees.get(id),
                own_salary = 0.0, 
                td = $('#net-amount-'+id), 
                over_all_total = 0.0, 
                deduct_advances = 0.0;

                let rpd = employee.get('rpd');
                let ratePerHour = (Number(rpd) / 8);
                let ratePerMin = Number(ratePerHour) / 60;

                let totalOverTimeHrs = ( Number(rpd) / 8) * Number(attendance.get('ot_hrs'));
                let totalOvertimeMins = ratePerMin * Number(value);

                own_salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                
                own_salary += parseFloat(totalOverTimeHrs);
                own_salary += parseFloat(totalOvertimeMins);

                if (attendance.get('rice_allowance') == 1) {
                    var rice_times_nod = parseFloat(attendance.get('num_of_days')) * parseFloat(rice.get('price'));
                    own_salary += rice_times_nod;
                };
                td.text(accounting.formatMoney(own_salary," ", 2));
                
               //this.redisplayTotality();
                return this;
            },

            otHrsChanged: function(id, value){
                // alert('changed')
                var $table = $('#table-payroll');
                var attendance = attendances.get(id), 
                employee = employees.get(id),
                own_salary = 0.0, 
                td = $('#net-amount-'+id), 
                over_all_total = 0.0, 
                deduct_advances = 0.0;

                let rpd = employee.get('rpd');
                
                let ratePerHour = (Number(rpd) / 8);
                let ratePerMin = Number(ratePerHour) / 60;

                let totalOverTimeHrs = ( Number(rpd) / 8) * Number(value);
                let totalOvertimeMins = ratePerMin * Number(attendance.get('ot_mins'));
                console.log('total overtime hrs: ' + totalOverTimeHrs);
                own_salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                own_salary -= parseFloat(attendance.get('advances'));
                own_salary -= parseFloat(attendance.get('sss'));
                
                own_salary += parseFloat(totalOverTimeHrs);
                own_salary += parseFloat(totalOvertimeMins);
                
                if (attendance.get('rice_allowance') == 1) {
                    var rice_times_nod = parseFloat(attendance.get('num_of_days')) * parseFloat(rice.get('price'));
                    own_salary += rice_times_nod;
                };
                td.text(accounting.formatMoney(own_salary," ", 2));
                
               //this.redisplayTotality();
                return this;
               
            },

            sssChanged: function(id, value){
                var $table = $('#table-payroll');
                var attendance = attendances.get(id), employee = employees.get(id), own_salary = 0.0, td = $('#net-amount-'+id), over_all_total = 0.0, deduct_sss = 0.0;
                
                let rpd = employee.get('rpd');
                let totalOverTimeHrs = ( Number(rpd) / 8) * Number(value);
                
                own_salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                own_salary -= parseFloat(attendance.get('advances'));
                own_salary -= parseFloat(attendance.get('sss'));

                own_salary += parseFloat(totalOverTimeHrs);

                    if (attendance.get('rice_allowance') == 1) {
                        var rice_times_nod = parseFloat(attendance.get('num_of_days')) * parseFloat(rice.get('price'));
                        own_salary += rice_times_nod;
                    };
                td.text(accounting.formatMoney(own_salary," ", 2));

               //this.redisplayTotality();
                return this;

            },

            philChanged: function(id, value){
                // var $table = $('#table-payroll');
                // var attendance = attendances.get(id), employee = employees.get(id), own_salary = 0.0, td = $('#net-amount-'+id), over_all_total = 0.0, deduct_sss = 0.0;
               
                // let rpd = employee.get('rpd');
                // let totalOverTimeHrs = ( Number(rpd) / 8) * Number(value);
                
                // own_salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                // own_salary -= parseFloat(attendance.get('advances'));
                // own_salary -= parseFloat(attendance.get('sss'));

                // own_salary += parseFloat(totalOverTimeHrs);

                //     if (attendance.get('rice_allowance') == 1) {
                //         var rice_times_nod = parseFloat(attendance.get('num_of_days')) * parseFloat(rice.get('price'));
                //         own_salary += rice_times_nod;
                //     };
                // td.text(accounting.formatMoney(own_salary," ", 2));

                // //this.redisplayTotality();
                // return this;
            },

            redisplayTotality: function(){
                //comming soon..
                var $table = $('#table-payroll');

                var over_all_total = 0.0;
                var total = 0.0;
                var advances = 0.0;
                var sss = 0.0;
                var ot_hrs = 0.0;
                var ot_mins = 0.0;
                var phil = 0.0;
                let rpd = 0;
                let rph = 0;
                let totalOverTimeHrs = 0;
                let totalOvertimeMins = 0;
                attendances.forEach(function(model) {
                    var emp = employees.get(model.get('id'));
                    var total = parseFloat(emp.get('rpd')) * parseFloat(model.get('num_of_days'));
                    
                    rph = Number(emp.get('rpd')) / 8;
                    rpm = Number(rph) / 60;

                    totalOverTimeHrs = Number(rph) * Number(model.get('ot_hrs'));
                    totalOvertimeMins = Number(rpm) * Number(model.get('ot_mins'));

                    total += Number(totalOverTimeHrs);
                    total += Number(totalOvertimeMins);

                    if (model.get('rice_allowance') == 1) {
                        var rice_times_nod = parseFloat(model.get('num_of_days')) * parseFloat(rice.get('price'));
                        over_all_total += rice_times_nod;
                    };

                    over_all_total += total;
                    advances += parseFloat(model.get('advances'));
                    sss += parseFloat(model.get('sss'));
                    phil += parseFloat(model.get('phil'));
                    ot_hrs += parseFloat(model.get('ot_hrs'));
                    ot_mins += parseFloat((model.get('ot_mins')));  
                });

                console.log('sum of ot_mins: ' + ot_mins);

                $table.find('#payroll-advances').text(accounting.formatMoney(advances, " ", 2)).end()
                      .find('#payroll-overtime-hrs').text(accounting.formatMoney(ot_hrs, " ", 0)).end()
                      .find('#payroll-phil').text(accounting.formatMoney(phil, " ", 2)).end()
                      .find('#over-all-total').text(accounting.formatMoney(over_all_total," ", 2)).end()
                      .find('#over-all-total-rounded').text(accounting.formatMoney(Math.round(over_all_total)," ",0)).end();

            },

            redisplayIndividialNetAmount: function(){
                var $table = $('#table-payroll');
                attendances.forEach(function(model) {
                    var employee = employees.get(model.get('id')), own_salary = 0.0, td = $('#net-amount-'+model.get('id')), over_all_total = 0.0, deduct_sss = 0.0;
                    own_salary = parseFloat(model.get('num_of_days')) * parseFloat(employee.get('rpd'));
                    own_salary -= parseFloat(model.get('phil'));
                    own_salary -= parseFloat(model.get('advances'));
                    own_salary -= parseFloat(model.get('sss'));
                        if (model.get('rice_allowance') == 1) {
                            var rice_times_nod = parseFloat(model.get('num_of_days')) * parseFloat(rice.get('price'));
                            own_salary += rice_times_nod;
                        };
                    td.text(accounting.formatMoney(own_salary," ", 2));
                });
                
            },

            sortAtoZ: function(collection){
                var list = new MyCollection()
                collection.forEach(function(model) {
                    var emp = employees.get(model.get('id'));
                    model.set({lastname: emp.get('lastname')});
                    list.add(model);
                });
                
                var proxy = new Obscura(list);
                return proxy.setSort('lastname', 'asc');
                
            }

    	},



    	subviews: {

    		//all subviews...
            appendRangeOfDaysThead: function(value){
                var view = new ViewRangeOfDaysThead({
                    collection: attendances
                });
                view.render(value);
            },

            appendModalAddNewEMpInAttendance: function(){
                var view = new ViewModalAddNewEmployee();
                view.render();
            },

            appendNewTrAttendance: function(thismodel){
                var $target = $('#range-of-days');
                var output = '';
                var dates = attendances.function.currentRangeOfDates;
                var view = new ViewAppendNewAttendance();
                view.render(dates, thismodel);
            },

            appendModalLoading: function(num){
                var interval = (parseInt(num) > 0) ? num : 0;
                var view = new ViewModalLoading();
                view.interval = interval;
                view.render();
            },

            initializeViewAttendance: function(){
                 $(function(){

                    //jQuery
                    var $table = $('#table-attendance');
                    $table.find('input[type="checkbox"]').change(function(event) {
                        var rs = $(this).is(':checked');
                        var id = $(this).val();
                        var present_id = this.id;
                        var thismodel = attendances.get(id);

                        if (rs) {
                            var nod = thismodel.get('num_of_days');
                            nod+= 0.5;
                            thismodel.set({
                                num_of_days: nod
                            });

                                var rsPresents = presents.where({id: present_id});
                                if (rsPresents.length) {
                                    //update
                                    var thismodel = presents.get({id: present_id});
                                    thismodel.set({value:  '1'})
                                }

                        }
                        else {
                            var nod = thismodel.get('num_of_days');
                            nod-= 0.5;
                            thismodel.set({
                                num_of_days: nod
                            });

                                var rsPresents = presents.where({id: present_id});
                                if (rsPresents.length) {
                                    //update
                                    var thismodel = presents.get({id: present_id});
                                    thismodel.set({value:  '0'})
                                }
                        }

                    });
                });

                //for tooltip
                jQuery(document).ready(function($) {
                    $(function () {
                        $('[data-toggle="tooltip"]').tooltip();
                    })
                });


                $(document).ready(function() {
                      var $panel = $('#panel-attendance');
                      var from = $panel.find('#from').val();
                      var to = $panel.find('#to').val();
                      
                      presents.forEach(function(model) {
                           if (model.get('value') == 1) {
                               $panel.find('#'+model.get('id')).prop('checked', true);
                           };
                      });

                      setTimeout(function() {
                           $panel.find('#range-of-days').find('input[type="checkbox"]:checked').each(function(index, el) {
                             var id = this.id;
                             var value = $(this).val();
                             var attendance = attendances.get(value.toString());
                             var total = 0;
                             var nod = parseFloat(attendance.get('num_of_days'));
                             total = nod + 0.5;
                             attendance.set({num_of_days: total});
                         });
                      }, 700)
                    
                });

            },

            initializeTdWhenClicked: function(){
                jQuery(document).ready(function($) {
                   $('td#td-attendance').click(function(event) {
                       var chk = $(this).find(':checkbox');
                       var val = chk.val();
                       var thismodel = attendances.get(val);
                       var present_id = chk.attr('id');

                       if(!chk.is(':checked') && event.target.nodeName == 'TD'){
                          chk.prop('checked', true);
                           var nod = thismodel.get('num_of_days');
                            nod+= 0.5;
                            thismodel.set({
                                num_of_days: nod
                            });

                                var rsPresents = presents.where({id: present_id});
                                if (rsPresents.length) {
                                    //update
                                    var thismodel = presents.get({id: present_id});
                                    thismodel.set({value:  '1'})
                                }
                                
                       }else if(chk.is(':checked') && event.target.nodeName == 'TD'){
                           chk.prop('checked', false);
                           var nod = thismodel.get('num_of_days');
                            nod-= 0.5;
                            thismodel.set({
                                num_of_days: nod
                            });

                                var rsPresents = presents.where({id: present_id});
                                if (rsPresents.length) {
                                    //update
                                    var thismodel = presents.get({id: present_id});
                                    thismodel.set({value:  '0'})
                                }
                       }

                   });
               });
            },


            initializeJS: function(){

                 $(function() {
                    attendances.function.redisplayTotality();
                    attendances.function.redisplayIndividialNetAmount();
                    $('#table-payroll input').keyup(function(event) {
                        var id = this.id;
                        var value = $(this).val();
                        let classes = $(this).attr('class');

                        if (_.isEqual(id,'emp-advances')) {
                            //for advances..
                             var td_id = $(this).parent().get(0).id;
                             var attendance = attendances.get(td_id);
                             var employee = employees.get(td_id);
                             var salary = 0.0;
                             salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                             salary -= parseFloat(attendance.get('sss'));
                             salary -= parseFloat(attendance.get('phil'));
                             if (value != '') {
                                if (!$.isNumeric(value)) {
                                   // $('#net-amount-'+td_id).text(acc.formatMoney(salary," ",2));
                                    alert('Invalid input');
                                    $(this).val(''); 
                                    attendance.set({advances: 0});
                                }else {
                                     if (value > salary) {
                                        alert('Invalid');   
                                        $(this).val(''); 
                                        //$('#net-amount-'+td_id).text(acc.formatMoney(salary," ",2));
                                        attendance.set({advances: 0});
                                     }else {                         
                                        attendance.set({advances: value});
                                     }
                                }
                             }else {
                                 attendance.set({advances: 0});
                                // $('#net-amount-'+td_id).text(acc.formatMoney(salary," ",2));
                             }
                             
                        }else if (_.isEqual(id,'emp-overtime-hrs')) {
                            //for advances..

                            let class3 = classes.split(' ')[2];
                            let emp_id = class3.split('-').pop();
                            var attendance = attendances.get(emp_id);
                            var employee = employees.get(emp_id);
                            let rpd = employee.get('rpd');
                            let totalOverTimeHrs = ( Number(rpd) / 8) * Number(value);
                            var salary = 0.0;

                            salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                            salary -= parseFloat(attendance.get('advances'));
                            salary -= parseFloat(attendance.get('phil'));
                            salary += parseFloat(totalOverTimeHrs);
                            if (value != '') {
                                if (!$.isNumeric(value)) {

                                    //if string..
                                    alert('Invalid input');
                                    $(this).val(''); 
                                    attendance.set({ot_hrs: 0});

                                }else {

                                    // if number..
                                     if (value > salary) {
                                         $(this).val(''); 
                                         alert('Invalid');
                                        attendance.set({ot_hrs: 0});
                                     }else {                         
                                        attendance.set({ot_hrs: value});
                                     }

                                }
                                
                            }else {
                                attendance.set({ot_hrs: 0});
                            }


                        }else if (_.isEqual(id,'emp-overtime-mins')) {
                            //for advances..

                            let class3 = classes.split(' ')[2];
                            let emp_id = class3.split('-').pop();
                            var attendance = attendances.get(emp_id);
                            var employee = employees.get(emp_id);
                            var salary = 0.0;

                            salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                            salary -= parseFloat(attendance.get('advances'));
                            salary -= parseFloat(attendance.get('phil'));

                            if (value != '') {
                                if (!$.isNumeric(value)) {

                                    //if string..
                                    alert('Invalid input');
                                    $(this).val(''); 
                                    attendance.set({ot_mins: 0});

                                }else {

                                    // if number..
                                     if (value > salary) {
                                         $(this).val(''); 
                                         alert('Invalid');
                                        attendance.set({ot_mins: 0});
                                     }else {                         
                                        attendance.set({ot_mins: value});
                                     }

                                }
                                
                            }else {
                                attendance.set({ot_mins: 0});
                            }


                        }else if(_.isEqual(id,'emp-sss')){
                            //for phil health..
                            var td_id = $(this).parent().get(0).id;
                            var attendance = attendances.get(td_id);
                            var employee = employees.get(td_id);
                            var salary = 0.0;
                            salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                            salary -= parseFloat(attendance.get('advances'));
                            salary -= parseFloat(attendance.get('phil'));

                            if (value != '') {
                                if (!$.isNumeric(value)) {

                                    //if string..
                                    alert('Invalid input');
                                    $(this).val(''); 
                                    attendance.set({sss: 0});

                                }else {

                                    // if number..
                                     if (value > salary) {
                                         $(this).val(''); 
                                         alert('Invalid');
                                        attendance.set({sss: 0});
                                     }else {                         
                                        attendance.set({sss: value});
                                     }

                                }
                                
                            }else {
                                attendance.set({sss: 0});
                            }


                        }else if(_.isEqual(id, 'emp-phil')){
                            var td_id = $(this).parent().get(0).id;
                            var attendance = attendances.get(td_id);
                            var employee = employees.get(td_id);
                            var salary = 0.0;
                            salary = parseFloat(attendance.get('num_of_days')) * parseFloat(employee.get('rpd'));
                            salary -= parseFloat(attendance.get('advances'));
                            salary -= parseFloat(attendance.get('sss'));

                            if (value != '') {
                                if (!$.isNumeric(value)) {

                                    //if string..
                                    alert('Invalid input');
                                    $(this).val(''); 
                                    attendance.set({phil: 0});

                                }else {

                                    // if number..
                                     if (value > salary) {
                                         $(this).val('');
                                         alert('Invalid') 
                                        attendance.set({phil: 0});
                                     }else {                         
                                        attendance.set({phil: value});
                                     }

                                }
                                
                            }else {
                                attendance.set({phil: 0});
                            }                            
                        }

                    });

                });


                        $(function() {
                            $('#table-payroll').find('input').css({
                                fontWeight: 'bold',
                                textAlign: 'center'
                            });
                        });

                        $(function() {
                            $('#list-of-payroll').find('#rice-allowance').click(function(event) {
                                /* Act on the event */
                                if ($(this).is(':checked')) { 
                                    var thismodel = attendances.get($(this).val());
                                    thismodel.set({rice_allowance: 1});
                                }else {
                                    var thismodel = attendances.get($(this).val());
                                    thismodel.set({rice_allowance: 0});
                                }
                            });
                        });

                        $(function() {
                            attendances.forEach(function(model) {
                                if (model.get('rice_allowance') == 1) {
                                    var result = $('.chk-rice'+model.get('id')).prop('checked', true);
                                }
                                if (model.get('advances')) {
                                    $('.input-advances-'+model.get('id')).val(model.get('advances'));
                                };
                                if (model.get('sss')) {
                                    $('.input-sss-'+model.get('id')).val(model.get('sss'));
                                };
                                if (model.get('phil')) {
                                    $('.input-phil-'+model.get('id')).val(model.get('phil'));
                                };
                             });
                        });




            }




    	}

    });
   
    return Attendances; 
});


