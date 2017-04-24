<?php 
	include_once '../../class/class.payrolls.php';
	$payrolls = new Payrolls();
	$json = $payrolls::getPayrollEmps();
	echo json_encode($json);
?>