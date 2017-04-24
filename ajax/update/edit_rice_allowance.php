<?php 
	if (isset($_POST['value'])) {
		# code...
		$value = stripcslashes($_POST['value']);

		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$result = $accounts::updateRiceAllowance($value);
		if ($result) {
			echo true;
		}
	}
?>