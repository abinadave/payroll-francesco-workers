define( 
	[
        'jquery',
		'underscore',
		'backbone',
		'text!templates/employee/temp_table_employee.html',
        'views/debt/view_modal_input_pay_debt',
        'libs/accounting.min'
	],  function($, _, Backbone, template, SUbviewDebt, Accounting) {
   
    var ViewEmployee = Backbone.View.extend({
        
        	initialize: function(){
        		//console.log('View initialized..');
            let view2 = new SUbviewDebt({
                collection: debts
            });
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
                'click #btnCreateEmployee': 'createEmployee',
                'click #btnUpdateEmployee': 'updateEmployee',
                'click #btnCreateAttendance': 'createAttendance',
                'change #with-ra': 'withRiceAllowance',
                'change #with-na': 'withNoRiceAllowance',
                'change #with-all': 'displayAllEmployee',
                'click #btnAdvance': 'addNewAdvance',
                'click #btnOvertimePayroll': 'showPanelOvertime'
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.hide().append(output).fadeIn('slow');
                self.init();
                employees.subviews.initSorting();
    	        return self;
        	},
            findClickedTr(){
                let self = this;
                let $el = $("#list-of-employees tr");
                let found = false;
                let id = 0;
                $el.each(function(index, el) {
                    if($(this).hasClass('text-warning')){
                        id = this.id;
                    }
                });
                return id;
            },
            fetchDebt(empId){
                let self = this;
                let $modal = $('#modalPayDebt');
                let rs = _.where(debts.toJSON(), { emp_id: empId});
                if (rs.length) {
                    let debt = rs[0];
                    $modal.find('input#balance').val(Accounting.formatNumber(debt.value));
                }else {
                     $modal.find('input#balance').val('0');
                }
            },
        	init: function(){
                // alert(SUbviewDebt)
                 var $checkAll = $('#check-all-employee');
                 var self = this;

                 jQuery(document).ready(function($) {
                     self.$el.find('#btnCa').click(function(event) {
                        $('#modalPayDebt').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        let empId = self.findClickedTr();
                        let rs = employees.where({id:empId});
                        self.fetchDebt(empId);
                        if (rs.length) {
                            let model = _.first(rs).toJSON();
                            console.log(model)
                            $('#debt-emp-id').val(empId);
                            $('#debt-fullname').val(model.firstname.toUpperCase() + ' ' + model.lastname.toUpperCase());
                        }
                     });
                 });
                 $(function() {
                     self.$el.find('#btnUpdateEmployee').on('click', function(event) {
                        var $target = $('#hidden-emp-id');
                        var $modal = $('#modalUpdateEmployee');
                        var value = $target.val();
                        if (value) {
                            require(['views/employee/view_modal_update_employee'], 
                                function(SubviewMUE){
                                var view = new SubviewMUE();
                                view.render();
                                self.fillModalUpdateEmployee(value);
                            });
                        };
                     });
                 });

                 $(function() {
                    setTimeout(function() {
                        router.employeeSubviews();
                    }, 500);    

                    setTimeout(function() {
                        pictures.fetch({silent: true, url: 'api.php/get/pictures'});
                    }, 2000);
                    
                 });

                 $(function() {
                     self.$el.find('#btnUpdateImage').click(function(event) {
                         var empId = $('#hidden-emp-id').val();
                         router.navigate('updatePicture/'+empId, true);
                         console.log(empId);
                     });
                 });

                 $(function() {
                     var height = $(window).height();
                     var width = $(window).width();

                     self.$el.find('#div-overflow').css({
                         height: height - 200 + 'px'
                     });
                 });

                 $(function() {
                     self.$el.find('#search-emp').keyup(function(event) {
                         self.searchEmployee(event);
                     });
                 });

                 $(function() {
                     self.$el.find('#btnCreateEmployee').click(function(event) {
                            var $modal = $('#modalCreateEmployee');
                            $modal.modal({
                              // backdrop: 'static',
                              // keyboard: false,
                              show: true
                            });

                            $('#default-select').prop('selected', true);
                            setTimeout(function(){
                                $modal.find('#firstname').focus();
                            },1000);
                     });
                 });
                 
                 $(function() {
                     if (Number(sessionStorage.getItem('usertype')) === 3) {
                        self.$el.find('#for-secretary').remove();
                     }
                 });

                 $(function() {
                     setTimeout(function() {
                        $.when(positions.fetch({
                            silent: true,
                            url: 'api.php/get_order_by/positions/name/desc'
                        })).then(function(arguments) {
                            require(['views/position/view_display_by_position_cbo'], 
                                function(SubviewDBP){
                                var view = new SubviewDBP({
                                    collection: positions
                                });
                            });
                        });
                     }, 600);
                 });

                $(function(){
                    //jQuery
                    var $select = $('#display-by-project');
                    $select.change(function(event) {
                        $checkAll.prop('checked', false);
                        if ($(this).val() == 0) {
                            employees.subviews.appendListOfEmployees();
                        }else {
                             var ids = employees.function.searchWithLocationOf($(this).val());
                            if (ids.length) {
                                employees.subviews.appendListOfEmployeesById(ids);
                            }else {
                                var output = '';
                                output += '<tr>';
                                output += '<td>-</td>';
                                output += '<td>-</td>';
                                output += '<td>No result was found for: <span class="text-danger">'+ projects.function.getLocation($(this).val()) +'</span> </td>';
                                output += '<td>-</td>';
                                output += '<td>-</td>';
                                output += '<td>-</td>';
                                output += '<td>-</td>';
                                output += '</tr>';
                                $('#list-of-employees').html(output);
                            }
                        }
                       
                    });
                });


                $(function() {
                   
                    $checkAll.click(function(event) {
                        if ($(this).is(':checked')) {
                            $('#list-of-employees').find(':checkbox').prop('checked', true);
                        }else {
                             $('#list-of-employees').find(':checkbox').prop('checked', false);
                        }
                    });
                });
                
                $(function() {
                    self.$el.find('#btnCreateAttendance').click(function(event) {
                        attendances.reset();
                        presents.function.isUphold = 0;
                        var ids = employees.function.getCheckedEmployees();
                        var loc = $('#display-by-project').val();

                        if (ids.length && loc >0) {
                            var result = projects.where({id: loc});
                            if (result.length) {
                                attendances.function.currentLocation = $('#display-by-project').val();
                                var project = projects.get(loc);
                                payrolls.function.currentLocation = project.get('location');
                                payrolls.function.currentLocation_id = project.get('id');
                            }else {
                                payrolls.function.currentLocation = loc;
                            }

                            ids.forEach(function(id) {
                                attendances.function.saveModel(id);
                            });
                            
                            view_attendace.render();
                            router.navigate('#createAttendance');

                        }else {
                            alert("Please select employee or location");
                        }
                    });
                });

                $(function() {
                    self.$el.find('#btnOvertimePayroll').click(function(event) {
                        var ids = employees.function.getCheckedEmployees();
                        var projId = $('#display-by-project').val();

                        if (ids.length) {

                            ids.forEach(function(i) {
                               var model = employees.get(i);
                               var obj = _.omit(model.attributes, 'rand','rice_allowance','gender');
                               obj.rph = parseFloat(model.get('rpd')) / 8;
                               obj.designation = positions.function.getName(model.get('position')),
                               obj.hrs = 0.0;
                               obj.total = 0.0;
                               selected_emps.add(obj);
                            });
                           
                            payrolls.subviews.appendOvertimeAttendance();

                            var location = projects.get(projId);

                            selected_emps.location_id = location.get('id');
                            selected_emps.location_name = location.get('location');
                    
                        }else {
                            router.alertify_error('Please select employees');
                        }
                    });
                });

               

        	},

            addNewAdvance: function(event){
                var emp_id = $('#hidden-emp-id').val();
                var name = employees.function.getFullname(emp_id);
                var thisdate = new Date();
                var result = debts.where({id: emp_id.toString()});
                if (result.length) {
                   
                    require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                        function(css, alertify){
                            loadCSS('js/libs/alertify/css/alertify.core.css');
                            loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                        
                            alertify.confirm('Employee has existing debts do you want to update ?', function(e){
                                if (e) {
                                        alertify.prompt("Cash Advance: (" +name+")", function (e, str) {
                                        if (e) {
                                            if ($.isNumeric(str)) {
                                                $.post('ajax/update/update_debts.php', { id: emp_id, fullname: name, value: str, date: thisdate }, function(data, textStatus, xhr) {
                                                    $('#output-save-debt').html(data);
                                                }).success(function(data){
                                                    if (data) {
                                                        var debt = debts.get(emp_id.toString());
                                                        debt.set({value: data});
                                                    };
                                                }).fail(function(xhr){
                                                    alert(' '+xhr.status);
                                                });
                                            }else {
                                               router.alertify_error('Invalid input');
                                            }
                                        } else {
                                            alertify.error("You've clicked Cancel");
                                        }
                                    }, "Enter a number");
                                }else {
                                    console.log(e);
                                }
                            });
                        });
                }else {
                    
                    if (emp_id != '') {
                       require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
                            function(css, alertify){
                                loadCSS('js/libs/alertify/css/alertify.core.css');
                                loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
                                alertify.prompt("Cash Advance: (" +name+")", function (e, str) {
                                if (e) {
                                    if ($.isNumeric(str)) {
                                        $.post('ajax/save/save_debts.php', { id: emp_id, fullname: name, value: str, date: router.getDate() }, function(data, textStatus, xhr) {
                                            $('#output-save-debt').html(data);
                                        }).success(function(data){
                                            console.log(data);
                                        }).fail(function(xhr){
                                            alert(' '+xhr.status);
                                        });
                                    }else {
                                       router.alertify_error('Invalid input');
                                    }
                                } else {
                                    alertify.error("You've clicked Cancel");
                                }
                            }, "Enter a number");
                        });
                    }
                }
               
            },

            createEmployee: function(event){
                
            },

            updateEmployee: function(event){
                
            },

            fillModalUpdateEmployee: function(id){
                var $form = $('#form-update-employee');
                var employee = employees.get(id);
                $form.find('#firstname').val(employee.get('firstname')).end().find('#middlename').val(employee.get('middlename')).end().find('#lastname').val(employee.get('lastname')).end().find('#age').val(employee.get('age')).end().find('#rpd').val(employee.get('rpd')).end().find('#update-position-'+employee.get('position')).prop('selected', true).end().find('#hidden-emp-id-update').val(id);
                $('#modalUpdateEmployee').find('#update-location-'+employee.get('location')).prop('selected', true);
                employees.empId = id;
                if (employee.get('gender') == 1) {  
                    $form.find('#male').prop('selected', true);
                }else {
                    $form.find('#female').prop('selected', true);
                }

                if(employee.get('rice_allowance') == 1){
                    $('#modalUpdateEmployee').find('#era').prop('selected', true);
                }else {
                    $('#modalUpdateEmployee').find('#dra').prop('selected', true);
                }
            },

            searchEmployee: function(event){
                var self = this;
                clearTimeout(self.timer);
                self.timer = setTimeout(function() {

                    var loc = $('#display-by-project').val();
                    var value = event.currentTarget.value;

                    if (loc > 0) {
                        var ids = employees.function.searchWithLocationOf(loc);
                        if (ids.length) {
                            
                            var match = [];
                            ids.forEach(function(id) {
                                var emp = employees.get(id);
                                if (emp.get('firstname').toLowerCase().indexOf(value.toLowerCase()) !== -1 || emp.get('middlename').toLowerCase().indexOf(value.toLowerCase()) !== -1 || emp.get('lastname').toLowerCase().indexOf(value.toLowerCase()) !== -1 || emp.get('rpd').indexOf(value.toLowerCase()) !== -1 || emp.get('id').indexOf(value.toLowerCase()) !== -1) {
                                    match.push(id);
                                }
                            });
                            
                            if (match.length) {
                                employees.subviews.appendListOfEmployeesById(match);
                            }

                        }
                    }else {

                            var withRa = $('#with-ra').is(':checked');
                            var withNa = $('#with-na').is(':checked');

                            if (withRa) {

                                var ids = employees.function.getEmployeesWithRiceAllowance();
                                if (ids.length) {
                                    var found = [];
                                       ids.forEach(function(id) {
                                           var model = employees.get(id);
                                            if (model.get('firstname').toLowerCase().indexOf(value) !== -1 || model.get('middlename').toLowerCase().indexOf(value) !== -1 || model.get('rpd').toLowerCase().indexOf(value) !== -1 || model.get('lastname').toLowerCase().indexOf(value) !== -1 || model.get('id') == value) {
                                                found.push(model.get('id'));
                                            }
                                       });
                                    if (found.length) {
                                        employees.subviews.appendListOfEmployeesById(found);
                                    }else {
                                        employees.function.noResultWasFound(value)
                                    }
                                   
                                }else {
                                    console.log('Nothing was found with rice allowance');
                                }

                            }else if(withNa){

                                var ids = employees.function.getEmployeesWithNoRiceAllowance();
                                if (ids.length) {
                                    var found = [];
                                       ids.forEach(function(id) {
                                           var model = employees.get(id);
                                            if (model.get('firstname').toLowerCase().indexOf(value) !== -1 || model.get('middlename').toLowerCase().indexOf(value) !== -1 || model.get('rpd').toLowerCase().indexOf(value) !== -1 || model.get('lastname').toLowerCase().indexOf(value) !== -1 || model.get('id') == value) {
                                                found.push(model.get('id'));
                                            }
                                       });
                                    if (found.length) {
                                        employees.subviews.appendListOfEmployeesById(found);
                                    }else {
                                        employees.function.noResultWasFound(value)
                                    }
                                   
                                }else {
                                    console.log('Nothing was found with no rice allowance');
                                }

                            }else {

                                var found = employees.function.searchAndreturnIds(event.currentTarget.value.toLowerCase());
                        
                                if (found.length) {
                                    employees.subviews.appendListOfEmployeesById(found);

                                }else {

                                    employees.function.noResultWasFound(event.currentTarget.value);
                                    var loc_id = positions.function.searchAndreturnIds(event.currentTarget.value.toLowerCase());
                                    
                                    if (loc_id > 0) {
                                        var ids = employees.function.searchWithPositionOf(loc_id);
                                        if (ids.length) {
                                            employees.subviews.appendListOfEmployeesById(ids);
                                        }else {
                                            employees.function.noResultWasFound(event.currentTarget.value);
                                        }
                                    }

                                }

                            }

                    

                    }

                }, 700);

                
            
            },

            createAttendance: function(event){
                
            },

            withRiceAllowance: function(event){
                var $target = $('#with-ra');
                var loc = $('#display-by-project').val();
                if ($target.is(':checked')) {

                    if (loc > 0) {
                         console.log('1')
                        var ids = employees.function.searchWithLocationOf(loc);
                        if (ids.length) {
                            var found = [];
                            ids.forEach(function(id) {
                                var emp = employees.get(id).toJSON();
                                if (emp.rice_allowance == 1) {
                                    found.push(emp.id);
                                }
                            });
                            if (found.length) {
                                 employees.subviews.appendListOfEmployeesById(found);
                             }else {
                                employees.function.noResultWasFound('employees with rice allowance');
                             }
                        }else {
                            employees.function.noResultWasFound('employees with rice allowance');
                        }
                    }else {
                        var ids = employees.function.getEmployeesWithRiceAllowance();
                        if (ids.length) {
                            employees.subviews.appendListOfEmployeesById(ids);
                        }else {
                            employees.function.noResultWasFound('employees with rice allowance');
                        }
                    }

                    
                }
            },

            withNoRiceAllowance: function(event){
                var $target = $('#with-na');
                var loc = $('#display-by-project').val();
                if ($target.is(':checked')) {
                    if (loc > 0) {
                        var ids = employees.function.searchWithLocationOf(loc);
                        if (ids.length) {
                            var found = [];
                            ids.forEach(function(id) {
                                var emp = employees.get(id).toJSON();
                                if (emp.rice_allowance == 2) {
                                    found.push(emp.id);
                                }
                            });
                            if (found.length) {
                                 employees.subviews.appendListOfEmployeesById(found);
                             }else {
                                employees.function.noResultWasFound('employees with no rice allowance');
                             }
                        }else {
                            employees.function.noResultWasFound('employees with no rice allowance');
                        }
                    }else {
                         var ids = employees.function.getEmployeesWithNoRiceAllowance();
                         if (ids.length) {
                            employees.subviews.appendListOfEmployeesById(ids);
                         }else {
                            employees.function.noResultWasFound('employees with no rice allowance');
                         }
                    }
                   
                };
            },

            displayAllEmployee: function(event){
                var $target = $('#with-all');
                var loc = $('#display-by-project').val();
                if ($target.is(':checked')) {
                  
                   if (loc > 0) {
                        var ids = employees.function.searchWithLocationOf(loc);
                        if (ids.length) {
                            employees.subviews.appendListOfEmployeesById(ids);
                        };
                   }else {
                       employees.subviews.appendListOfEmployees();
                   }
                }
            },

            showPanelOvertime: function(event) { 

            }
    
    });
   
    return ViewEmployee; 
});