<?php 
	if (isset($_POST)) {
		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$rs = $payrolls::saveRemovedPayrolls($_POST);
	}
?>