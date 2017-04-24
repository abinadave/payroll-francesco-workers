define(['underscore','backbone',
	'models/picture',
    'moment',
    'views/employee/picture/view_modal_update_picture',
    'css!libs/css/list_of_emps_with_pic.css'], 
    function(_, Backbone, Pic, moment, SubviewModalEmpPic, css1) {
   
    var Pictures = Backbone.Collection.extend({
        url: 'api.php/picture',
    	model: Pic,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new picture was added');
    		});
    		this.on('remove', function(model){
    			console.log('picture successfully removed');
    		});
    	},
    
    	print: function(){
    		pictures.forEach(function(model) {
    			console.log(model.attributes);
    		});
    	},

        functions: {

            getLowerId(emp){
                var emps = employees.where({firstname: emp.firstname, lastname: emp.lastname}, false);
                if (emps.length) {
                    var numbers = []; emps.forEach(function(model) { numbers.push(Number(model.get('id'))); });
                    return _.min(numbers);
                }else {
                    return emp.id;
                }
            },

            getImgSrc(pic){
                if (pic.hasOwnProperty('fullname')) {
                    return 'assets/pictures/'+pic.fullname +'.'+pic.ext;    
                }else {
                    var fullname = pic.firstname.toUpperCase() + ' ' + pic.lastname.toUpperCase();
                    var model = pictures.where({fullname: fullname}, true).toJSON();
                    return 'assets/pictures/'+model.fullname +'.'+model.ext; 
                }
            },

            getPicPosition(pic){
               var str = pic.fullname.split(' ');
               var found = pictures.functions.empsWithPosition(str[0].toLowerCase(), str[1].toLowerCase());
               var objRs = pictures.functions.getLargestSalary(found);
               var rs = employees.where({id: objRs.id});

               if (rs.length) {
                    var model = employees.get(objRs.id);
                    return positions.function.getName(model.get('position'));
               }else {
                   return '-';
               }
            },

            getLargestSalary(found){
                var biggestNum = 0;
                var id = 0;
                found.forEach(function(model) {
                    if (Number(model.rpd) > biggestNum) {
                        biggestNum = Number(model.rpd);
                        id = model.id;
                    }
                });
                return {
                    id: id
                };
            },

            empsWithPosition(firstname, lastname){
                var found = [];
                return found = employees.toJSON().filter(function(model) {
                    return model.firstname.toLowerCase() === firstname &&
                           model.lastname.toLowerCase()  === lastname; 
                });
            },
            
            mouseLeave(id){
                var div = '#div-pic-'+id;
                $(div).removeClass('on-hover-div');
                $('#div-for-print-'+id).fadeOut(300);
            },

            mouseEnter(id){
                var div = '#div-pic-'+id;
                $(div).addClass('on-hover-div');
                $('#div-for-print-'+id).fadeIn(300);
            },

            findOtherIds: function(emp) {
                var firstname = '', lastname = '';
                return employees.toJSON().filter(function(model) {
                    firstname = model.firstname.toUpperCase(); lastname  = model.lastname.toUpperCase();
                    return emp.firstname.toUpperCase() === firstname && emp.lastname.toUpperCase() === lastname;
                });
            },

            fileExt: function(fileName) {
                return fileName.split('.').pop();
            },

            saveOrUpdatePicture: function(filename) {
                var empId = Backbone.history.fragment.split('/')[1];
                var employee = employees.get(empId);

                $.post('ajax/others/rename_picture.php', {
                    employee: employee.attributes,
                    filename: filename,
                    ext: pictures.functions.fileExt(filename)
                }, function(data, textStatus, xhr) {

                }).success(function(data){
                    var resp = $.parseJSON(data);
                    // filename = resp.filename;
                    console.log(resp);
                    pictures.functions.saveOrUpdateExtension(resp.filename, employee.attributes);
                }).fail(function(xhr){
                    router.alertify_warning('Error in renaming file,  '+xhr.status);
                });     
            },

            saveOrUpdateExtension: function(filename, emp) {
                var ext = pictures.functions.fileExt(filename);
                var objWhere = {
                    fullname: emp.firstname.toUpperCase() + ' ' + emp.lastname.toUpperCase()
                };
                var rs = pictures.where(objWhere);
                if (rs.length) {
                    var model = pictures.where(objWhere, true);
                    if (model.get('ext').toLowerCase() === ext.toLowerCase()) {
                        console.log('the same extension and the same name');
                        var dir = 'assets/pictures/' + objWhere.fullname + '.'+model.get('ext');
                        $('#modalUpdatePicture').find('#img-src').attr('src', dir);
                    }else {
                        $.post('ajax/update/update_picture.php', 
                            {
                                model: model.attributes,
                                new_ext: ext
                            }
                        , function(data, textStatus, xhr) {
                            /*optional stuff to do after success */
                        }).success(function(data){
                            var json = $.parseJSON(data);
                            if (json.resp) {
                                model.set({ext: ext}, {silent: true});
                                var dir = 'assets/pictures/' + objWhere.fullname + '.'+ ext;
                                $('#modalUpdatePicture').find('#img-src').attr('src', dir);
                            }
                        }).fail(function(xhr){
                            alert(' '+xhr.status);
                        });
                    }
                }else {
                    var empFullname = emp.firstname.toUpperCase() + ' ' + emp.lastname.toUpperCase()
                    pictures.create({
                        fullname: empFullname,
                        ext: ext.toLowerCase(),
                        table: 'pictures'
                    }, {
                        success: function(a, b, c) {
                            var dir = 'assets/pictures/' + empFullname + '.'+ext;
                            $('#modalUpdatePicture').find('#img-src').attr('src', dir);
                        }
                    });
                }
               
            },

            fileUpload: function(){
                $(function(){
                    require([
                        'libs/fileuploader/fileuploader',
                        'css!libs/fileuploader/fileuploader.css'
                        ], function(js, css){
                         new qq.FileUploader({
                            element: $('#upload-pic')[0],
                            action: 'upload_emp_picture.php',
                            allowedExtensions: ['jpg','gif','jpeg','png'],
                            onComplete: function(id, filename, json){
                                pictures.functions.fileUpload();
                                pictures.functions.saveOrUpdatePicture(filename);
                            }
                        });
                    });
                });
            }

        },

        subviews: {
            
            appendModalUpdatePic: function(model) {
                new SubviewModalEmpPic({
                    model: model
                });
            },

            appendListOfEmps: function(list) {
                /* renders all employees with pictures */
                require(['views/emp_pic/view_list_of_employees_with_pictures'], 
                    function(SubviewLOEWP){
                    new SubviewLOEWP({
                        collection: list
                    });
                });
            },

            appendModalPrintAll(list){
                require(['views/emp_pic/view_print_all_emp_pic'], function(Subview){
                    new Subview({
                        collection: list
                    });
                });
            }
            
        }
    
    });
   
    return Pictures; 
});