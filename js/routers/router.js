define(
	[
		'underscore',
		'backbone',
		'moment'
	], 

function(   
			_, 
			Backbone,
			moment
		){

	var Router = Backbone.Router.extend({
		initialize: function(){
			Backbone.history.start();
		},

		routes: {
			'': 'myDefaultRoute',
			'Employees': 'myDefaultRoute',
			'Debts': 'showDebts',
			'Project': 'routeProject',
			'remove-project/:id': 'removeProject',
			'remove-employee/:id': 'removeEmployee',
			'createAttendance': 'showAttendance',
			'Accounts': 'showAccounts',
			'Logout': 'signOut',
			'clear-form-add-account': 'clearFormAddAccount',
			'Payroll': 'showPayroll',
			'Payroll/view/:id': 'showPayrollEmps',
			'Payroll/restore/:id': 'restorePayroll',
			'Payroll/retrieve/:id': 'retrievePayroll',
			'show-chatbox/:id': 'showChatBox',
			'remove-designation/:id': 'removeDesignation',
			'Rice-Allowance': 'editRiceAllowance',
			'removeFromAttendance/:id': 'deleteFromAttendance',
			'Attendance': 'showSavedAttendance',
			'Attendance/view/:id': 'attendanceView',
			'ViewSavedAttendanceIdOf/:id': 'showSavedAttendanceIdOf',
			'viewAttendance': 'showMyAttendance',
			'RemovedPayroll': 'showRemovedPayroll',
			'overtimePayroll': 'showOvertimePayrolls',
			'overtime/removePayrollemps/:id': 'removeOvertimeEmpTemporary',
			'overtime/removed/show/:id': 'showRemovedOvertimeAdminSide',
			'viewOvertimePayroll/:id': 'showOvertimepayoll',
			'deleteOvertimePayroll/:id': 'showRemoveOvertimePayroll',
			'removedOvertimePayrolls': 'showRemovedOvertimes',
			'Logs': 'showLogs',
			'restoreThisRemovedOvertime/:id': 'restoreOvertimeRemoved',
			'printOvertimeBreakdown': 'showOvertimeBreakdown',
			'printSavedAttendance/:id': 'printAttendance',
			'ChangePassword': 'showChangePass',
			'RemovedPayroll/open/:id': 'openRemovedPayroll',
			'updatePicture/:id': 'updateEmpPic',
			'updatePicture2/:id': 'updateEmpPic2',
			'EmployeesWithPictures': 'showEmpsWithPics',
			'LimitOfAbsents': 'showModalLimitAbsents',
			'printId/:id': 'printThisId',
			'updateImage/:id': 'showModalUpdateImage'
		},

		signInName: function(arguments) {
			// $('#sign-in-as').text(sessionStorage.getItem('firstname'));
		},

		myDefaultRoute: function(){
			presents.reset();
			if (sessionStorage.getItem('usertype') == 'employee') {
				view_employee_salary.render();
				employees.function.fetchData();
				payrolls.function.fetchData();
				debts.function.fetchData();
				$('#remove-this').hide();
				$('#remove-this-2').hide();
			}else{
				switch(sessionStorage.getItem('usertype')) {
				    case '2':
				        view_employee.render();
						this.navigate('Employees', true);
						this.getSession();
				        break;
				    case '3':
				        this.navigate('Payroll', true);
				        break;
				    default:
				        console.log('default route');
				}
			}
		},

		employeeSubviews: function(){
			// accounts.subviews.appendOnlineUsers();
			employees.subviews.appendModalCreateEmployee();
			projects.subviews.appendModalProject();
			// employees.subviews.appendModalUpdateEmployee();
			// employees.subviews.appendModalUploadEmployee();
			// accounts.subviews.appendChatbox();
			this.getSigninName();
			this.getSession();
			
			positions.function.fetchData();
			payrolls.function.fetchData();
			debts.function.fetchData();
		},

		showDebts: function() {
			debts.function.fetchData();
		},

		routeProject: function(){
			$('#modalProject').modal('show');
			this.subviewsProject();
		},

		subviewsProject: function(){
			this.navigate('');
			setTimeout(function(){
				$('#form-add-project').find('#project-name').focus();
			}, 1000);
			projects.subviews.appendListOfSubjects();
		},

		showAttendance: function(){
			if(!attendances.length){
				this.navigate('Employees', true);
			}

			console.log('showing attendance');
			
		},

		showAccounts: function(){
			view_accounts.render();
			this.subviewsAccounts();
		},

		subviewsAccounts: function(){
			accounts.subviews.appendFormAddAccounts();
			usertypes.function.fetchData();
		},

		showPayroll: function(){
			view_payroll.render();
			this.subviewsPayroll();
		},

		subviewsPayroll: function(){
			payrollemps.subviews.appendModalEditPayrollEmps();
			// payrollemps.function.fetchData();
			// removed_payrolls.function.fetchData();
			// this.getSession();
		},

		showPayrollEmps: function(pid){
			this.navigate('Payroll');
			payrolls.function.currentId = pid;
			var result = payrollemps.where({payroll_id: pid});
			if (result.length) {
				payrollemps.subviews.appendModalViewPayrolEmps(pid);
				payrollemps.subviews.appendListOfPayrollEmps(pid);
				$('#modalTablePayrollemps').modal({
					 backdrop: 'static',
					 keyboard: true
				})
				require(['jqueryui'], function(){
				    $('#div-modalTablePayrollemps').draggable({
				    	cursor: "move"
				    });
				});
			}else {
				this.alertify_error('Nothing was found for payroll id: ' + pid);
			}
		},

		showChatBox: function(id){
			this.navigate('#Employees');
			accounts.subviews.appendChatbox();
			accounts.subviews.appendChats(id);

			$('#modalChat').find('#chat-id').val(id);
			$('#modalChat').modal('show');

			setTimeout(function(){
				 $("#main-chatbox").animate({ scrollTop: $("#main-chatbox")[0].scrollHeight}, 1000);
				 $('#chat-text').focus();
				}, 500);
		},

		showSavedAttendance: function(){
			view_saved_attendance.render();
			presences.function.fetchData();
			//positions.function.fetchData();
			var str = sessionStorage.getItem('firstname');
			$('#sign-in-as').text(str.charAt(0).toUpperCase() + str.slice(1));
		},

		showSavedAttendanceIdOf: function(id){
			this.navigate('Attendance');
			var return_id = id;
			attendances.reset();
			var rs = presents.where({presence_id: id.toString()});
			if (rs.length) {
				var presence = presences.get({id: id});
				presents.function.isUphold = id;
				var ids = [];
				    presents.forEach(function(model) {
				    	if (model.get('presence_id') == id) {
				    		var str = model.get('id');
							var res = str.split("-");
							ids.push(res[0]);
				    	};
                    });

                   ids.forEach(function(thisid) {
                   	  attendances.function.saveModel(thisid);
                   });

                   router.navigate('#createAttendance');  

                   view_attendace.render();
                   
              	   var rs = presences.where({id: return_id});
              	   
              	   if (rs.length) {
              	   	  var presence = presences.get(return_id);
              	   	  payrolls.function.currentLocation = presence.get('loc_name');
              	   	  payrolls.function.currentLocation_id = presence.get('loc_id');
              	   };

              	   presents.function.removeModelWith0Id();    

                   setTimeout(function() {
                   	 var $panel = $('#panel-attendance');
                   	 $panel.find('#from').val(presence.get('from_date')).end().find('#to').val(presence.get('to_date')).trigger('change');
                     $panel.find('#from').prop('disabled', true).end()
                    	   .find('#to').prop('disabled', true);
                   }, 300);

			}else {
				router.alertify_error('No data was found');
			}
		},

		showRemovedPayroll: function(){
			// removed_payrolls.function.fetchData();
			removed_payrolls.subviews.appendTable();
		},

		showOvertimePayrolls: function () {
			overtime_payrolls.subviews.appendTable();
			this.signInName();
		},

		printAttendance: function(i) {
			this.navigate('Attendance');
			var model = removed_presences.get(i);
			// var list = removed_presences.function.getModels(i);
			var rs = removed_presents.where({presence_id: i});
			if (rs.length) {
				removed_presences.subviews.appendPrintableTable();
			}
		},

		showChangePass: function() {
			this.navigate('');
			accounts.subviews.appendModalChangePass();
		},



		removeOvertimeEmpTemporary: function(id) {
			this.navigate('overtimePayroll');
			overtime_payrollemps.remove(id);
		},

		showRemovedOvertimeAdminSide: function(id) {
			var rs = removed_overtimes.where({id: id});
			if (rs.length) {
				removed_overtimes.subviews.appendModalRemovedOvertime();
			}else {
				this.navigate('removedOvertimePayrolls', true);
			}
		},

		showOvertimepayoll: function(id) {
			this.navigate('overtimePayroll');
        	var list = overtime_payrollemps.function.findWorkers(id);

            overtime_payrollemps.subviews.appendTable(list);
            
            /* hidden id for overtime_payrolls */
        	overtime_payrollemps.currentId = id;

            if(overtime_payrolls.where({id: id}).length){

                var output = '';
                output += '<tr>';
                output += '<td colspan="6" class="text-center text-info"><i class="fa fa-spinner fa-pulse fa-3x"></i></td>';
                output += '</tr>';
                $('#list-of-overtime-payrollemps').html(output);

                setTimeout(function() {

                    /*
                        deley process.
                        for appending new list..
                    */
            
                       
                    overtime_payrollemps.subviews.appendList(list);
                
                    var $el = $('#div-table-overtime-payrolls');
                    var model = overtime_payrolls.get(id);
                    
                    require(['moment'], function(moment){
                        var date = moment(model.get('date')).format('dddd MMMM DD, YYYY');
                        $('#location').text(model.get('location_name'));
                        $('#date').text(date);
                    });

                }, 700);
                
            }
                 
		},

		showRemoveOvertimePayroll: function(id) {
			this.navigate('overtimePayroll');
			if (Number(sessionStorage.getItem('usertype')) === 2) {
				overtime_payrolls.subviews.appendModalConfirmation(id);	
				overtime_payrolls.toDelete = id;
			}else {
				this.alertify_error('Sorry, but you are not allowed to delete any record from the table.');
			}

		},

		showRemovedOvertimes: function() {
			// overtime_payrolls.function.fetchData();
			removed_overtimes.subviews.appendTable();
		},

		showLogs: function() {
			userlogs.subviews.appendPanel();
		},

		restoreOvertimeRemoved: function(id) {
			this.navigate('removedOvertimePayrolls');
			var go = confirm('Are you sure you want to restore this payroll from the list ?');
			if (go) {
				var model = removed_overtimes.get(id);
				var obj = model.toJSON();
				obj.table = 'overtime_payrolls';
				$.post('ajax/save/save.php', obj, function(data, textStatus, xhr) {
					/*optional stuff to do after success */
				}).success(function(data){
					var resp = $.parseJSON(data);
					resp.id = obj.id;
					overtime_payrolls.add(resp);
					console.log(resp);
					if ($.isNumeric(resp.id)) {
						$.post('ajax/delete/delete.php', {
							table: 'removed_overtimes',
							prop: 'id',
							id: resp.id
						}, function(data, textStatus, xhr) {
							/*optional stuff to do after success */
						}).success(function(data){
							removed_overtimes.remove(resp.id);
							router.alertify_success('Successfully restore');
						}).fail(function(xhr){
							// console.log('error on restoring overtime, error type: '+xhr.status);
						});
					};
				}).fail(function(xhr){
					// alert('error type: '+xhr.status);
				});

			};
		},

		showOvertimeBreakdown: function() {
			this.navigate('overtimePayroll');
			var $div = $('#home-pills');

			$div.css({
				fontSize: '12px'
			});

			setTimeout(function() {
				require(['libs/jquery.print'], function(){
				    $.print('#home-pills');

				    setTimeout(function() {
				    	$div.css({
							fontSize: '14px'
						});
				    }, 1000);
				});
			}, 100);
			
		},

		showMyAttendance: function(){
			
		},

		restorePayroll: function(id){
			if (Number(sessionStorage.getItem('usertype')) === 2) {
				require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
					function(css, alertify){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
						alertify.confirm('Are you sure ?', function(e){
							if (e) {
								payrolls.remove(id);
							}else {
								console.log(e);
							}
						});
					});
			}else {
				this.alertify_error('Sorry, but you are not allowed to delete any record from the table.');
			}
			
			this.navigate('Payroll');
		},

		retrievePayroll: function(id){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
				
					alertify.confirm('Are you sure ?', function(e){
						if (e) {
							removed_payrolls.remove(id);
						}else {
							console.log(e);
						}
					});

				});
			this.navigate('RemovedPayroll');
		},

		deleteFromAttendance: function(id){
			this.navigate('createAttendance');
			if (Number(sessionStorage.getItem('usertype')) === 2) {
				 require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
					function(css, alertify){
						loadCSS('js/libs/alertify/css/alertify.core.css');
						loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					
						alertify.confirm('Would you like to remove ' + employees.function.getFullname(id) + ' from the attendance ?', function(e){
							if (e) {
								attendances.remove(id);
								$('#tr-att-'+id).remove();
							}
						});
				});
			}else {
				this.alertify_error('Sorry, you are not allowed to remove this record');
			}
			
		},


		signOut: function(){
			$.post('ajax/others/destroy_session.php', { session_destroy: 'true' }, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
			}).success(function(data){
				sessionStorage.clear();
				setTimeout(function() {
					window.location = '.';
				}, 700);
			}).fail(function(xhr){
				alert('Error in Signing Out, Error type: '+xhr.status);
			});
		},

		removeProject: function(id){
			this.navigate('#Employees');
			var rs = employees.where({location: id});
			if (rs.length) {
				router.alertify_error('Project has still existing employees. invalid transaction');
			}else {
				var ok = confirm('Are you sure?');
				if (ok) {
					if (Number(sessionStorage.getItem('usertype')) === 2) {
						projects.function.removeDb(id);
					}else {
						this.alertify_error('Sorry, you are not allowed to remove this project location.');
					}
					
				}	
			}
		},

		removeEmployee: function(rid){
			this.navigate('Employees');
			if (Number(sessionStorage.getItem('usertype')) === 2) {
				if (rid > 0) {
					var result = employees.where({id: rid});
					if (result.length) {
						var ok = confirm('Are you sure?');
						if (ok) {
							employees.function.removeDb(rid);
						}
					}else{
						alert("Cant find employee with id of: "+rid);
					}
				}
			}else {
				this.alertify_error('Sorry, but you are not allowed to delete any record from the table.');
			}
		},

		removeDesignation: function(id){
			this.navigate('');

			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
				
					alertify.confirm('Are you sure', function(e){
						if (e) {
								positions.function.removeDB(id);
						}else {
							console.log(e);
						}
					});
				});
			
		},

		editRiceAllowance: function(){
			this.navigate('');
			if (Number(sessionStorage.getItem('usertype')) === 2) {
				this.alertify_prompt('Enter a number');
			}else {
				this.alertify_error('Access denied');
			}
			
		},

		getSigninName: function(){
			var self = this;
			$.post('ajax/select/get_signin_name.php', function(data, textStatus, xhr) {
				/*optional stuff to do after success */

			}).success(function(data){
				$('#sign-in-as').text(data);
				self.getNumberOfUsers();
			}).fail(function(xhr){
				// alert('error type: '+xhr.status);
			});
		},

		getNumberOfUsers: function(){
			
		// window.setInterval(function(){
			// $.post('ajax/select/get_online_users.php', function(data, textStatus, xhr) {
			// 	/*optional stuff to do after success */
			// 	$('#list-online-users').html(data);
			// }).success(function(data){
				
			// 	//console.log(data);
			// }).fail(function(xhr){
			// 	alert('error type: '+xhr.status);
			// });
		// }, 5000)
		
		},

		getSession: function(){
			$.post('ajax/select/get_session_id.php', {get_session: 'get'}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
			}).success(function(data){			
				accounts.currentSession = data;
				accounts.function.subscribe();
				accounts.subviews.initImageUpdate();
				accounts.function.subscribe_active_users('account'+accounts.currentSession);	
			}).fail(function(xhr){
				// alert('error type: '+xhr.status);
			});
		},

		clearFormAddAccount: function(){
			this.navigate('Accounts');
			$('#form-add-account')[0].reset();
			$('#form-add-account').find('#firstname').focus();
		},

		modalOption: function(elem, type){
			$(elem).modal(type);
		},

		load_css: function(file){
			require(['libs/load_css/loadcss'], 
	            function(css){
	            loadCSS(file);
	        }); 		
		},

		openRemovedPayroll: function(i) {
			var rs = removed_payrolls.where({id: i});
			if (rs.length) {
				var removed_payroll = removed_payrolls.get(i);
				var rsPayrollEmps = payrollemps.where({payroll_id: i});
				if (rsPayrollEmps.length) {
					removed_payrolls.subviews.appendModalRemovedPayroll(removed_payroll);
				}else {
					this.alertify_error('No data was found for this payroll');
				}
			}else {
				this.navigate('RemovedPayroll', true);
			}
		},

		updateEmpPic: function(i) {
			var rs = employees.where({id: i});
			if (rs.length) {
				pictures.subviews.appendModalUpdatePic(employees.get(i));
			}else {
				if (!$('#div-emps-with-pic').length) {
					this.navigate('EmployeesWithPictures', true);
				}
			}
		},

		updateEmpPic2(fullname){
			var emp = employees.function.empsWithFNandLN(fullname.toUpperCase());
			console.log(emp);
			this.navigate('updatePicture/'+emp.id, true);
		},


		showEmpsWithPics: function() {
			view_pictures.render();
		},

		showModalLimitAbsents(){
			require(['views/for_admin/settings/view_modal_edit_limit_absents'], 
				function(Subview){
			    new Subview();
			});
		},

		printThisId(i){
			this.navigate('EmployeesWithPictures', false);
			console.log(i);
		},

		showModalUpdateImage(i){
			var rs = employees.where({id: i});
			if (rs.length) {
				$('#btnUpdateImage').trigger('click');
			}else {
				this.navigate('Employees', true);
			}
		},

		attendanceView(id){
			var rs = payrolls.where({id: id});
			if (rs.length) {
				require(['views/attendance/saved_dtr/view_modal_saved_dtr'], 
					function(Subview){
				    new Subview({
				    	model: payrolls.get(id)
				    });
				});
			}else {
				this.alertify_error('0 attendance was found for that payroll');
				this.navigate('Payroll', true);
			}
		},

		alertify_error: function(str){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.error(str);
			});
			return this;
		},

		alertify_success: function(str){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.success(str);
			});
			return this;
		},

		alertify_alert: function(str){
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.alert(str);
			});
			return this;
			
		},

		alertify_prompt: function(str){
			var price = rice.get('price');
			console.log(price)
			require(['libs/load_css/loadcss','libs/alertify/js/alertify.min'], 
				function(css, alertify){
					loadCSS('js/libs/alertify/css/alertify.core.css');
					loadCSS('js/libs/alertify/css/alertify.bootstrap.css');
					alertify.prompt("Current rice allowance: "+ price, function (e, str) {
					if (e) {
						if ($.isNumeric(str)) {
							$.post('ajax/update/edit_rice_allowance.php', {value: str}, function(data, textStatus, xhr) {
								/*optional stuff to do after success */
								
							}).success(function(data){
								if (data) {
									router.alertify_success('Successfully updated');
									rice.set({price: str});
								}
							}).fail(function(xhr){
								// alert('error type: '+xhr.status);
							});
						}else {
							alert('Invalid input');
						}
					} else {
						console.log("You've clicked Cancel");
					}
				}, "Enter a number");
			});
			
		},

		playSound: function(src){
			require(['libs/soundPlayer/jquery.playSound'], function(){
				$.playSound(src);
			});
		},

		getDate: function(){
           return moment().format("YYYY-MM-DD HH:mm:ss");
        },

        datatablePlugin: function(table){
            $(function() {
                require(['libs/load_css/loadcss','DT-bootstrap','datatable'], 
                    function(css, dt1, dt2){
                      loadCSS('js/libs/dataTables/dataTables.bootstrap.css');
                      $(table).dataTable();
                });
            });
        },

        getDate: function() {
           return moment().format('MMMM DD, YYYY hh:mm:ss');
        },

        search: function(str_collection, value){
            var list = new Backbone.Collection();
            window[str_collection].forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        list.add(model);
                    };
                });
            });
            return list;
        },

        
	});

	return Router;

});