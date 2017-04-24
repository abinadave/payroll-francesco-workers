<?php 
	if (isset($_POST['emp']) && isset($_POST['rand'])) {

		$id = stripcslashes($_POST['emp']);
		$rand = stripcslashes($_POST['rand']);

		include_once '../../class/class.employees.php';
		$employees = new Employees();
		if($employees::remove($id)){
			$file = '../../images/employees/emp-'.$id.'-' . $rand . '.png';
			if (file_exists($file)) {
				unlink($file);
			}
			echo true;
		}
	}
?>