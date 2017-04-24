<?php 
	if (isset($_POST)) {
		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		echo $payrolls::updateRiceAllowance($_POST);
	}
?>