<?php 
	if (isset($_POST)) {
		include '../../class/class.accounts.php';
		$accounts = new Accounts();
		$result = $accounts::updateDebts($_POST);
		if ($result) {
			echo $result;
		}
	}
?>