<?php 
	if (isset($_POST['values']) &&
		isset($_POST['payroll_id']) &&
		isset($_POST['data'])) {
		#echo "<pre>", print_r($_POST) ,"</pre>";
		$model = $_POST['values'];
		$data = $_POST['data'];
		$id = stripcslashes($_POST['payroll_id']);
		$model['payroll_id'] = $id;

		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$result = $payrolls::savePayrollEmps($model, $data);
		echo $result;
	}
?>