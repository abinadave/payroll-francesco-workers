
define(
	[
		'underscore',
		'backbone',
		'models/employee',

		//Subviews
		'views/employee/view_modal_create_employee',
        'views/employee/view_list_of_employees',
        'views/employee/view_modal_update_employee',
        'views/employee/view_list_of_employee_by_id',
        'views/employee/view_modal_upload_photo',
        'views/payroll/view_modal_create_payroll',
        'views/employee/view_list_of_employee_names_in_cbo'
	],  function(
		_, 
		Backbone, 
		Employee, 

		//subviews
		ViewModalCreateEmployee,
        ViewListOfEmployees,
        ViewModalUpdateEmployee,
        ViewListOfEmployeeById,
        ViewModalUploadPhotoEmp,
        ViewModalCreatePayroll,
        ViewListOfEmployeeNamesInCbo
	){
   
    var Employees = Backbone.Collection.extend({
        url: 'api.php/employee',
    	model: Employee,

        empId: 0,

    	initialize: function(){
    		//console.log('Collection Employees initialized');

    		this.on('add', function(model){
    			console.log('New Employee initialized');
                userlogs.function.saveDB('New Employee was added --> ' + model.get('firstname') + ' ' + model.get('lastname'));
                employees.subviews.appendListOfEmployees();
                // pubnub.publish({channel: 'employeeList', message: {model, type: 'add'}});
    		});

    		this.on('remove', function(model){
    			console.log('Employee successfully removed');
                userlogs.function.saveDB('Employee was removed from the list --> ' + model.get('firstname') + ' ' + model.get('lastname'));
                employees.subviews.appendListOfEmployees();
                var json = _.omit(model.toJSON(),'id');
                json.table = 'recycle_employees';
                json.emp_id = model.get('id');
                recycle_employees.create(json);
                // pubnub.publish({channel: 'employeeList', message: {model, type: 'remove'}});
    		});

    	},


    	function: {

            getFN(model){
                var rs = employees.where({id: model.emp});
                if (rs.length) {
                    var employee = employees.get(model.emp);
                    return employee.get('lastname') + ' ' + employee.get('firstname');
                }
            },

            empsWithFNandLN(fullname){
                var found = [];
                let emp_fullname = '';  
                console.log(fullname) ;     
                let rs = employees.toJSON().filter(function(model) {
                    emp_fullname = model.firstname.toUpperCase() + ' ' + model.lastname.toUpperCase();
                    return emp_fullname === fullname;
                });
                return employees.function.getHighestSalary(rs);
            },

            getHighestSalary(rs){
                let highest = 0;
                let model = {};
                for (var i = 0; i < rs.length; i++) {
                    model = rs[i];
                    if (Number(model.rpd) > highest) {
                        highest = model.rpd;
                    }
                }
                return _.where(rs, {rpd: highest})[0];
            },

            fetchData: function(){
                if (employees.length) {
                    employees.function.populateAll();
                }else {
                    //console.log('fetching all employee');
                    $.getJSON('ajax/select/get_employees.php', function(json, textStatus) {

                    }).success(function(json){
                        employees.function.saveModel(json, 1);
                        employees.function.populateAll();
                    }).fail(function(jqXHR){
                        alert(' ' + jqXHR.status);
                    });
                }
            },

            saveDB: function(form){
                $.post('ajax/save/save_employee.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-save-employee').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    $('#form-add-employee').find(':submit').prop('disabled', false);
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },


            saveModel: function(json, type){
                employees.add(json, {silent: type});
            },

            updateDb: function(form){
                $.post('ajax/update/update_employee.php', form, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $('#output-update-employee').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            fullname: function(empId) {
                var rs = employees.where({id: empId});
                if (rs.length) {
                    var model = employees.get(empId);
                    return model.get('lastname') + ', ' + model.get('firstname');
                }else {
                    return '<b class="text-danger" title="This employee was removed by the secretary">EMPLOYEE DELETED</b>';
                }
            },

            updateModel: function(json){
                var emp = employees.get(json.pid);
                emp.set(json);
            },

            removeDb: function(id){
                var emp = employees.get(id);
                $.post('ajax/delete/delete_employee.php', {emp: id, rand: emp.get('rand') }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    var response = parseInt(data);
                    if (response) {
                        employees.remove(id);
                    }
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            getGender: function(gender){
                var g = parseInt(gender);
                if (g == 1) {
                    return 'male';
                }else {
                    return 'female';
                }
            },

            getDesignation: function(emp_id){
                var resultEmp = employees.where({id: emp_id});
                if (resultEmp.length) {
                    var emp = employees.get(emp_id);
                    var resultPos = positions.where({id: emp.get('position')});
                    if(resultPos.length){
                        var pos = positions.get(emp.get('position'));
                        return pos.get('name');
                    }else {
                        return 'unknown position';
                    }
                }else {
                    return 'unknown position';
                }
            },

            getFullname: function(rid){
                // var rs = employees.where({id: rid});
                // if (rs.length) {
                    var emp = employees.get(rid).toJSON();
                    return emp.lastname + ', ' + emp.firstname + ' ' + emp.middlename;
                // }else {
                    // return '<i class="text-danger">EMPLOYEE MIGHT HAVE BEEN DELETED.</i>';
                // }
            },

            getRA: function(value){
                if (value == 1) {
                    return 'yes';
                }else {
                    return 'no';
                }
            },

            populateAll: function(){
               employees.subviews.appendListOfEmployees();
               attendances.subviews.appendModalAddNewEMpInAttendance();
            },

            print: function(){
                if (employees.length) {
                    employees.forEach(function(model) {
                        console.log(model.attributes); 
                    });
                }else {
                    console.log('No employee is registered yet');
                }
            },

            numberOfWorkers: function(location_id){
                var result = employees.where({location: location_id});
                return result.length;
            },

            searchAndreturnIds: function(value){
                var ids = [];
                employees.forEach(function(model) {
                    if (model.get('firstname').toLowerCase().indexOf(value) !== -1 || model.get('middlename').toLowerCase().indexOf(value) !== -1 || model.get('rpd').toLowerCase().indexOf(value) !== -1 || model.get('lastname').toLowerCase().indexOf(value) !== -1 || model.get('id') == value) {
                        ids.push(model.get('id'));
                    };
                });
                return ids;
            },

            searchWithLocationOf: function(loc){
                var ids = [];
                employees.forEach(function(model) {
                    if (model.get('location') == loc) {
                        ids.push(model.get('id'));
                    };
                });
                return ids;
            },

            getEmployeesWithLocation: function(loc){
                var models = new Backbone.Collection();
                employees.forEach(function(model) {
                    if (model.get('location') == loc) {
                        models.add(model)
                    };
                });
                return models;
            },

            returnEmpWithLocationOf: function(loc){
                var MyCollection = Backbone.Collection.extend({});
                var myCollection = new MyCollection();

                employees.forEach(function(model) {
                    var result = attendances.where({id: model.get('id')});
                    if (result.length == 0 && model.get('location') == loc) {
                        myCollection.add(model.attributes)
                    };
                });
                return myCollection;
            },

            searchWithPositionOf: function(pos){
                var ids = [];
                employees.forEach(function(model) {
                    if (model.get('position') == pos) {
                        ids.push(model.get('id'));
                    };
                });
                return ids;
            },

            getEmployeesWithRiceAllowance: function(){
                var match = [];
                employees.forEach(function(model) {
                    if (model.get('rice_allowance') == 1) {
                        match.push(model.get('id'));
                    };
                });
                return match;
            },

            getEmployeesWithNoRiceAllowance: function(){
                var match = [];
                employees.forEach(function(model) {
                    if (model.get('rice_allowance') == 2) {
                        match.push(model.get('id'));
                    };
                });
                return match;
            },


            renamePhoto: function(filename, emp_id, type){
                $.post('ajax/others/rename_photo.php', { id: emp_id, name: filename }, function(data, textStatus, xhr) {
                    $('#output-update-photo-employee').hide().html(data).fadeIn('fast');
                }).success(function(data){
                    console.log(data);
                    if (type == 'update') {
                        alert('successfully updated');
                    }
                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            removeFile: function(id, new_rand){

                var employee = employees.get(id);
                var filename  = 'emp' + '-' + id + '-' + employee.get('rand') + '.png';
                // if (employee.get('rand')) {};
                $.post('ajax/others/remove_file.php',{ name: filename }, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(data){
                    console.log(data);
                    employee.set({rand: new_rand});

                }).fail(function(xhr){
                    alert(' '+xhr.status);
                });
            },

            getCheckedEmployees: function(){
                var ids = [];
                var $target = $('#list-of-employees').find('input[type="checkbox"]:checked');
                $target.each(function(index, el) {
                   ids.push($(this).val());
                });
                return ids;
            },

            noResultWasFound: function(value){
                var output = '';
                output+= '<tr>';
                output+= '<td>-</td>';
                output+= '<td>-</td>';
                output+= '<td>No result was found for: '+value+'</td>';
                output+= '<td>-</td>';
                output+= '<td>-</td>';
                output+= '<td>-</td>';
                output+= '<td>-</td>';
                output+= '<td>-</td>';
                output+= '</tr>';
                $('#list-of-employees').html(output);
            },

            sortBy: function(attr, type){
                 require(['libs/backbone.obscura'], function(imp){
                    var proxy = new imp(employees)

                     if (attr == 'id' || attr == 'rpd') {

                         proxy.forEach(function(model) {
                             var new_id = model.get('id');
                             var new_rpd = model.get('rpd');
                             model.set('id', parseFloat(new_id), {silent: true});
                             model.set('rpd', parseFloat(new_rpd), {silent: true});
                         });

                         proxy.setSort(attr, type);

                         var view = new ViewListOfEmployees({
                            collection: proxy
                         });

                         proxy.forEach(function(model) {
                             var new_id = model.get('id');
                             var new_rpd = model.get('rpd');
                             model.set('id', new_id.toString(), {silent: true});
                             model.set('rpd', new_rpd.toString(), {silent: true});
                         });

                     }else {
                        proxy.setSort(attr, type);

                        var view = new ViewListOfEmployees({
                            collection: proxy
                        });
                     }

                     

                    
                });
            },


    	},


    	subviews: {

    		appendModalCreateEmployee: function(){
    			var view = new ViewModalCreateEmployee();
    			view.render();
    		},

            appendListOfEmployees: function(){
                var view = new ViewListOfEmployees({
                    collection: employees
                });
            },

            appendModalUpdateEmployee: function(){
                var view = new ViewModalUpdateEmployee();
                view.render();
            },

            appendListOfEmployeesById: function(ids){
                var view = new ViewListOfEmployeeById();
                view.render(ids);
            },

            appendModalUploadEmployee: function(){
                var view = new ViewModalUploadPhotoEmp();
                view.render();
            },

            appendModalCreatePayroll: function(){
                var view = new ViewModalCreatePayroll();
            },

            appendEmployeeNamesInCbo: function(myCollection){
                var view = new ViewListOfEmployeeNamesInCbo({
                    collection: myCollection
                });
                view.render();
            },

            initJQueryClickTr: function(){
                var $emp_image = $('#image-employee');
                $(function() {
                     var $target = $('#list-of-employees');
                     var $img = $('#image-employee');
                     $target.find('tr').click(function(event) {
                        $('#hidden-emp-id').val(this.id);
                        $target.find('tr').removeClass('emp-tr text-warning');
                        $(this).addClass('emp-tr text-warning');
                    });

                     $target.find('tr').mouseenter(function(event) {
                         var id = this.id;
                         var emp = employees.get(id);
                         var fullname = emp.get('firstname').toUpperCase() + ' ' + emp.get('lastname').toUpperCase();
                         var rs = pictures.where({fullname: fullname});
                         if (rs.length) {
                            var model = pictures.where({fullname: fullname}, true);
                            var dir = 'assets/pictures/' + model.get('fullname') + '.' + model.get('ext');
                            $emp_image.attr('src', dir);
                         }else {
                            $emp_image.attr('src', 'images/default/default.png');
                         }
                         var employee = employees.get(id).toJSON();
                         $('#employee-fullname').text(employee.firstname + ' ' + employee.lastname);
                     });
                });
                   
            },

            initFileUploader: function(){

                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#upload-here')[0],
                            action: 'upload.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                                employees.function.renamePhoto(filename, employees.empId, 'create');
                                
                                $('#modalUploadPhotoEmployee').modal("hide");
                                $('#modalCreateEmployee').modal("show");
                                employees.subviews.initFileUploader();
                            }
                        });
                    });
                });

            },

            initFileUploaderUpdatePhoto: function(){

                $(function(){
                    require(['libs/fileuploader/fileuploader'], function(){
                         new qq.FileUploader({
                            element: $('#upload-update')[0],
                            action: 'upload_update.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                               employees.function.renamePhoto(filename, employees.empId, 'update');
                               employees.subviews.initFileUploaderUpdatePhoto();
                            }
                        });
                    });
                });

            },


            initSorting: function(){
                var tr_fullname = 0, tr_rpd = 0, tr_id = 0;
                $(function() {
                    var $table = $('#table-employee');


                    //Id sort
                    $table.find('#th-id').click(function(event) {
                        tr_rpd++;
                        if(tr_rpd % 2 == 0){
                            employees.function.sortBy('id','asc');
                        }else {
                            employees.function.sortBy('id','desc');
                        }
                    });



                    //Name sort
                    $table.find('#th-fullname').click(function(event) {
                        tr_fullname++;
                        if(tr_fullname % 2 == 0){
                            employees.function.sortBy('lastname','asc');
                        }else {
                            employees.function.sortBy('lastname','desc');
                        }
                    });



                    //Rate per day sort
                    $table.find('#th-rpd').click(function(event) {
                        tr_rpd++;
                        if(tr_rpd % 2 == 0){
                            employees.function.sortBy('rpd','asc');
                        }else {
                            employees.function.sortBy('rpd','desc');
                        }
                    });
                });
            },

            appendMySalaries: function(salaries){
                require(['views/payroll/view_list_of_my_salaries'], function(Subview){
                    var view = new Subview({
                        collection: salaries
                    });
                });
            },


            appendTr: function(length, element){
                var output = '';
                var limit = 16;
                limit -= length;
                for (var i = 0; i < limit; i++) {
                    output += '<tr>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '<td>-</td>';
                    output += '</tr>';
                }
                $(element).append(output);
            }


    	}

    });
   
    return Employees; 
});
