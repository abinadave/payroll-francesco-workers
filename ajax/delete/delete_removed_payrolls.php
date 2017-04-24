<?php 
	if (isset($_POST)) {
		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$rs = $payrolls::deleteRemovedPayroll($_POST);
		if ($rs) {
			echo json_encode(array('success' => true));
		}
		// echo "<pre>", print_r($_POST) ,"</pre>";
	}
?>