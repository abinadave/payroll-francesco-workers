<?php 
	if (isset($_POST)) {
		$data = $_POST['values'];
		
		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$result = $payrolls::updatePayrolls($data);
		echo $result;
	}
?>