<?php
	if (isset($_POST)) {
		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$json = $payrolls::updateHasAllowance($_POST);
		if ($json['success']) {
			echo json_encode($json);
		}
	}
?>