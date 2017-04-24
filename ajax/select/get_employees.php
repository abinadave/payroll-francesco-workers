<?php 
	
	$file = '../../class/class.employees.php';
	if (file_exists($file)) {
		include_once $file;
		if (class_exists('Employees')) {
			$Employees = new Employees();
			$json = $Employees::get_employees();
			echo json_encode($json);
		}
	}
	
?>