<?php 
	include_once '../../class/class.payrolls.php';
	$payrolls = new Payrolls();
	$json = $payrolls::getJSON();
	echo json_encode($json);
?>