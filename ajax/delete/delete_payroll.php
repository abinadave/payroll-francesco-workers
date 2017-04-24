<?php 
	if (isset($_POST)) {
		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";
		include_once '../../class/class.payrolls.php';
		$payroll = new Payrolls();
		$rs = $payroll::delete($_POST);
		if ($rs) {
			echo json_encode(array('success' => true));
		}
	}
?>