// This is the main entry point for the App
define(
	[
		'models/session',
		'models/rice',
		'models/limit_absent',

		//collection
		'collections/employees',
		'collections/positions',
		'collections/projects',
		'collections/attendances',
		'collections/payrolls',
		'collections/accounts',
		'collections/usertypes',
		'collections/payrollemps',
		'collections/chats',
		'collections/debts',
		'collections/presents',
		'collections/presences',
		'collections/presences_saved',
		'collections/payrollemps_removed',
		'collections/removed_payrolls',
		'collections/selected_emps',
		'collections/overtime_payrolls',
		'collections/overtime_payrollemps',
		'collections/removed_overtime_payrollemps',
		'collections/removed_overtimes',
		'collections/removed_presences',
		'collections/removed_presents',
		'collections/breakdowns',
		'collections/pbreakdowns',
		'collections/userlogs',
		'collections/recycle_employees',
		'collections/pictures',
		'collections/saved_dtrs',

		//views
		'views/employee/view_table_employee',
		'views/attendance/view_attendance',
		'views/account/view_table_accounts',
		'views/payroll/view_payroll_records',
		'views/navigation/view_navigation',
		'views/attendance/view_saved_attendance',
		'views/employee/view_employee_salary',
		'views/emp_pic/view_div_employees_with_pictures',

		//router
		'routers/router'
	], 
		function(
			Session,
			Rice,
			Limit_absent,

			Employees,
			Positions,
			Projects,
			Attendances,
			Payrolls,
			Accounts,
			Usertypes,
			Payrollemps,
			Chats,
			Debts,
			Presents,
			Presences,
			Presences_saved,
			Payrollemps_removed,
			Removed_payrolls,
			Selected_emps,
			Overtime_payrolls,
			Overtime_payrollemps,
			Removed_overtime_payrollemps,
			Removed_overtimes,
			Removed_presences,
			Removed_presents,
			Breakdowns,
			Pbreakdowns,
			Userlogs,
			Recycle_employees,
			Pictures,
			Saved_dtrs,

			ViewEmployee,
			ViewAttendance,
			ViewAccounts,
			ViewPayrollRecords,
			ViewNavigation,
			ViewSavedAttendance,
			ViewEmployeeSalary,
			ViewEmployeePictures,

			Router
		){

		var init = function(){

			session = new Session();
			rice = new Rice();
			limit_absent = new Limit_absent(),
			
			//collections
			employees = new Employees();
			positions = new Positions();
			projects = new Projects();
			attendances = new Attendances();
			payrolls = new Payrolls();
			accounts = new Accounts();
			usertypes = new Usertypes();
			payrollemps = new Payrollemps();
			chats = new Chats();
			debts = new Debts();
			presents = new Presents();
			presences = new Presences();
			presences_saved = new Presences_saved();
			payrollemps_removed = new Payrollemps_removed();
			removed_payrolls = new Removed_payrolls();
			selected_emps = new Selected_emps();
			overtime_payrolls = new Overtime_payrolls();
			overtime_payrollemps = new Overtime_payrollemps();
			removed_overtime_payrollemps = new Removed_overtime_payrollemps();
			removed_overtimes = new Removed_overtimes();
			removed_presences = new Removed_presences();
			removed_presents = new Removed_presents();
			breakdowns = new Breakdowns();
			pbreakdowns = new Pbreakdowns();
			userlogs = new Userlogs();
			recycle_employees = new Recycle_employees();
			pictures = new Pictures();
			saved_dtrs = new Saved_dtrs();

			//views	
			view_employee = new ViewEmployee();
			view_attendace = new ViewAttendance();
			view_accounts = new ViewAccounts();
			view_payroll = new ViewPayrollRecords();
			view_navigation = new ViewNavigation();
			view_saved_attendance = new ViewSavedAttendance();
			view_employee_salary = new ViewEmployeeSalary();
			view_pictures = new ViewEmployeePictures();

			//routes
			router = new Router();
			
		};
		
		return { init: init };
});
